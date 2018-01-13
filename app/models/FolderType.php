<?php
/**
 *	folder type model manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Model
 *
 *	@since 2015-10-29
 */
class FolderType extends BaseModel
{

    public function initialize()
    {
        parent::initialize();
        $this->setSource($this->getTableName(__CLASS__));
    }
}