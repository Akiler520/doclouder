<?php
/**
 *	document info model manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Model
 *
 *	@since 2015-10-29
 */
class DocumentInfo extends BaseModel
{
    /**
     * @var string
     * The name of current table
     */
    private $_table = 'document_info';

    public function initialize()
    {
        parent::initialize();
        $this->setSource($this->getTableName(__CLASS__));
    }
}