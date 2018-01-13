<?php
/**
 *	document model manager
 *
 *	@author     akiler <532171911@qq.com>
 *	@copyright	 2010-2020
 *	@version    1.0
 *	@package    Model
 *
 *	@since 2015-10-29
 */
class Document extends BaseModel
{
    public function initialize()
    {
        parent::initialize();

        $this->setSource($this->getTableName(__CLASS__));

        $this->belongsTo("id_document_type", "DocumentType", "id");
        $this->hasOne("id", "DocumentInfo", "id_document");

    }

    /**
     * get the document list by folder id
     *
     * @param $id_folder
     * @param $id_user
     * @param $page
     * @param $page_size
     * @return mixed
     */
    public function getByFolderID($id_folder, $id_user, $page = 1, $page_size = 100){
        $offset = ($page <= 1) ? 0 : ($page - 1);
        $start = $offset * $page_size;
        $end = $page * $page_size;

        $list = $this->_select->createBuilder()
            ->columns(array("d.*","dt.name AS type","u.name","u.vorname"))
            ->from(array("d" => "Document"))
            ->join("DocumentType", "d.id_document_type=dt.id", "dt")
            ->join("User", "d.id_user=u.id", "u")
            ->where('id_folder = :id_folder:', array('id_folder' => $id_folder))
            ->andWhere("id_user = :id_user:", array("id_user" => $id_user))
            ->offset($start)
            ->limit($page_size)
            ->getQuery()
            ->execute()
            ;

        if(!$list){
            return array();
        }

        $result = array();

        foreach ($list as $item) {
            $itemArr = $item->d->toArray();
            $itemArr['type'] = $item->type;
            $itemArr['user'] = $item->name . " ". $item->vorname;

            $result[] = $itemArr;
        }

        return $result;
    }

}