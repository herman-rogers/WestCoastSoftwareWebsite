<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Auth;
use \Request;
use \Session;
use \App\Users;
use DB;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    //use AuthenticatesAndRegistersUsers;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
//    public function __construct()
//    {
//        $this->middleware('guest', ['except' => 'getLogout']);
//    }

    public function authenticate( ) {
        $input = Request::input('session');
        $credentials = [ 'email' => $input['email'], 'password' => $input['password']];
        //return $credentials;
        //try {
        //      $validateData = $this->_validation->validate($input);
        $authenticated = Auth::attempt($credentials);
        //}
        //catch ( ValidationException $e ) {
        //    $errors['error'] = $e->get_errors();
        //    return \Response::json($errors, 422);
        //}

        if( !$authenticated ) {
            $errors['error'] = [ 'authentification' => 'invalid credentials' ];
            return Response::json($errors, 422);
        }
        $user = DB::table('users')->where('email', $input['email'])->first();
        $token = Session::token();
        $response['session'] = [
            'auth_token' => $token,
            'account_id' => $user->id
        ];
        return $response;

    }

    public function logout( ) {
        Auth::logout();
    }
//    /**
//     * Get a validator for an incoming registration request.
//     *
//     * @param  array  $data
//     * @return \Illuminate\Contracts\Validation\Validator
//     */
//    protected function validator(array $data)
//    {
//        return Validator::make($data, [
//            'name' => 'required|max:255',
//            'email' => 'required|email|max:255|unique:users',
//            'password' => 'required|confirmed|min:6',
//        ]);
//    }
//
//    /**
//     * Create a new user instance after a valid registration.
//     *
//     * @param  array  $data
//     * @return User
//     */
//    protected function create(array $data)
//    {
//        return User::create([
//            'name' => $data['name'],
//            'email' => $data['email'],
//            'password' => bcrypt($data['password']),
//        ]);
//    }
}
