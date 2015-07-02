<?php

    namespace App\Services\Validation;

    class UserValidator extends Validator {
        /*
         * Array of rules for the validator, can be custom or built-in rules
         */
        public $rules = array(
            'name' => array('required', 'max:255'),
            'email' => array('required', 'E-Mail'),
            'password' => array('required'),
            'perm_level' => array('required', 'integer'),
            'colour_code' => array('required', 'hexcolour'),
        );
    }