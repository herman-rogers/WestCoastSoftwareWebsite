<?php

    namespace App\Services\Validation;

    class PostValidator extends Validator {
        /*
         * Array of rules for the validator, can be custom or built-in rules
         */
        public $rules = array(
            'title' => array('required', 'max:255'),
            'post_body' => array('required'),
            'type' => array('required'),
            'author' => array('required')
        );
    }