<?PHP


class ProductBusiness
{
    /**
     * 产品列表
     * @var array
     */
    private $_productList = array();

    /**
     * 原料列表
     * @var array
     */
    private $_materialList = array();

    public function __construct()
    {

    }

    /**
     * 设置产品数据
     * @param array $data
     */
    public function setProductData($data = array())
    {
        $this->_productList = $data;
    }

    /**
     * 设置原材料数据
     * @param array $data
     */
    public function setMaterialData($data = array())
    {
        $this->_materialList = $data;
    }

    /**
     * 获取产品所需的原材料种类
     * @param integer $productID
     * @return array
     */
    public function getProductMaterial($productID)
    {
        $material = array();
        $materialNum = array();

        foreach ($this->_productList as $val_product) {
            if ($val_product['productID'] == $productID && !in_array($val_product['material'], $material)) {
                $material[] = $val_product['material'];
                $materialNum[$val_product['material']] = $val_product['materialNumNeed'];
            }
        }

        $result['material'] = $material;
        $result['materialNum'] = $materialNum;

        return $result;
    }

    /**
     * 获取某种原材料的供应信息
     *
     * @param $material
     * @return array
     */
    public function getMaterialSupply($material)
    {
        $materialSupply = array();

        foreach ($this->_materialList as $val_material) {
            if($val_material['material'] == $material){
                $materialSupply[] = $val_material;
            }
        }

        return $materialSupply;
    }

    /**
     * 获取产品原材料供应信息
     * @param $productID
     * @return array
     */
    public function getProductMaterialSupplyList($productID)
    {
        $productMaterial = $this->getProductMaterial($productID);

        $productMaterialSupplyArr = array();

        foreach ($productMaterial['material'] as $val_material) {
            $productMaterialSupplyArr[] = $this->getMaterialSupply($val_material);
        }

        return $productMaterialSupplyArr;
    }

    /**
     * 再次验证、过滤多余的供应数据
     * @param $productID
     * @param $supplyData
     * @return mixed
     */
    public function verifySupply($productID, $supplyData){
        $productMaterialSupply = $this->getProductMaterialSupplyList($productID);

        foreach ($productMaterialSupply as $val_material_list) {
            foreach ($supplyData as $key_supply => &$val_supply) {
                $match = false;
                foreach ($val_material_list as $val_material_info) {
                    if($val_supply['time_supply_s'] >= $val_material_info['time_supply_s'] && $val_supply['time_supply_e'] <= $val_material_info['time_supply_e']){
                        $match = true;
                    }
                }

                if(!$match){
                    unset($supplyData[$key_supply]);
                }

                unset($val_supply['material']);
                unset($val_supply['materialNum']);
            }

        }

        return $supplyData;
    }

    /**
     * 获取产品的供应量数据
     * @param $productID
     * @return array
     */
    public function getProductSupplyList($productID){
        $productMaterial = $this->getProductMaterial($productID);
        $productMaterialSupply = $this->getProductMaterialSupplyList($productID);

        if(empty($productMaterialSupply)){
            return array();
        }

        $supplyArr = array();

        foreach ($productMaterialSupply as $val_material_list) {
            foreach ($val_material_list as $val_material_info) {
                if($val_material_info['materialNum'] < $productMaterial['materialNum'][$val_material_info['material']]){
                    continue;
                }

                if(empty($supplyArr)){
                    $num = floor($val_material_info['materialNum'] / $productMaterial['materialNum'][$val_material_info['material']]);
                    $val_material_info['num'] = $num;

                    $supplyArr[] = $val_material_info;
                }else{
                    // 比较存在的数据
                    foreach ($supplyArr as &$val_supply) {
                        // 当不是同一个原料时，更新时间段和供应量
                        if($val_material_info['material'] != $val_supply['material']){
                            if($val_supply['time_supply_s'] < $val_material_info['time_supply_s'] && $val_supply['time_supply_e'] > $val_material_info['time_supply_e']
                            ){
                                $val_supply['time_supply_s'] = $val_material_info['time_supply_s'];
                                $val_supply['time_supply_e'] = $val_material_info['time_supply_e'];
                            }

                            if($val_supply['time_supply_s'] > $val_material_info['time_supply_s'] && $val_supply['time_supply_e'] > $val_material_info['time_supply_e']
                                && $val_supply['time_supply_s'] < $val_material_info['time_supply_e']
                            ){
                                $val_supply['time_supply_e'] = $val_material_info['time_supply_e'];
                            }

                            if($val_supply['time_supply_s'] < $val_material_info['time_supply_s'] && $val_supply['time_supply_e'] < $val_material_info['time_supply_e']
                                && $val_supply['time_supply_e'] > $val_material_info['time_supply_s']
                            ){
                                $val_supply['time_supply_s'] = $val_material_info['time_supply_s'];
                            }

                            $num = floor($val_material_info['materialNum'] / $productMaterial['materialNum'][$val_material_info['material']]);

                            // 取最小供应量
                            if($val_supply['num'] > $num){
                                $val_supply['num'] = $num;
                            }
                        }else{
                            // 新增加
                            if($val_supply['time_supply_s'] > $val_material_info['time_supply_e'] || $val_supply['time_supply_e'] < $val_material_info['time_supply_s']){
                                $num = floor($val_material_info['materialNum'] / $productMaterial['materialNum'][$val_material_info['material']]);
                                $val_material_info['num'] = $num;

                                $supplyArr[] = $val_material_info;
                            }
                        }
                    }
                }
            }
        }

        $supplyArr = $this->verifySupply($productID, $supplyArr);

        return $supplyArr;
    }
}