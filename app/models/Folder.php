<?php
/**
 *	folder model manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Model
 *
 *	@since 2015-10-29
 */
class Folder extends BaseModel
{
    public function initialize()
    {
        parent::initialize();
        $this->setSource($this->getTableName(__CLASS__));
    }

    /**
     * get the area info which used to save the documents
     *
     * @param $id_folder
     * @return array
     */
    public function getAreaByID($id_folder){
        $list = $this->_select->createBuilder()
            ->columns(array("a.*"))
            ->from(array("f" => "Folder"))
            ->join("FolderType", "f.id_folder_type=ft.id", "ft")
            ->join("Area", "ft.id_area=a.id", "a")
            ->where('f.id = :id_folder:', array('id_folder' => $id_folder))
            ->getQuery()
            ->execute()
        ;

        if(!$list){
            return array();
        }

        $result = $list->toArray();

        return empty($result) ? array() : $result[0];
    }
}