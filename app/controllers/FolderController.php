<?php
/**
 *	folder controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class FolderController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    /**
     * get documents of system;
     * @request GET
     * @return string json
     */
    public function treeSystemAction()
    {
        FolderBusiness::getInstance()->getList();
        $tree = FolderBusiness::getInstance()->getTree(0);

        $this->jsonExit($tree);
    }

    /**
     * get documents of personal;
     * only belongs to user;
     * @request GET
     * @return string json
     */
    public function treePersonalAction()
    {
        FolderBusiness::getInstance()->getList();
        $tree = FolderBusiness::getInstance()->getTree(-1, $this->_userInfo['id']);

        $this->jsonExit($tree);
    }

    /**
     * get documents list of folder by page;
     *
     * @request GET
     * @param integer $folderId         id of folder,
     * @param integer $page             page,
     * @param integer $pageSize         size of each page
     * @return string json
     */
    public function getListAction()
    {
        $id_folder = $this->get("folderId", "int");
        $page = $this->get("page", "int");
        $page_size = $this->get("pageSize", "int");

        $list = FolderBusiness::getInstance()->getListByID($id_folder, $page, $page_size);

        $this->jsonExit($list);
    }

    /**
     * edit folder info
     *
     * @desc status_code=1=ok, status_code=0=error
     * @request POST
     * @param string $name  name of folder
     * @param integer $id   id of folder
     * @return string json= {status_code: 1, status_message: "", data: array}
     */
    public function editAction()
    {
        $name = $this->getPost("name");
        $id = $this->getPost("id", "int");

        $data = array(
            'name'  => $name
        );

        $ret_edit = FolderBusiness::getInstance()->edit($id, $data);
        if($ret_edit){
            $this->jsonReturn(RESPONSE_SUCCESS, LanguageBusiness::getInstance()->get("success"));
        }else{
            $this->jsonReturn(RESPONSE_ERROR, LanguageBusiness::getInstance()->get("error"));
        }
    }
}