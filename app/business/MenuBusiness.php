<?php
/**
 *	Menu business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class MenuBusiness extends Business
{
    /**
     * object of current class
     *
     * @var object
     */
    private static $_instance;

    /**
     * all valid data of menu
     * @var array
     */
    private $_list_menu = array();

    private function __construct()
    {
    }

    /**
     * instance of the class
     * to avoid create multiple instance of class
     *
     * @return UserBusiness|object
     */
    public static function getInstance(){
        if(!isset(self::$_instance)) {
            self::$_instance = new self();
        }

        self::$_instance->init();

        return self::$_instance;
    }

    /**
     * init
     */
    public function init(){
        if(empty($this->_list_menu)){
            $this->_list_menu = $this->getAll();
        }
    }

    /**
     * get all of menu data
     * from cache or database
     *
     * @return mixed
     */
    public function getAll(){
        $_cache_key = "_menu_all_list";

        $list = $this->modelsCache->get($_cache_key, 3600);

        if(!$list){
            $list = Menu::find()->toArray();

            $this->modelsCache->save($_cache_key, $list);
        }

        return $list;
    }

    /**
     * get tree list of menu
     *
     * @param $pid
     * @param bool|true $recursively
     * @return array
     */
    public function getTree($pid, $recursively = true){
        $list  = array();

        foreach ($this->_list_menu as $val_list) {
            if($val_list['pid'] == $pid){
                $val_list['disabled'] = ($val_list['is_valid'] == 1) ? false : true;

                if(!empty($val_list['href']) && $val_list['href'] != "#" && !stripos($val_list['href'], ".json")){
                    $tmp = explode('/', trim($val_list['href'], "/ "));
                    $tmp[] = 'id';
                    $tmp[] = $val_list['id'];

                    $val_list['href'] = "/" . implode('/', $tmp);
                }

                $val_list['url'] = $val_list['href'];

                $listTmp = $val_list;

                if($recursively){
                    $child = $this->getTree($val_list['id']);
                    if(!empty($child)){
                        $listTmp['children'] = $child;
                    }
                }

                $list[] = $listTmp;
            }
        }

        return $list;
    }

    /**
     * edit menu
     * @param $id_menu
     * @param $data
     * @return bool
     * @throws \Phalcon\Exception
     */
    public function edit($id_menu, $data){
        $whereGet[] = "id=:id_menu:";
        $whereGet['bind'] = array(
            'id_menu'    => $id_menu
        );

        $info = Menu::findFirst($whereGet);

        if(!$info){
            ExceptionManager::throwOut(LanguageBusiness::getInstance()->get("menu_cannot_edit"), ExceptionManager::WARNING);
        }

        foreach ($data as $key_data => $val_data) {
            $info->$key_data = $val_data;
        }

        return $info->save();
    }

    /**
     * add new menu
     * @param array $data
     * @return bool|\Phalcon\Mvc\Model\Resultset|\Phalcon\Mvc\Phalcon\Mvc\Model
     */
    public function create($data = array()){
        $menuObj = new Menu();

        $add_ret = $menuObj->create($data);

        if(!$add_ret){
            return false;
        }

        return $menuObj->id;
    }
}