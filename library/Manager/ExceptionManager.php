<?php
/**
 *	core exception manager of system
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	CoreManager
 *
 *	@since 2015-11-29
 */
use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileAdapter;

class ExceptionManager extends \Phalcon\Di\Injectable implements \Phalcon\Events\EventsAwareInterface, \Phalcon\Di\InjectionAwareInterface
{
    const SPECIAL = 9;

    const CUSTOM = 8;

    const DEBUG = 7;

    const INFO = 6;

    const NOTICE = 5;

    const WARNING = 4;

    const ERROR = 3;

    const ALERT = 2;

    const CRITICAL = 1;

    const EMERGENCY = 0;

    /**
     * exception object
     * @var null
     */
    private $_exception = null;

    /**
     * exception type
     * @var null
     */
    private $_type = null;

    private $_logger = null;

    public function __construct($exception, $type = "Phalcon")
    {
        $this->_exception = $exception;
        $this->_type = $type;

        // save log message of Exception
        $logFile = LOG_PATH . date("Ymd") . ".log";
        $this->_logger = new FileAdapter($logFile);
    }

    public function process(){
        $func = "process" . ucfirst($this->_type);

        $this->$func();
    }

    /**
     * process exception of phalcon
     */
    private function processPhalcon(){
        $e = $this->_exception;
        $userInfo = $this->session->get("auth");
        $IP = ($_SERVER["REMOTE_ADDR"] == "127.0.0.1") ? "SERVER" : $_SERVER["REMOTE_ADDR"];

        // get all message of Exception
        $class = get_class($e);
        $message = $e->getMessage();
        $code = $e->getCode();
        $file = $e->getFile();
        $line = $e->getLine();
        $trace = $e->getTraceAsString();

        // create log message
        $logMessage = "[{$userInfo['username']}][{$IP}]\n";
        $logMessage .= "{$class}: {$message}\n";
        $logMessage .= "Code={$code}\n";
        $logMessage .= "File={$file}\n";
        $logMessage .= "Line={$line}\n";

        if($code < self::WARNING || DEBUG){
            $logMessage .= "{$trace}\n";
        }else{
            $logMessage .= "\n";
        }

        // save log message of Exception
        $this->_logger->log($logMessage, $code);

        $errMessage = "[CODE|{$code}] $message";
        if(DEBUG){
            $errMessage .= "\n{$trace}\n";
        }

        // output Exception to front page
        if(AkString::isAjax()){
            $errMessage = str_replace("\n", "<br>", $errMessage);
            AkString::jsonReturn(0, $errMessage);
        }else{
            echo $errMessage;
        }
    }

    /**
     * process exception of PDO
     */
    private function processPdo(){
        $e = $this->_exception;
        $userInfo = $this->session->get("auth");
        $IP = ($_SERVER["REMOTE_ADDR"] == "127.0.0.1") ? "SERVER" : $_SERVER["REMOTE_ADDR"];

        // get all message of Exception
        $class = get_class($e);
        $message = $e->getMessage();
        $code = $e->getCode();
        $file = $e->getFile();
        $line = $e->getLine();
        $trace = $e->getTraceAsString();

        // create log message
        $logMessage = "[{$userInfo['username']}][{$IP}]\n";
        $logMessage .= "{$class}: {$message}\n";
        $logMessage .= "Code={$code}\n";
        $logMessage .= "File={$file}\n";
        $logMessage .= "Line={$line}\n";

        $errMessage = "$message";
        if(DEBUG){
            $logMessage .= "{$trace}\n";
            $errMessage .= "{$trace}\n";
        }else{
            $logMessage .= "\n";
        }

        // save log message of Exception
        $this->_logger->log($logMessage, self::ERROR);       // TODO: PDO::ERRMODE_WARNING

        // output Exception to front page
        if(AkString::isAjax()){
            AkString::jsonReturn(0, $errMessage);
        }else{
            echo $errMessage;
        }
    }

    /**
     * throw out exception of Phalcon
     * @param $message
     * @param $code
     * @throws \Phalcon\Exception
     */
    public static function throwOut($message, $code){
        throw new Phalcon\Exception($message, $code);
    }
}