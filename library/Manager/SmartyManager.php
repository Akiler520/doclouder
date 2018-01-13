<?php
/**
 *	core view manager of system
 *  setting of Smarty
 *
 *	@author     akiler <532171911@qq.com>
 *	@copyright	 2010-2020
 *	@version    1.0
 *	@package    CoreManager
 *
 *	@since 2015-11-29
 */

require_once(ROOT_PATH . 'plugins/Smarty3/Smarty.class.php');

class SmartyManager extends Phalcon\Mvc\View\Engine
{
    protected $_smarty;

    protected $_params;

    /**
     * Adapter constructor
     *
     * @param \Phalcon\Mvc\View $view
     * @param \Phalcon\DI $di
     */
    public function __construct($view, $di)
    {
        $this->_smarty = new Smarty();
        $this->_smarty->template_dir = '.';
        $this->_smarty->compile_dir = CACHE_SMARTY_DIR . 'templates_c';
        $this->_smarty->config_dir = CACHE_SMARTY_DIR . 'configs';
        $this->_smarty->cache_dir = CACHE_SMARTY_DIR . 'cache';
        $this->_smarty->caching = false;
        $this->_smarty->debugging = true;

        //Initialize here the adapter
        parent::__construct($view, $di);
    }

    /**
     * Renders a view using the template engine
     *
     * @param string $path
     * @param array $params
     */
    public function render($path, $params)
    {
        if (!isset($params['content'])) {
            $params['content'] = $this->_view->getContent();
        }

        foreach($params as $key => $value){
            $this->_smarty->assign($key, $value);
        }

        $this->_view->setContent($this->_smarty->fetch($path));
    }
}