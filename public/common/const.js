/**
 * response code list, correspond to the code of 'status_code' from SERVER side
 * @type {number}
 */

const RESPONSE_SUCCESS          = 1;    // return success
const RESPONSE_ERROR            = 0;    // return error
const RESPONSE_NOT_LOGIN        = -1;   // not login
const RESPONSE_WARNING          = 2;    // warning
const RESPONSE_FILE_EXIST       = 10;   // the file is exist
const RESPONSE_NOT_FOUND        = 404;  // page not found