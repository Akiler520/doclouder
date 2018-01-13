<?php
/**
 *	base model manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Model
 *
 *	@since 2015-10-29
 */
class BaseModel extends Phalcon\Mvc\Model
{
    /**
     * object of PHQL builder
     * @var null
     */
    protected $_select = null;

    /**
     * object of database connection
     * @var null
     */
    protected $_db = null;

    /**
     * config data
     * @var null
     */
    protected $_config = null;

    public function initialize(){
        $this->setReadConnectionService("dbSlave");
        $this->setWriteConnectionService("dbMaster");

        $this->_select = $this->getModelsManager();
        $this->_db = $this->getDI()->get("dbSlave");
        $this->_config = $this->getDI()->get("config");
    }

    public function getMessages()
    {
        $messages = array();

        foreach (parent::getMessages() as $message) {
            switch ($message->getType()) {
                case 'InvalidCreateAttempt':
                    $messages[] = 'The record cannot be created because it already exists';
                    break;
                case 'InvalidUpdateAttempt':
                    $messages[] = 'The record cannot be updated because it doesn\'t exist';
                    break;
                case 'PresenceOf':
                    $messages[] = 'The field ' . $message->getField() . ' is mandatory';
                    break;
            }
        }

        return $messages;
    }

    /**
     * execute the sql string, and return array
     *
     * only for select
     * @param $sql
     * @return mixed|array
     */
    public function querySql($sql){
        $queryString = substr(trim($sql, " "), 0, 5);

        if(strtolower($queryString) != "select"){
            return false;
        }

        $result = $this->_db->query($sql);

        $result->setFetchMode(Phalcon\Db::FETCH_ASSOC);

        return $result;
    }

    /**
     * get table name by model class name and the config
     *
     * @param $className
     * @return string
     */
    public function getTableName($className){
        return $this->_config->databaseMaster->prefix . AkString::camel2underline($className);
    }
}