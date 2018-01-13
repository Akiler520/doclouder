<?php
/**
 *	core init manager of system
 *
 *	@author     akiler <532171911@qq.com>
 *	@copyright	 2010-2020
 *	@version    1.0
 *	@package    CoreInit
 *
 *	@since 2015-11-24
 */
use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileLogger;

use Phalcon\Mvc\Dispatcher as MvcDispatcher;
use Phalcon\Events\Manager as EventsManager;

// for cache
use Phalcon\Cache\Multiple;
use Phalcon\Cache\Backend\Apc as ApcCache;
use Phalcon\Cache\Backend\File as FileCache;
use Phalcon\Cache\Backend\Redis as RedisCache;
use Phalcon\Cache\Frontend\Data as DataFrontend;
use Phalcon\Cache\Backend\Memcache as MemcacheCache;



/**
 * Class Ak_Init
 *
 * Initialize the system
 *
 * Use Phalcon to do some registers of the MVC
 *
 * Use automatic way to load the library class from external API
 */
class AkInit
{
    /**
     * @var object
     *
     * the configuration object of the system
     */
    private $_Config;

    /**
     * @var object
     *
     * the loader object of the Phalcon
     */
    private $_Loader;

    /**
     * @var object
     *
     * the DI object of the Phalcon
     */
    private $_Di;

    /**
     * @var object
     *
     * the View object of Phalcon
     */
    private $_View;

    /**
     * @var object
     *
     * the application object of the Phalcon
     */
    private $_App;

    public function __construct() {
        require_once("constant.php");

        if(DEBUG){
            error_reporting(E_ALL);
        }else{
            error_reporting(0);
        }

        /**
         * load current setting
         */
        $this->libraryLoad();

        /**
         * load configuration
         */
        $this->_Config = new Phalcon\Config\Adapter\Ini('config.ini');

        /**
         * init the loader of Phalcon
         */
        $this->_Loader = new Phalcon\Loader();

        /**
         * init the DI of Phalcon
         */
        $this->_Di = new Phalcon\DI\FactoryDefault();

        /**
         * init the View of Phalcon
         */
        $this->_View = new Phalcon\Mvc\View();

        /**
         * init the Application of Phalcon
         */
        $this->_App = new Phalcon\Mvc\Application();

        /**
         * do all parts of initialization
         * register them into DI of Phalcon
         */
        $this->initDate();
        $this->initConfig();
        $this->initView();
        $this->initLoader();

        $this->initSession();
        $this->initDatabase();
        $this->initCache();
        $this->initDispatcher();

        $this->initModelManager();
        $this->initFilterManger();
    }

    /**
     * load external library
     */
    protected function libraryLoad() {
        spl_autoload_register(array($this, 'autoLoad'));
    }

    /**
     * load the class of library automatically
     * will be called by 'spl_autoload_register'
     *
     * @param $className
     * @return bool
     */
    protected function autoLoad($className) {
        foreach ($this->_Config->library as $path) {
            $file = ROOT_PATH . $this->_Config->application->baseUri . $path . $className . EXTENSION;

            if (file_exists($file)) {
                require_once($file);
                if (!class_exists($className)) {
                    // if the class is not exist, return false;
                    // in order to avoid file path same with the class name, and execute the file.
                    return false;
                }
                break;
            }
        }

        return true;
    }

    /**
     * inject configuration
     * in order to be called by Model or Controller
     */
    protected function initConfig(){
        $view = $this->_View;
        $config = $this->_Config;

        $this->_Di->set('config', function() use($view, $config)  {
            return $config;
        });
    }

    /**
     * set date
     */
    protected function initDate(){
        date_default_timezone_set($this->_Config->date->timezone);
    }

    /**
     * Register the database, use DI of Phalcon
     *
     * Database connection is created based in the parameters defined in the configuration file
     */
    protected function initDatabase() {
        $this->initDatabaseSlave();
        $this->initDatabaseMaster();
    }

