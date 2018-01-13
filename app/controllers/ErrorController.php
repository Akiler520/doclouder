<?php
/**
 *	error controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class ErrorController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    /**
     * not found the page
     */
    public function notFoundAction(){
        $this->response->setStatusCode(404, "Not Found")->sendHeaders();

        if(AkString::isAjax()){
            AkString::jsonReturn(RESPONSE_NOT_FOUND, "404 Not Found !");
        }
    }
}