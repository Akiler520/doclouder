<?php
/**
 *	Base controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */

use Phalcon\Mvc\View;
use Phalcon\Filter;

class ControllerBase extends Phalcon\Mvc\Controller
{
    protected $_userInfo = array();

    protected $_DI = null;

    protected function initialize()
    {
        Phalcon\Tag::prependTitle('DOClouder | ');

        $this->_userInfo = $userInfo = $this->session->get("auth");

        $langList = LanguageBusiness::getInstance()->getAllOfFront();

        $themeName = isset($_COOKIE['themeName']) ? $_COOKIE['themeName'] : 'default';

        $this->_DI = $this->getDI();

        $this->view->setVar('themeName',    $themeName);
        $this->view->setVar('userInfo',     $userInfo);
        $this->view->setVar('_lang',        $langList);
        $this->view->setVar('_lang_key',    LanguageBusiness::getInstance()->getLanguage());
        $this->view->setVar('langJson',     json_encode($langList));
        $this->view->setVar('_version',     VERSION);
    }

    /**
     * @author akiler
     * @param $uri
     * @return mixed
     */
    protected function forward($uri){
    	$uriParts = explode('/', $uri);

        $this->dispatcher->forward(
    		array(
    			'controller'=> $uriParts[0],
    			'action'    => $uriParts[1]
    		)
    	);
    }

    /**
     * get $_REQUEST and $_GET request from client
     *
     * @param $param
     * @param null $filter
     * @param null $default
     * @return mixed|void
     */
    public function get($param, $filter = null, $default = null){
        $request = $this->dispatcher->getParam($param, $filter, $default);
        if(empty($request)){
            $request = $this->request->get($param, $filter, $default);
        }

        return $request;
    }

    /**
     * get $_POST request only from client
     *
     * @param $param
     * @param null $filter
     * @param null $default
     * @return string
     */
    public function getPost($param, $filter = null, $default = null){
        $request = $this->request->getPost($param, $filter, $default);

        return $request;
    }

    /**
     * feedback json data and exit the procedure
     * @param array $data
     */
    public function jsonExit($data){
        echo(json_encode($data));
        exit;
    }

    /**
     * feedback json data
     *
     * @param int $code
     * @param string $message
     * @param array $data
     * @param bool|true $exit
     */
    public function jsonReturn($code = RESPONSE_SUCCESS, $message = '', $data = array(), $exit = true){
        if(empty($message)){
            $message = LanguageBusiness::getInstance()->get("success");
        };

        $result = array(
            'status_code'   => $code,
            'status_message'=> $message,
            'data'          => $data
        );

        echo(json_encode($result));
        if($exit) exit;
    }

}
