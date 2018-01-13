<?php
/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            佛祖保佑       永无BUG

                      佛曰:
        写字楼里写字间，写字间里程序员；
        程序人员写程序，又拿程序换酒钱。
        酒醒只在网上坐，酒醉还来网下眠；
        酒醉酒醒日复日，网上网下年复年。
        但愿老死电脑间，不愿鞠躬老板前；
        奔驰宝马贵者趣，公交自行程序员。
        别人笑我忒疯癫，我笑自己命太贱；
        不见满街漂亮妹，哪个归得程序员？


 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	CoreInit
 *
 *	@since 2015-09-29
*/

if (version_compare(PHP_VERSION, '5.0.0', '<')) {
    exit("Sorry, this system only run on PHP version 5 or greater!");
}

try {
    require_once("../config/init.php");
    $AkObject = new AkInit();
    $AkObject->fire();
} catch (Phalcon\Exception $e) {
    $exceptionManager = new ExceptionManager($e);
    $exceptionManager->process();
} catch (PDOException $e){
    $exceptionManager = new ExceptionManager($e, "PDO");
    $exceptionManager->process();
}

/**
 * @name 名字
 * @abstract 申明变量/类/方法
 * @access 指明这个变量、类、函数/方法的存取权限
 * @author 函数作者的名字和邮箱地址
 * @category 组织packages
 * @copyright 指明版权信息
 * @const 指明常量
 * @deprecate 指明不推荐或者是废弃的信息
 * @example 示例
 * @exclude 指明当前的注释将不进行分析，不出现在文挡中
 * @final 指明这是一个最终的类、方法、属性，禁止派生、修改。
 * @global 指明在此函数中引用的全局变量
 * @include 指明包含的文件的信息
 * @link 定义在线连接
 * @module 定义归属的模块信息
 * @modulegroup 定义归属的模块组
 * @package 定义归属的包的信息
 * @param 定义函数或者方法的参数信息
 * @return 定义函数或者方法的返回信息
 * @see 定义需要参考的函数、变量，并加入相应的超级连接。
 * @since 指明该api函数或者方法是从哪个版本开始引入的
 * @static 指明变量、类、函数是静态的。
 * @throws 指明此函数可能抛出的错误异常,极其发生的情况
 * @todo 指明应该改进或没有实现的地方
 * @var 定义说明变量/属性。
 * @version 定义版本信息
 */