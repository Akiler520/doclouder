<?php
/**
 *	setting controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class SettingController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    public function treeAction(){
        $pid = $this->get("id");

        $list = MenuBusiness::getInstance()->getTree($pid);

        $this->jsonExit($list);
    }
}