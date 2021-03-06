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
    Route::model('posts', 'App\Post');

    Route::post('login', 'Auth\AuthController@authenticate');
    Route::post('logout', 'Auth\AuthController@logout');

    Route::get('{data?}', function () {
        $rootURL = 'WestCoastWebsite/public/';//Config::get('app.url');//URL::route('DegenerationWebsite/public', '{data?}', false);
        return View::make('ember')->with('rootURL', $rootURL);
    });


    Route::group(array('prefix' => 'api'), function() {
        //Model Resources
        Route::resource( 'users', 'UserController');
        Route::resource('posts', 'PostController');
    });
