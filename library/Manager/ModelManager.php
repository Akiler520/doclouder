<?php
/**
 *	core model manager of system
 *
 *	@author     akiler <532171911@qq.com>
 *	@copyright	 2010-2020
 *	@version	 1.0
 *	@package	 CoreManager
 *
 *	@since      2015-11-29
 */
use Phalcon\Events\Event,
    Phalcon\Mvc\User\Plugin,
    Phalcon\Mvc\Model,
    Phalcon\Mvc\Dispatcher;

class ModelManager extends Plugin
{
    /**
     * The model of MVC
     * @var
     */
    private $_model;

    /**
     * The Events
     * The type of Events: beforeSave, beforeCreate, beforeUpdate, beforeDelete, beforeValidation...
     * @var
     */
    private $_event;
    public function __construct(Event $event, Phalcon\Mvc\Model $model) {
        $this->_model = $model;
        $this->_event = $event;
    }

    public function fire() {
        //Catch events produced by the User model
        $className = get_class($this->_model);
        $processFunction = 'process'.$className;
        if (method_exists($this, $processFunction)) {
            $this->$processFunction();
        }else{
//            throw new Phalcon\Exception("There is no process function!");
        }
    }

    public function processUser() {
        //create event listener
        $event_type = $this->_event->getType();

        if ($event_type == 'beforeSave') {
            if ($this->_model->username == 'test') {
                //throw new Phalcon\Exception("Scooby Doo isn't a robot!");
            }
        } elseif ($event_type == 'beforeValidation') {

        } elseif ($event_type == 'beforeCreate') {

        } elseif ($event_type == 'beforeUpdate') {

        } elseif ($event_type == 'beforeDelete') {

        } elseif ($event_type == 'afterSave') {

        }
        // afterCreate, afterUpdate...
    }

    public function processMenu(){
        //create event listener
        $event_type = $this->_event->getType();

        if ($event_type == 'beforeSave') {

        } elseif ($event_type == 'beforeValidation') {

        } elseif ($event_type == 'beforeCreate') {

        } elseif ($event_type == 'beforeUpdate') {

        } elseif ($event_type == 'beforeDelete') {

        } elseif ($event_type == 'afterSave') {
            // remove cache, in order to update the changes;
            $_cache_menu_key = "_menu_all_list";
            $this->getDI()->get("modelsCache")->delete($_cache_menu_key);
        } elseif ($event_type == 'afterDelete') {
            // remove cache, in order to update the changes;
            $_cache_menu_key = "_menu_all_list";
            $this->getDI()->get("modelsCache")->delete($_cache_menu_key);
        }
    }
}