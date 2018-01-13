<?php
/******* settings of debug ***************/
define("DEBUG",                 true);
define("IS_TEST",               true);

/******* settings of system path ***************/
define("ROOT_PATH",             $_SERVER["DOCUMENT_ROOT"] . "/");

define("RUNTIME_PATH",          ROOT_PATH . "runtime/");
define("LIB_PATH",              ROOT_PATH . "library/");
define("CACHE_PATH",            RUNTIME_PATH . "cache/");
define("LOG_PATH",              RUNTIME_PATH . "log/");
define("LOG_DB_PATH",           LOG_PATH . "db/");
define("CACHE_SMARTY_DIR",      CACHE_PATH . "smarty/");
define("UPLOAD_PATH",           ROOT_PATH . "public/storage/");
define("ASSET_DIR",             ROOT_PATH . "public/asset/");

/******* settings of Smarty Engine of View *******/
define("VIEW_ENGINE",           "SmartyManager");
define("VIEW_TEMP",             ".phtml");
define("EXTENSION",             ".php");

/******* version of system **********/
define("VERSION",               "1.0.1");


/******* response code for AJAX of client request: status_code *****/
define("RESPONSE_SUCCESS",              1);  // return success
define("RESPONSE_ERROR",                0);  // return error
define("RESPONSE_NOT_LOGIN",            -1);  // not login
define("RESPONSE_FILE_EXIST",           10);    // the file is exist
define("RESPONSE_NOT_FOUND",            404);   // page not found


