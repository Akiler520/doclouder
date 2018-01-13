<?php
/**
 *	upload controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class UploadController extends ControllerBase
{
    /**
     * @func
     */
    public function initialize()
    {
        parent::initialize();
    }

    public function documentAction(){
        $H5Uploader = new AkUploaderH5();

        $ret_path = $H5Uploader->setUploadPath(UPLOAD_PATH);
        if(!$ret_path){
            $message = $H5Uploader->getError();
            // error happened
            $this->jsonExit($message);
        }

        $H5Uploader->upload();

        $message = $H5Uploader->getError();

        // all the chunk parts are uploaded successful, then save into database
        if($message['status_code'] == 1){
            $docInfo = pathinfo($message['original_name']);

            $saveData = array(
                'id_folder' => $this->getPost("folderId"),
                'id_user'   => $this->_userInfo['id'],
                'name'      => $docInfo['filename'],
                'name_disk' => $message['save_name'],
                'ext'       => $docInfo['extension'],
                'size'      => filesize($message['save_name']),
                'time_create'   => time()
            );

            $add_ret = DocumentBusiness::getInstance()->create($saveData);

            $message['new_id'] = $add_ret;

            if(!$add_ret){
                $message['status_code'] = 0;
            }
        }

        $this->jsonExit($message);
    }

    public function pageAction(){

    }
}