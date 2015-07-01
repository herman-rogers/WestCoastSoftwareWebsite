<?php namespace App\Http\Controllers;

    use App\Http\Controllers\Controller;
    use \App\User;
    use Hash;
    use App\Http\Requests;
//    use Illuminate\Contracts\Validation;
//    use Illuminate\Http\Exception;
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

                $users = \DB::table('users')->orderBy('created_at', 'desc')->get();

                foreach($users as $user) {
                    $response['users'][] = ['id' => $user->id, 'name' => $user->name, 'password' => $user->password,
                                            'email' => $user->email, 'created_at' => $user->created_at,];
                }
            } catch(Exception $e) {
                Log::info($e);
                $statusCode = 404;
            } finally {
                return Response::json($response, $statusCode);
            }
        }


        public function store(UserFormRequest $request)
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


            $input['password'] = Has::make($input['password']);

            try {
                $statusCode = 200;
                $response['user'] = $createUser->fill($input);
                $createUser->save();
            } catch(Exception $e) {
                Log::info($e);
                $statusCode = 400;
            } finally {
                return Response::json($response, $statusCode);
            }
        }

        public function show($id)
        {
            $response = ['user' => $id];
            return Response::json($response, 202);
        }




        public function update(Request $request, $id)
        {
            $input = ($request->input()['user']);
            //validate the user input

            User::find($id)->update($input);
            $response['user'][] = User::find($id);
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