<?php
/**
 *	core security manager of system
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	CoreManager
 *
 *	@since 2015-11-29
 */
use Phalcon\Events\Event,
    Phalcon\Mvc\User\Plugin,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Acl;

/**
 * Security
 *
 * This is the security plugin which controls that users only have access to the modules they're assigned to
 */
class SecurityManager extends Plugin
{
    private $_publicResource = array();

    public function __construct()
    {
//        $this->_dependencyInjector = $dependencyInjector;
    }

    /**
     * set public resource without login check
     * @param $src
     */
    public function setPublicResource($src){
        $src = $src->toArray();

        foreach ($src as $key_src => $val_src) {
            $this->_publicResource[$key_src] = explode(',', $val_src);
        }
    }

    private function getAcl()
    {
        if (!isset($this->persistent->acl)) {

            $acl = new Phalcon\Acl\Adapter\Memory();

            $acl->setDefaultAction(Phalcon\Acl::DENY);

            //Register roles
            $roles = array(
                'users' => new Phalcon\Acl\Role('Users'),
                'guests' => new Phalcon\Acl\Role('Guests')
            );
            foreach ($roles as $role) {
                $acl->addRole($role);
            }

            //Private area resources
            $privateResources = array(
                'companies' => array('index', 'search', 'new', 'edit', 'save', 'create', 'delete'),
                'products' => array('index', 'search', 'new', 'edit', 'save', 'create', 'delete'),
                'producttypes' => array('index', 'search', 'new', 'edit', 'save', 'create', 'delete'),
                'invoices' => array('index', 'profile')
            );
            foreach ($privateResources as $resource => $actions) {
                $acl->addResource(new Phalcon\Acl\Resource($resource), $actions);
            }

            //Public area resources
            $publicResources = array(
                'index' => array('index'),
                'about' => array('index'),
                'session' => array('index', 'register', 'start', 'end'),
                'contact' => array('index', 'send')
            );
            foreach ($publicResources as $resource => $actions) {
                $acl->addResource(new Phalcon\Acl\Resource($resource), $actions);
            }

            //Grant access to public areas to both users and guests
            foreach ($roles as $role) {
                foreach ($publicResources as $resource => $actions) {
                    $acl->allow($role->getName(), $resource, '*');
                }
            }

            //Grant acess to private area to role Users
            foreach ($privateResources as $resource => $actions) {
                foreach ($actions as $action){
                    $acl->allow('Users', $resource, $action);
                }
            }

            //The acl is stored in session, APC would be useful here too
            $this->persistent->acl = $acl;
        }

        return $this->persistent->acl;
    }

    /**
     * white list check
     * if true, the user can access without login
     *
     * @param $controller
     * @param $action
     * @return bool
     */
    private function whiteListCheck($controller, $action){
        $allow = false;

        foreach($this->_publicResource AS $publicController => $publicAction){
            if($controller == $publicController && in_array($action, $publicAction)){
                $allow = true;
                break;
            }
            if($controller == $publicController && in_array("*", $publicAction)){
                $allow = true;
                break;
            }
        }

        return $allow;
    }

    /**
     * Triggered before entering in the dispatch loop.
     * At this point the dispatcher don’t know if the controller or the actions to be executed exist.
     * The Dispatcher only knows the information passed by the Router.
     *
     * execute order: 1
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function beforeDispatchLoop(Event $event, Dispatcher $dispatcher){
        $keyParams = array();
        $params    = $dispatcher->getParams();

        // Use odd parameters as keys and even as values
        foreach ($params as $number => $value) {
            if ($number & 1) {
                $keyParams[$params[$number - 1]] = $value;
            }
        }

        // Override parameters
        $dispatcher->setParams($keyParams);
    }

    /**
     * Triggered after entering in the dispatch loop.
     * At this point the dispatcher don’t know if the controller or the actions to be executed exist.
     * The Dispatcher only knows the information passed by the Router.
     *
     * execute order: 2
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function beforeDispatch(Event $event, Dispatcher $dispatcher){
        $controller = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();

        if (!$this->session->has('auth')){
            if(!$this->whiteListCheck($controller, $action)){
                if(AkString::isAjax()){
                    AkString::jsonReturn(-1, LanguageBusiness::getInstance()->get("unlogin_alert"));
                }else{
                    $dispatcher->forward(
                        array(
                            'controller'=> 'User',
                            'action'    => 'start'
                        )
                    );
                }
            }
        }
    }

    /**
     * Triggered before executing the controller/action method.
     * At this point the dispatcher has been initialized the controller and know if the action exist.
     *
     * execute order: 3
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher){
        // This is executed before every found action

        // TODO: check if the user can access the controller and action;
        if ($dispatcher->getControllerName() == 'Test' && $dispatcher->getActionName() == 'test1') {

            ExceptionManager::throwOut("You don't have permission to save posts", ExceptionManager::INFO);

        }
    }

    /**
     * Allow to globally initialize the controller in the request
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function initialize(Event $event, Dispatcher $dispatcher){

    }

    /**
     * Triggered when the action was not found in the controller
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function beforeNotFoundAction(Event $event, Dispatcher $dispatcher){
        /*if(AkString::isAjax()){
            AkString::jsonReturn(0, "404 Not Found !");
        }

        $dispatcher->forward(
            array(
                'controller'=> 'Error',
                'action'    => 'notFound'
            )
        );*/
    }

    /**
     * Triggered after executing the controller/action method.
     * As operation cannot be stopped, only use this event to make clean up after execute the action
     *
     * execute order: 4
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function afterExecuteRoute(Event $event, Dispatcher $dispatcher){
    }

    /**
     * Triggered before the dispatcher throws any exception
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     * @param Exception $exception
     *
     * @return bool
     */
    public function beforeException(Event $event, Dispatcher $dispatcher, $exception){
        switch ($exception->getCode()) {
            case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
            case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
                $dispatcher->forward(
                    array(
                        'controller'=> 'Error',
                        'action'    => 'notFound'
                    )
                );

                return false;
            break;
        }

        return true;
    }

    /**
     * Triggered after executing the controller/action method.
     * As operation cannot be stopped, only use this event to make clean up after execute the action
     *
     * execute order: 5
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function afterDispatch(Event $event, Dispatcher $dispatcher){
    }

    /**
     * Triggered after exiting the dispatch loop
     *
     * execute order: 6
     *
     * @param Event $event
     * @param Dispatcher $dispatcher
     */
    public function afterDispatchLoop(Event $event, Dispatcher $dispatcher){
    }

}
