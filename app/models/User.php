<?php
/**
 *	user model manager
 *
 *	@author		akiler <532171911@qq.com>
 *	@copyright	2010-2020
 *	@version	1.0
 *	@package	Model
 *
 *	@since 2015-10-29
 */
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class User extends BaseModel
{
    public function initialize()
    {
        parent::initialize();
        $this->setSource($this->getTableName(__CLASS__));
    }

    public function validation()
    {
       /* $this->validate(new EmailValidator(array(
            'field' => 'email'
        )));
        $this->validate(new UniquenessValidator(array(
            'field' => 'email',
            'message' => 'Sorry, The email was registered by another user'
        )));*/
        /*$this->validate(new UniquenessValidator(array(
            'field' => 'username',
            'message' => 'Sorry, That username is already taken'
        )));*/
       /* if ($this->validationHasFailed() == true) {
            return false;
        }*/
    }

}
