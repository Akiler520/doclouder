<?php
/**
 *	Security business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class SecurityBusiness extends Business
{
    /**
     * object of current class
     *
     * @var object
     */
    private static $_instance;

    private function __construct()
    {
    }

    /**
     * instance of the class
     * to avoid create multiple instance of class
     *
     * @return UserBusiness|object
     */
    public static function getInstance(){
        if(!isset(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function getActionList(){
        $lang = $this->getLanguage();
        $_cache_key = "_action_list_{$lang}";

        $actionListArr = $this->modelsCache->get($_cache_key, 3600);

        if(!empty($actionListArr)){
            return $actionListArr;
        }

        $controllers = AkFileSystemFile::getFilesByType(ROOT_PATH . "app/controllers/", false, false, false);
        $actionListArr = array();

        foreach ($controllers as $val_controller) {
            $actionList = AkString::getActionList($val_controller);

            if(!empty($actionList)){
                $actionListArrTmp = array();

                $controllerObj = new $val_controller;

                $actionListArrTmp['controller'] = $val_controller;
                $actionListArrTmp['comment'] = $val_controller;

                $funcRef = new ReflectionMethod($controllerObj, "initialize");
                $controllerComment = $funcRef->getDocComment();
                preg_match_all('/@func(.*?)\n/', $controllerComment, $controllerComment);

                if(!empty($controllerComment[1])){
                    $controllerComment   = trim($controllerComment[1][0]);
                    $actionListArrTmp['comment'] = LanguageBusiness::getInstance()->get($controllerComment);
                }

                $actionListArrTmp["actionList"] = array();

                foreach ($actionList as $val_action) {
                    $actionInfo['action'] = $val_action;
                    $actionInfo['comment'] = $val_action;

                    $funcRef = new ReflectionMethod($controllerObj, $val_action);
                    $funcComment = $funcRef->getDocComment();
                    preg_match_all('/@func(.*?)\n/', $funcComment, $funcComment);

                    if(empty($funcComment[1])){
//                        $actionListArrTmp["actionList"][] = $actionInfo;
                        continue;
                    }

                    $funcComment   = trim($funcComment[1][0]);

                    $actionInfo['action'] = $val_action;
                    $actionInfo['comment'] = LanguageBusiness::getInstance()->get($funcComment);

                    $actionListArrTmp["actionList"][] = $actionInfo;
                }

                $actionListArr[] = $actionListArrTmp;
            }
        }

        $this->modelsCache->save($_cache_key, $actionListArr);

        return $actionListArr;
    }
}