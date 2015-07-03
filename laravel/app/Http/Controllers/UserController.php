<?php namespace App\Http\Controllers;



use Illuminate\Database\Eloquent\Model;
use Log;
use Hash;
use \App\User;
use App\Http\Requests;
use App\Services\Validation\UserValidator;
use App\Services\Validation\Exceptions\ValidationException;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

    class UserController extends Controller
    {

        protected $_validation;

        public function __construct(UserValidator $validator)
    {
        $this->_validation = $validator;
    }

        public function index()
        {
            try {
                $statusCode = 200;
                $response = ['users' => []];

                $users = User::all();

                foreach($users as $user) {
                    $response['users'][] = ['id' => $user->id, 'name' => $user->name, 'email' => $user->email,
                                            'password' => $user->password, 'about' => $user->about,
                                            'perm_level' => $user->perm_level, 'avatar_url' => $user->avatar_url,
                                            'created_at' => $user->created_at,];
                }
            } catch(\Exception $e) {
                \Log::info($e);

                $statusCode = 404;
            } finally {
                return Response::json($response, $statusCode);
            }
        }


        public function store(Request $request)
        {
            $input = $request->input('user');
            $createUser = new User;
            $response = ['user' => []];

            try {
                $validateData = $this->_validation->validate($input);
            } catch(ValidationException $e) {
                $errors['error'] = $e->get_errors();
                return Response::json($errors, 422);
            }


            $input['password'] = Hash::make($input['password']);

            try {
                $statusCode = 200;
                $response['user'] = $createUser->fill($input);
                $createUser->save();
            } catch(\Exception $e) {
                Log::info($e);
                $statusCode = 400;
            } finally {
                return Response::json($response, $statusCode);
            }
        }

        public function show($id)
        {
            try {
                $response = [
                    'user' => []
                ];
                $statusCode = 200;
                $user = User::find($id);

                $response['user'][] = [
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'email'         => $user->email,
                    'password'      => $user->password,
                    'about'         => $user->about,
                    'perm_level'    => $user->perm_level,
                    'avatar_url'    => $user->avatar_url,
                    'created_at'    => $user->created_at
                ];

            } catch ( \Exception $e)
            {
                Log::info($e);
                $statusCode = 404;
            } finally
            {
                return Response::json($response, $statusCode);
            }

        }

        public $restful = true;

        public function update(Request $request, $model)
        {
            $input = ($request->input()['user']);
            //validate the user input

            //CHANGES PASSWORD ON ANY UPDATE?

//            if($input['password'])
//                $input['password'] = Hash::make($input['password']);
//            else {
//                $input['password'] = $model->password;
//            }

            try {
                $validateData = $this->_validation->validate($input);
            } catch (ValidationException $e) {
            $errors ['errors'] = $e->get_errors();
            return Response::json($errors, 422);
        }

            $model->update($input);
            $response['user'][] = $model;
            return $response;
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int $user
         *
         * @return Response
         */
        public function destroy($id)
        {
            $user = User::find($id);
            $user->delete();
            $response['user'][] = $user;
            return Response::json($response, 200);
        }
    }