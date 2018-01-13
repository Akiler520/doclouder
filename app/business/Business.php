<?php
/**
 *	Business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class Business extends \Phalcon\Di\Injectable implements \Phalcon\Events\EventsAwareInterface, \Phalcon\Di\InjectionAwareInterface
{
    protected $_lang = "en";

    /**
     * get language of system
     * @return mixed|string
     */
    public function getLanguage(){
        $lang = $this->session->get('lang');
        $lang = $lang ? $lang : 'en';

        return $lang;
    }

    /**
     * get information of login user
     * <code>
     * echo "userName:" . $username;
     * </code>
     * @return mixed
     */
    public function getUserInfo(){
        return $this->session->get('auth');
    }
}