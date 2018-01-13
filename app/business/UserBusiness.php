<?php
/**
 *	User business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class UserBusiness extends Business
{
    /**
     * object of current class
     *
     * @var object
     */
    private static $_instance;

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

        return self::$_instance;
    }

    public function getById($user_id){
        $info = User::findFirst($user_id)->toArray();

        return $info;
    }

    /**
     * set language of user interface
     * @param $lang_key
     */
    public function setLanguage($lang_key){
        $this->session->set('lang', $lang_key);
    }
}