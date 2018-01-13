<?php
/**
 *	Folder business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class FolderBusiness extends Business
{
    /**
     * object of current class
     *
     * @var object
     */
    private static $_instance;

    private $_list = array();

    private function __construct()
    {
    }

    /**
     * instance of the class
     * to avoid create multiple instance of class
     *
     * @return object
     */
    public static function getInstance(){
        if(!isset(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function getList(){
        $this->_list = Folder::find()->toArray();

        return $this->_list;
    }

    /**
     * get the folder tree by parent id of folder
     * @param $parent_id
     * @param $id_user
     * @return array
     */
    public function getTree($parent_id, $id_user = 0){
        $list = array();

        foreach($this->_list AS $val_list){
            if($parent_id == $val_list['pid'] && $val_list['id_user'] == $id_user){
                $val_list['text'] = "[{$val_list['id']}]" . $val_list['name'];
                $listTmp = $val_list;

                $child = $this->getTree($val_list['id'], $id_user);

                if(!empty($child)){
//                    $listTmp['iconCls'] = "icon-hamburg-folder";
                    $listTmp['children'] = $child;
                }else{
                    $listTmp['iconCls'] = "icon-standard-folder";
                }

                $listTmp['url'] = "/Folder/getList/folderId/{$val_list['id']}";

                $list[] = $listTmp;
            }
        }

        return $list;
    }

    /**
     * get list of folder by page
     * include documents and folders
     *
     * @param $id_folder
     * @param int $page
     * @param int $page_size
     * @return mixed
     */
    public function getListByID($id_folder, $page = 1, $page_size = 100){
        $id_user = $this->getUserInfo()['id'];

        $whereCount = array(
            "id_folder = ?0 AND id_user = ?1",
            "bind" => array($id_folder, $id_user)
        );

        $documentObj = new Document();
        $list['rows'] = $documentObj->getByFolderID($id_folder, $id_user, $page, $page_size);
        $list['total'] = $documentObj->count($whereCount);

        return $list;
    }

    /**
     * edit folder info
     * @param $id_folder
     * @param $data
     * @return bool
     * @throws \Phalcon\Exception
     */
    public function edit($id_folder, $data){
        if(!is_numeric($id_folder) || empty($data)){
            return false;
        }

        $id_user = $this->getUserInfo()['id'];

        $whereGet[] = "id=:id_folder: AND id_user=:id_user:";
        $whereGet['bind'] = array(
            'id_folder' => $id_folder,
            'id_user'   => $id_user
        );

        // TODO: permission check

        $Info = Folder::findFirst($whereGet);

        if(!$Info){
            ExceptionManager::throwOut(LanguageBusiness::getInstance()->get("folder_cannot_edit"), ExceptionManager::WARNING);
        }

        foreach ($data as $key_data => $val_data) {
            $Info->$key_data = $val_data;
        }

        return $Info->save();
    }
}