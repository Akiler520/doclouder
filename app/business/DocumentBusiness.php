<?php
/**
 *	Document business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class DocumentBusiness extends Business
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
     * @return object
     */
    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    /**
     * edit document info by doc ID
     *
     * @usage edit(1, array(
            'test'  => info,
     *      'ccc'   => info1
     * ));
     * @param integer $id_doc   test comment
     * @param array $data       the data need to be edit
     * @return bool
     * @throws \Phalcon\Exception
     */
    public function edit($id_doc, $data){
        $id_user = $this->getUserInfo()['id'];

        $whereGet[] = "id=:id_doc: AND id_user=:id_user:";
        $whereGet['bind'] = array(
            'id_doc'    => $id_doc,
            'id_user'   => $id_user
        );

        // TODO: permission check

        $docInfo = Document::findFirst($whereGet);

        if(!$docInfo){
            ExceptionManager::throwOut(LanguageBusiness::getInstance()->get("doc_cannot_edit"), ExceptionManager::WARNING);
        }

        foreach ($data as $key_data => $val_data) {
            $docInfo->$key_data = $val_data;
        }

        return $docInfo->save();
    }

    /**
     * create new document
     *
     * @param array $data
     * @return \Phalcon\Mvc\Model\Resultset|\Phalcon\Mvc\Phalcon\Mvc\Model
     */
    public function create($data = array()){
        $documentObj = new Document();

        $add_ret = $documentObj->create($data);

        if(!$add_ret){
            return false;
        }

        return $documentObj->id;
    }
}