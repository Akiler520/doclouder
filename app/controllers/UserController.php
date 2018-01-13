<?php
/**
 *	user controller manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Controller
 *
 *	@since 2015-09-29
 */
class UserController extends ControllerBase
{
    /**
     * @func user manager
     */
    public function initialize()
    {
        parent::initialize();
    }

    public function indexAction(){
        AkString::printM("test");
    }

    /**
     * This actions receive the input from the login form
     *
     */
    public function startAction()
    {
        if ($this->request->isPost()) {
            $email = $this->getPost('username', 'email');

            $lang = $this->getPost('language', null, "en");
            UserBusiness::getInstance()->setLanguage($lang);

            $password = $this->getPost('password');
            $password = md5($password);

            $user = User::findFirst("email='{$email}' AND password='{$password}'");

            if ($user != false) {
                $this->_registerSession($user);
                $this->jsonReturn(RESPONSE_SUCCESS, "Login successful");
            }

            $username = $this->getPost('username', 'alphanum');
            $user = User::findFirst("username='$username' AND password='$password'");

            if ($user != false) {
                $verifyCode = $this->getPost('verify');
                $verifyCodeCheck = $this->session->get("verify");

                if($verifyCode != $verifyCodeCheck){
                    $this->jsonReturn(RESPONSE_ERROR, "Invalid verify code.");
                }

                $this->_registerSession($user);
                $this->jsonReturn(RESPONSE_SUCCESS, "Login successful");
            }

            $this->jsonReturn(RESPONSE_ERROR, "Invalid account, check please.");
        }
    }

    /**
     * Finishes the active session redirecting to the index
     */
    public function endAction()
    {
        $this->session->remove('auth');

        $this->jsonReturn(RESPONSE_SUCCESS, "Sign out successful");
    }

    public function loginPageAction(){

    }

    /**
     * Register authenticated user into session data
     *
     * @param \Phalcon\Mvc\Model $user
     */
    private function _registerSession(\Phalcon\Mvc\Model $user)
    {
        $this->session->set('auth', array(
            'id'        => $user->id,
            'name'      => $user->name,
            'vorname'   => $user->vorname,
            'username'  => $user->username,
            'email'     => $user->email
        ));
    }

    /**
     * get verify picture code
     */
    public function verifyAction(){
        $verifyObj = new AkVerify();

        $verifyObj->setCode(4, 120, 40);
        $verifyObj->fire();

        $verifyCode = $verifyObj->getCode();

        $this->session->set("verify", $verifyCode);
    }
}