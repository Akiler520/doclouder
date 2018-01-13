<?php
/**
 *	Document controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class DocumentController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }

    /**
     * edit info of document
     *
     * @desc status_code=1=ok, status_code=0=error
     * @request POST
     * @param string $name  name of document
     * @param integer $id   id of document
     * @return string json= {status_code: 1, status_message: "", data: array}
     */
    public function editAction(){
        $name = $this->getPost("name");
        $id = $this->getPost("id", "int");

        $data = array(
            'name'  => $name
        );

        $ret_edit = DocumentBusiness::getInstance()->edit($id, $data);
        if($ret_edit){
            $this->jsonReturn(RESPONSE_SUCCESS, LanguageBusiness::getInstance()->get("success"));
        }else{
            $this->jsonReturn(RESPONSE_ERROR, LanguageBusiness::getInstance()->get("error"));
        }
    }

    /**
     * upload document
     * @desc status_code=1=ok, status_code=0=error
     * @request POST
     * @param integer $folderId     ID of folder
     * @param object $_FILES        upload file
     * @return string json= {status_code: 1, status_message: "", data: array}
     */
    public function uploadAction(){
        $folderId = $this->getPost("folderId");

        // get the storage path by the folder;
        $folderObj = new Folder();
        $areaInfo = $folderObj->getAreaByID($folderId);
// TODO:
sleep(2);
        if(!$areaInfo || !is_dir($areaInfo['path'])){
            $this->jsonReturn(RESPONSE_ERROR, "The storage path of file is invalid, check please!");
        }

        $H5Uploader = new AkUploaderH5();

        // set the storage path
        $ret_path = $H5Uploader->setUploadPath($areaInfo['path']);
        if(!$ret_path){
            $message = $H5Uploader->getError();
            // error happened
            $this->jsonExit($message);
        }

        // process upload event
        $H5Uploader->upload();

        $message = $H5Uploader->getError();

        // all the chunk parts are uploaded successful, then save into database
        if($message['status_code'] == 1){
            $docInfo = AkFileSystemDir::pathInfo($message['original_name']);

            $saveData = array(
                'id_folder' => $folderId,
                'id_user'   => $this->_userInfo['id'],
                'name'      => $docInfo['filename'],
                'name_disk' => $message['save_name'],
                'md5'       => $message['md5'],
                'ext'       => $docInfo['extension'],
                'size'      => filesize($message['save_name']),
                'id_document_type'  => 1,
                'time_create'       => time()
            );

            $add_ret = DocumentBusiness::getInstance()->create($saveData);

            if(!$add_ret){
                $message['status_code'] = 0;
                $message['status_message'] = "Failed to save document information!";
            }else{
                $message['new_id'] = $add_ret;
            }
        }

        $this->jsonExit($message);
    }

    /**
     * check if the doc exist by md5 string
     *
     * @desc status_code=1=ok, status_code=0=error
     * @request POST
     * @return string json= {status_code: 1, status_message: "", data: array}
     */
    public function md5CheckAction(){
        $md5 = $this->getPost("md5");
        $folderId = $this->getPost("folderId");

        $info = Document::findFirst("md5='{$md5}'");

        if($info){
            $info = $info->toArray();

            // check if the file is exist in current folder, if so, don't create it
            $ret_data = array(
                'name'      => "{$info['name']}.{$info['ext']}",
                'id'        => $info['id']
            );

            $message = "File is exist!";

            // check if the file is exist in current folder, if so, don't create it
            if($info['id_folder'] == $folderId){
                $ret_data['folderId'] = $folderId;
                $message = "File is exist in current folder!";
            }

            $this->jsonReturn(RESPONSE_FILE_EXIST, $message, $ret_data);
        }

        $this->jsonReturn(RESPONSE_SUCCESS, "File is normal");
    }

    /**
     * if the doc exist, don't upload it again, just share the link with the exist file
     *
     * @desc status_code=1=ok, status_code=0=error
     * @request POST
     * @param array $folderId   ID of folder
     * @param array $list       the list of exist files
     * @return string json= {status_code: 1, status_message: "", data: array}
     */
    public function shareExistAction(){
        $existList = $this->getPost("list");
        $folderId = $this->getPost("folderId");

        foreach($existList AS $val_exist){
            $info = Document::findFirst(array("id='{$val_exist['existId']}'"));
            if($info){
                $info = $info->toArray();

                $saveData = array(
                    'id_folder' => $folderId,
                    'id_user'   => $this->_userInfo['id'],
                    'name'      => $info['name'],
                    'name_disk' => $info['name_disk'],
                    'md5'       => $info['md5'],
                    'ext'       => $info['ext'],
                    'size'      => $info['size'],
                    'id_share'  => $val_exist['existId'],
                    'id_document_type'  => 1,
                    'time_create'       => time()
                );

                $add_ret = DocumentBusiness::getInstance()->create($saveData);
            }
        }

        $this->jsonReturn(RESPONSE_SUCCESS, LanguageBusiness::getInstance()->get("success"));
    }
}