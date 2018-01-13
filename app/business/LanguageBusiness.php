<?php
/**
 *	Language business manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Business
 *
 *	@since 2015-09-29
 */
class LanguageBusiness extends Business
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

    /**
     * get language by key
     * or by language type
     *
     * @param $key
     * @param $lang
     * @return string
     */
    public function get($key, $lang = ''){
        $list = $this->getAll($lang);

        $key_lang = strtolower($key);

        $langString = null;

        foreach ($list as $val_lang) {
            if($key_lang == $val_lang['key']){
                $langString = $val_lang['language'];
            }
        }

        // if not found, use English
        if($langString === null && $lang != 'en'){
            $langString = $this->get($key, 'en');
        }

        // if not found, use the language key
        if($langString === null){
            $langString = str_replace("_", " ", $key);
        }

        return $langString;
    }

    /**
     * get all the language list by language type
     * @param $lang
     * @return mixed
     */
    public function getAll($lang = ''){
        $lang = empty($lang) ? $this->getLanguage() : $lang;
        $_cache_key = "_language_{$lang}";

        $list = $this->modelsCache->get($_cache_key);

        if(!$list){
            $list = Language::find("type='{$lang}'")->toArray();

            $this->modelsCache->save($_cache_key, $list);
        }

        return $list;
    }

    public function getAllOfFront(){
        $list = $this->getAll();

        // key=>language, in order to be called by front page;
        $langArr = array();

        foreach ($list as $val_lang) {
            $langArr[$val_lang['key']] = $val_lang['language'];
        }

        // save info language_en.js
        $this->saveToJs($langArr);

        return $langArr;
    }

    /**
     * save language into js file
     *
     * @param $langArr
     */
    private function saveToJs($langArr){
        $lang = empty($lang) ? $this->getLanguage() : $lang;
        $_cache_key = "_language_js_{$lang}";

        $_lang_js = $this->modelsCache->get($_cache_key);
        if(!$_lang_js){
            $jsPath = ASSET_DIR . "{$_cache_key}.js";
            $data = '(function($){' .
                'var _lang_data=\''. json_encode($langArr) .'\';' .
                '$.util.namespace("lang");' .
                'window.lang=eval("("+_lang_data+")");' .
                '$.util.namespace("langKey");' .
                'window.langKey="' . $lang .'";' .
                '})(jQuery);';
            file_put_contents($jsPath, $data);

            $this->modelsCache->save($_cache_key, 1);
        }
    }
}