<?php
/**
 *	test controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
use Phalcon\Validation;
use Phalcon\Validation\Validator\Email;
use Phalcon\Validation\Validator\PresenceOf;

class TestController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    public function indexAction(){

    }

    public function test1Action(){

    }

    /**
     * @func test comment
     */
    public function getClassFuncAction(){
        $list = SecurityBusiness::getInstance()->getActionList();

        AkString::printM($list);
    }

    public function getBackTraceAction(){
        $trace = debug_backtrace();

        foreach ($trace as $val_trace) {
            AkString::printM($val_trace['file'], false);
            AkString::printM($val_trace['line'], false);
            AkString::printM($val_trace['function'], false);
            AkString::printM($val_trace['args'], false);
        }
    }

    public function  FetchRepeatMemberInArray($array) {
        // 获取去掉重复数据的数组
        $unique_arr = array_unique ( $array );
        // 获取重复数据的数组
        $repeat_arr = array_diff_assoc ( $array, $unique_arr );
        return $repeat_arr;
    }

    public function createCoupons($length = 10, $codePre = "W"){
        $codeArr = array();

        for ($i = 0; $i < ($length- strlen($codePre)); $i ++) {
            $type = mt_rand(1,2);
            if($type==1){//字母
                while (true) {
                    $ascii = mt_rand(65, 90);
                    if ($ascii != 79 && $ascii != 73) {
                        // 排除O字母和I
                        break;
                    }
                }
                $codeArr[] = chr($ascii);
            }else{//数字
                $num = mt_rand(2,9);
                $codeArr[] = $num;
            }
        }
        $code = implode('', $codeArr);
        strlen($codePre) > 0 && $code = $codePre.$code;

        return $code;
    }

    public function createCouponsList($total_price){
        $coupons = array();
        // TODO: 根据不同金额，生产不同面值的代金券，并且面额是10的整数倍；
        if($total_price <= 50){
            $count = (int)floor($total_price/10);

            for($i = 0; $i < $count; $i++){
                $coupons[] = 10;
            }
        }elseif($total_price > 50 && $total_price <=100){
            $coupons[] = 25;
            $coupons[] = 25;
            $count = (int)floor(($total_price - 50)/10);

            for($i = 0; $i < $count; $i++){
                $coupons[] = 10;
            }
        }elseif($total_price > 100 && $total_price <=200){
            $coupons[] = 25;
            $coupons[] = 25;
            $coupons[] = 25;
            $coupons[] = 25;

            $count = (int)floor(($total_price - 100)/10);

            for($i = 0; $i < $count; $i++){
                $coupons[] = 10;
            }
        }elseif($total_price > 200 && $total_price <=500){
            $coupons[] = 50;
            $coupons[] = 50;
            $coupons[] = 25;
            $coupons[] = 25;
            $coupons[] = 25;
            $coupons[] = 25;

            $rest = $total_price - 200;

            if($rest < 100){
                $count = (int)floor(($rest)/10);

                for($i = 0; $i < $count; $i++){
                    $coupons[] = 10;
                }
            }else{
                $count = (int)floor(($rest)/50);

                for($i = 0; $i < $count; $i++){
                    $coupons[] = 50;
                }

                // 分50份后，还有大于10的金额，则按照10来分
                $count = (int)floor(($rest - $count * 50)/10);

                if($count > 0){
                    for($i = 0; $i < $count; $i++){
                        $coupons[] = 10;
                    }
                }
            }
        }elseif($total_price > 500 && $total_price <=1000){
            $count = (int)floor(($total_price)/50);

            for($i = 0; $i < $count; $i++){
                $coupons[] = 50;
            }

            // 分50份后，还有大于10的金额，则按照10来分
            $count = (int)floor(($total_price - $count * 50)/10);

            if($count > 0){
                for($i = 0; $i < $count; $i++){
                    $coupons[] = 10;
                }
            }
        }elseif($total_price >1000){
            $count = (int)floor(($total_price)/100);

            for($i = 0; $i < $count; $i++){
                $coupons[] = 100;
            }

            // 分100份后，还有大于10的金额，则按照10来分
            $count = (int)floor(($total_price - $count * 100)/10);

            if($count > 0){
                for($i = 0; $i < $count; $i++){
                    $coupons[] = 10;
                }
            }
        }

        rsort($coupons);

        return $coupons;
    }

    public function testAction(){
        AkString::printM(time()-15*60);
//        AkString::printM(strtotime("2016-06-01 18:12:12 "));
        $list = $this->createCouponsList(400);
        AkString::printM($list, false);
        set_time_limit(0);
        ignore_user_abort();

        AkString::printM(xdebug_time_index(), false);

        for($i=0;$i<10;$i++){
            $units[] = AkString::createCoupons(8);
        }

        AkString::printM(xdebug_time_index(), false);
        AkString::printM($units, false);

        AkString::printM($this->FetchRepeatMemberInArray($units), false);

        AkString::printM(xdebug_time_index(), false);

        AkString::printM("OK");
    }

    public function createError(){
        AkString::ddd();
    }

    public function errorCatchAction(){
        $this->createError();
    }

    public function filterAction(){
        var_dump(filter_var('bob@example.com', FILTER_VALIDATE_EMAIL));
        var_dump(filter_var('http://example.com', FILTER_VALIDATE_URL, FILTER_FLAG_PATH_REQUIRED));

        $ip = $this->get("ip", "md5");

        AkString::printM($ip,false);
    }

    public function validateAction(){
        $email = $this->get("email", "ipv4");
AkString::printM($email);
AkString::printM($email);
        $validation = new Validation();

        $validation->add(
            'email',
            new PresenceOf(
                array(
                    'message' => 'The e-mail is required'
                )
            )
        );

        $validation->add(
            'email',
            new Email(
                array(
                    'message' => 'The e-mail is not valid'
                )
            )
        );

        $validation->add(
            'name',
            new PresenceOf(
                array(
                    'message' => 'The name is required'
                )
            )
        );

        $messages = $validation->validate($_REQUEST);
        if (count($messages)) {
            foreach ($messages as $message) {
                echo $message, '<br>';
            }
        }
    }

    public function testTreeAction(){
        require_once(LIB_PATH . "Test/test.php");

        echo "<pre>";
        $bt=new BinaryTree(array('A','B','D','','','E','','G','','','C','F','','',''));
        echo "二叉树结构：＼r＼n";
        var_dump($bt);
        $btarr=array();
        echo "先序递归遍历二叉树：＼r＼n";
        $bt->getPreorderTraversal($bt->mRoot,$btarr);
        var_dump($btarr);
        echo "先序非递归遍历二叉树：＼r＼n";
        $arrBTdata=array();
        $bt->getPreorderTraversalNoRecursion($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "中序递归遍历二叉树：＼r＼n";
        $arrBTdata=array();
        $bt->getInorderTraversal($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "中序非递归遍历二叉树：＼r＼n";
        $arrBTdata=array();
        $bt->getInorderTraversalNoRecursion($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "后序递归遍历二叉树：＼r＼n";
        $arrBTdata=array();
        $bt->getPostorderTraversal($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "后序非递归遍历二叉树:＼r＼n";
        $arrBTdata=array();
        $bt->getPostorderTraversalNoRecursion($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "按层次遍历二叉树：＼r＼n";
        $arrBTdata=array();
        $bt->getLevelorderTraversal($bt->mRoot,$arrBTdata);
        var_dump($arrBTdata);
        echo "叶子结点的个数为：".$bt->getLeafNodeCount($bt->mRoot);
        echo "＼r＼n";
        echo "二叉树深度为:".$bt->getBinaryTreeDepth($bt->mRoot);
        echo "＼r＼n";
        echo "判断二叉树是否为空：";
        var_dump($bt->getIsEmpty());
        echo "将二叉树置空后：";
        $bt->setBinaryTreeNull();
        var_dump($bt);
        echo "</pre>";
    }

    public function createDataAction(){
        set_time_limit(0);
        ignore_user_abort();

        $data = array();

        for($i = 1; $i <= 10; $i++){
            $ID = str_pad($i, 4, "0", STR_PAD_LEFT);
            $level = rand(1, 4);

            $data[] = array(
                'name'      => "Name-{$ID}",
                'level'     => $level,
                'info'      => "Test Info: name-{$ID}, level-{$level}",
                'description'   => "Description: name-{$ID}, level-{$level}"
            );
        }


        $systemObj = new SystemInfo();
        $systemObj->create($data);

        return;

        AkString::printM(xdebug_time_index(), false);

        for($i = 59726; $i <= 100000; $i++){
            $ID = str_pad($i, 4, "0", STR_PAD_LEFT);
            $level = rand(1, 4);

            $data = array(
                'name'      => "Name-{$ID}",
                'level'     => $level,
                'info'      => "Test Info: name-{$ID}, level-{$level}",
                'description'   => "Description: name-{$ID}, level-{$level}"
            );

            $systemObj = new SystemInfo();
            $systemObj->create($data);
        }

        AkString::printM(xdebug_time_index(), false);

    }

    public function getDataAction(){
        $systemObj = new SystemInfo();

        $where = array(
            "name LIKE '%1%'",
            "ORDER" => "name"
        );

        AkString::printM(xdebug_time_index(), false);

        $data = $systemObj->find($where);

        AkString::printM(xdebug_time_index(), false);
    }
}