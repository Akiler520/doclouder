<?php
/**
 *	core filter manager of system
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	CoreManager
 *
 *	@since 2015-11-29
 */
use Phalcon\Filter;

class FilterManager
{
    /**
     * filter object of phalcon
     * @var null|Filter
     */
    private $_filerObj = null;

    /**
     * skip to add into filter
     * @var array
     */
    private $_skip = array("__construct", "init");

    public function __construct(Phalcon\Filter $filter)
    {
        $this->_filerObj = $filter;
    }

    /**
     * Initialize own filter method
     */
    public function init(){
        $methods = get_class_methods($this);

        foreach ($methods as $val_method) {
            if(!in_array($val_method, $this->_skip)){
                $this->$val_method();
            }
        }
    }

    /**
     * md5
     * only return md5 like
     * return string
     */
    public function md5 () {
        $this->_filerObj->add("md5", function($value){
            return preg_replace('/[^0-9a-f]/', '', $value);
        });
    }

    /**
     * ipv4
     * if $value is not ipv4, return false
     * return bool|string
     */
    public function ipv4(){
        $this->_filerObj->add("ipv4", function($value){
            return filter_var($value, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        });
    }
}