    /**
     * only to get data
     */
    private function initDatabaseSlave(){
        $view = $this->_View;
        $config = $this->_Config;

        $this->_Di->set('dbSlave', function() use($view, $config) {
            $dbObj = new Phalcon\Db\Adapter\Pdo\Mysql(array(
                "host"      => $config->databaseSlave->host,
                "username"  => $config->databaseSlave->username,
                "password"  => $config->databaseSlave->password,
                "dbname"    => $config->databaseSlave->name,
                "charset"   => $config->databaseSlave->charset,
                "timeout"   => $config->databaseSlave->timeout,
                "retryInterval" => $config->databaseSlave->retryInterval,
                "retryTimes"    => $config->databaseSlave->retryTimes,
                /*"options"  => array(
                    PDO::MYSQL_ATTR_INIT_COMMAND    => "SET NAMES 'UTF8'",
                    PDO::ATTR_CASE                  => PDO::CASE_LOWER,
                    PDO::ATTR_DEFAULT_FETCH_MODE   => PDO::FETCH_ASSOC
                )*/
            ));

            $eventsManager = new EventsManager();

            $logFile = LOG_DB_PATH . "[Salve]" . date("Ymd") . ".log";

            $QueryManager = new QueryManager($logFile);

            // Listen all the database events
            $eventsManager->attach('db', $QueryManager);

            // Assign the eventsManager to the db adapter instance
            $dbObj->setEventsManager($eventsManager);

            return $dbObj;
        });
    }

    /**
     * only write data
     */
    private function initDatabaseMaster(){
        $view = $this->_View;
        $config = $this->_Config;

        $this->_Di->set('dbMaster', function() use($view, $config) {
            $dbObj = new Phalcon\Db\Adapter\Pdo\Mysql(array(
                "host"      => $config->databaseMaster->host,
                "username"  => $config->databaseMaster->username,
                "password"  => $config->databaseMaster->password,
                "dbname"    => $config->databaseMaster->name,
                "charset"   => $config->databaseMaster->charset,
                "timeout"   => $config->databaseMaster->timeout,
                "retryInterval" => $config->databaseMaster->retryInterval,
                "retryTimes"    => $config->databaseMaster->retryTimes,
                /*"options"  => array(
                    PDO::MYSQL_ATTR_INIT_COMMAND    => "SET NAMES 'UTF8'",
                    PDO::ATTR_CASE                  => PDO::CASE_LOWER,
                    PDO::ATTR_DEFAULT_FETCH_MODE   => PDO::FETCH_ASSOC
                )*/
            ));

            $eventsManager = new EventsManager();

            $logFile = LOG_DB_PATH . "[Master]" . date("Ymd") . ".log";
            $QueryManager = new QueryManager($logFile);

            // Listen all the database events
            $eventsManager->attach('db', $QueryManager);

            // Assign the eventsManager to the db adapter instance
            $dbObj->setEventsManager($eventsManager);

            return $dbObj;
        });
    }

    protected function initCache(){
        $view = $this->_View;
        $config = $this->_Config;

        $this->_Di->set('modelsCache', function() use($view, $config) {
            /*$ultraFastFrontend = new DataFrontend(
                array(
                    "lifetime" => 3600
                )
            );

            $fastFrontend = new DataFrontend(
                array(
                    "lifetime" => 86400
                )
            );*/

            $redisFrontend = new DataFrontend(
                array(
                    "lifetime" => 604800
                )
            );

            $slowFrontend = new DataFrontend(
                array(
                    "lifetime" => $config->redis->timeout,
                )
            );

            // Backends are registered from the fastest to the slower
            $cache = new Multiple(
                array(
                    /*new ApcCache(
                        $ultraFastFrontend,
                        array(
                            "prefix" => 'cache',
                        )
                    ),
                    new MemcacheCache(
                        $fastFrontend,
                        array(
                            "prefix" => 'cache',
                            "host"   => "localhost",
                            "port"   => "11211"
                        )
                    ),*/
                    /*new RedisCache(
                        $redisFrontend,
                        array(
                            'prefix'    => $config->redis->prefix,
                            'host'      => $config->redis->host,
                            'port'      => $config->redis->port,
                            'auth'      => $config->redis->auth,
                            'persistent'=> $config->redis->persistent,
                        )
                    ),*/
                    new FileCache(
                        $slowFrontend,
                        array(
                            "prefix"   => 'cache',
                            "cacheDir" => ROOT_PATH . $config->application->cacheDataDir
                        )
                    )
                )
            );

            return $cache;
        });
    }

