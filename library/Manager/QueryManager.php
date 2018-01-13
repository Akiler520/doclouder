<?php
/**
 *	core query manager of database
 *
 *  @author     akiler <532171911@qq.com>
 *  @copyright  2010-2020
 *  @version	 1.0
 *  @package	 CoreManager
 *
 *  @since      2016-04-06
 */
use Phalcon\Db\Profiler;
use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileLogger;

class QueryManager
{
    protected $_profiler;

    protected $_logger;

    /**
     * QueryManager constructor.
     * @param $logFile
     */
    public function __construct($logFile)
    {
        $this->_profiler = new Profiler();
        $this->_logger = new FileLogger($logFile);
    }

    public function afterConnect($event, $connection)
    {

    }

    /**
     * execute before query
     * @param $event
     * @param $connection
     */
    public function beforeQuery($event, $connection)
    {
        $this->_profiler->startProfile($connection->getSQLStatement());
    }

    /**
     * execute after query
     * @param $event
     * @param $connection
     */
    public function afterQuery($event, $connection)
    {
        $sql = $connection->getSQLStatement();

        $this->_profiler->stopProfile();

        // transaction of logger
        $this->_logger->begin();

        foreach ($this->_profiler->getProfiles() as $profile) {
//            echo "SQL语句: ", $profile->getSQLStatement(), "<Br>";
//            echo "开始时间: ", $profile->getInitialTime(), "<Br>";
//            echo "结束时间: ", $profile->getFinalTime(), "<Br>";
//            echo "总共执行的时间: ", $profile->getTotalElapsedSeconds(), "<Br>";

            $runTime = number_format($profile->getTotalElapsedSeconds(), 3);
            $sqlSave = $profile->getSQLStatement();

            if($sql == $sqlSave) {
                $this->_logger->log("[{$runTime}s]" . $sqlSave, Logger::INFO);
            }
        }

        $this->_logger->commit();
    }

    public function getProfiler()
    {
        return $this->_profiler;
    }
}