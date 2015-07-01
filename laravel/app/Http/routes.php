<?php

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register all of the routes for an application.
    | It's a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */


    Route::model('users', 'App\User');

    Route::post('login', 'Auth\AuthController@authenticate');
    Route::post('logout', 'Auth\AuthController@logout');

    Route::get('/{data?}', function () {
        return View::make('ember');
    });

    Route::get('/admin/{data?}', function() {
        return View::make('ember');
    });


    Route::group(array('prefix' => 'api'), function() {
        //Model Resources
        Route::resource( 'users', 'UserController');
    });