    /**
     * register the direction of MVC for Load of Phalcon
     */
    protected function initLoader() {
        $this->_Loader->registerDirs(
            array(
                ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->controllersDir,
                ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->businessDir,
                ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->pluginsDir,
                ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->libraryDir,
                ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->modelsDir
            )
        );

        $this->_Loader->register();
    }

    /**
     * Register the events manager
     */
    protected function initDispatcher() {
        $_Di = $this->_Di;
        $config = $this->_Config;

        $this->_Di->set('dispatcher', function() use ($_Di, $config) {
            // Create an EventsManager
            $eventsManager = $_Di->getShared('eventsManager');

            /**
             * set listener for events of the dispatcher by the SecurityManager plugin
             */
            $securityManager = new SecurityManager();
            $securityManager->setPublicResource($config->publicResource);

            $eventsManager->attach('dispatch', $securityManager);

            $dispatcher = new MvcDispatcher();
            $dispatcher->setEventsManager($eventsManager);

            return $dispatcher;
        });
    }

    /**
     * Initialize the View of Phalcon
     *
     * Contains Url, View, Volt
     */
    protected function initView() {
        $view = $this->_View;
        $config = $this->_Config;

        /**
         * The URL component is used to generate all kind of urls in the application
         */
        $this->_Di->set('url', function() use($view, $config) {
            $url = new Phalcon\Mvc\Url();
            $url->setBaseUri($config->application->baseUri);
            return $url;
        });

        /**
         * Initialize the View
         */
        $this->_Di->set('view', function()  use($view, $config) {
            $view->setViewsDir(ROOT_PATH . $config->application->baseUri. $config->application->viewsDir);

            //Disable several levels
            $view->disableLevel(array(
                $view::LEVEL_LAYOUT => true,
                $view::LEVEL_MAIN_LAYOUT => true
            ));

            $view->registerEngines(array(
                VIEW_TEMP => VIEW_ENGINE
//                VIEW_TEMP => VIEW_ENGINE
            ));

            return $view;
        });

        /**
         * Setting up volt, the Engine of the View.

        $this->_Di->set('volt', function() {

            $volt = new Phalcon\Mvc\View\Engine\Volt($this->_View, $this->_Di);

            $volt->setOptions(array(
                "compiledPath" => ROOT_PATH . $this->_Config->application->baseUri. $this->_Config->application->compileDir
            ));

            return $volt;
        }, true);*/
    }

    /**
     * Initialize the session
     */
    protected function initSession() {
        $this->_Di->set('session', function(){
            $session = new Phalcon\Session\Adapter\Files();
            $session->start();
            return $session;
        });
    }

    /**
     * Initialize the manager of model
     */
    protected function initModelManager() {
        //Registering the modelsManager service
        $this->_Di->setShared('modelsManager', function() {

            $eventsManager = new EventsManager();

            //Attach an anonymous function as a listener for "model" events
            $eventsManager->attach('model', function($event, $model){
                $ModelManagerProcess = new ModelManager($event, $model);
                $ModelManagerProcess->fire();
            });

            //Setting a default EventsManager
            $modelsManager = new Phalcon\Mvc\Model\Manager();
            $modelsManager->setEventsManager($eventsManager);
            return $modelsManager;
        });
    }

    /**
     * Initialize filter manager
     */
    protected function initFilterManger(){
        $this->_Di->set('filter', function(){
            $filter = new Phalcon\Filter();

            $filterManager = new FilterManager($filter);
            $filterManager->init();

            return $filter;
        });
    }

    /**
     * Start to run
     */
    public function fire(){
        $this->_App->setDI($this->_Di);

        echo $this->_App->handle()->getContent();
    }
}