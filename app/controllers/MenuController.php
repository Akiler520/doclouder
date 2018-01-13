<?php
/**
 *	menu controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class MenuController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    public function mainAction()
    {
        $list = MenuBusiness::getInstance()->getTree(0, false);

        $this->jsonExit($list);
    }

    public function treeAction(){
        $pid = $this->get("pid");

        $list = MenuBusiness::getInstance()->getTree($pid);

        $this->jsonExit($list);
    }

    public function settingAction(){
        $list = MenuBusiness::getInstance()->getTree(0);

        $return['total'] = count($list);
        $return['rows'] = $list;

        $this->jsonExit($return);
    }

    public function editAction(){
        $data = $this->getPost("data");
        $id = $this->getPost("id");

        $ret_data = array();

        if($id > 0){
            $ret = MenuBusiness::getInstance()->edit($id, $data);
        }else{
            $ret = MenuBusiness::getInstance()->create($data);
            if($ret){
                $ret_data['id'] = $ret;
            }
        }

        if($ret){
            $this->jsonReturn(RESPONSE_SUCCESS, LanguageBusiness::getInstance()->get("success"), $ret_data);
        }else{
            $this->jsonReturn(RESPONSE_ERROR, LanguageBusiness::getInstance()->get("error"));
        }
    }

    public function deleteAction(){
        $id = $this->getPost("id");

        $menu = Menu::findFirst("id={$id}");
        $ret = $menu->delete();

        if($ret){
            $this->jsonReturn(RESPONSE_SUCCESS, LanguageBusiness::getInstance()->get("success"));
        }else{
            $this->jsonReturn(RESPONSE_ERROR, LanguageBusiness::getInstance()->get("error"));
        }
    }
}