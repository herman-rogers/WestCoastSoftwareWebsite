<?php namespace App\Services\Validation;

 use Illuminate\Validation\Factory as IlluminateValidator;
 use App\Services\Validation\Exceptions\ValidationException;

 Class Validator {

     protected $_validator;

     public function __construct(IlluminateValidator $validator) {
         $this->_validator = $validator;
     }
     public function validate( array $data, array $rules = array(), array $custom_errors = array() )
     {
         if ( empty( $rules ) && !empty( $this->rules ) && is_array( $this->rules ) ) {
             //no rules passed to function, use the default rules defined in sub-class
             $rules = $this->rules;
         }
         //use Laravel's Validator to validate the data
         $validation = $this->_validator->make( $data, $rules, $custom_errors);
         if( $validation->fails()){
             //throw new ValidationException( $validation->messages() );
         }
         return true;
     }

     public static function isHexcolour($value)
     {
         $pattern = '/^#?[a-fA-F0-9]{3,6}$/';
         return (boolean) preg_match($pattern, $value);
     }
 }