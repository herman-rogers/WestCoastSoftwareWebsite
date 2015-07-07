<?php namespace App\Http\Controllers;

/**
 * Created by PhpStorm.
 * User: josh
 * Date: 06/07/2015
 * Time: 11:45
 */

use App\Http\Requests;
use App\Post;

use Log;

use App\Services\Validation\PostValidator;
use App\Services\Validation\Exceptions\ValidationException;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class PostController extends Controller
{


    protected $_validation;

    public function __construct(PostValidator $validator)
    {
        $this->_validation = $validator;
    }

    public function index()
    {

        try {
            $statusCode = 200;
            $response = ['posts' => []];

            $posts = \DB::table('posts')
                        ->orderBy('created_at', 'desc')->get();

            foreach($posts as $post) {
                $response['posts'][] = ['id' => $post->id, 'title' => $post->title, 'image_url' => $post->image_url,
                                        'post_body' => $post->post_body, 'type' => $post->type,
                                        'author' => $post->author,'created_at' => $post->created_at,];
            }
        } catch(\Exception $e) {
            \Log::info($e);

            $statusCode = 404;
        } finally {
            return Response::json($response, $statusCode);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

        $input = $request->input('post');

        try {
            $validateData = $this->_validation->validate($input);
        } catch(ValidationException $e) {
            $errors['error'] = $e->get_errors();
            return Response::json($errors, 422);
        }

        $createPost = new Post;
        $response = ['post' => []];

        try {
            $statusCode = 200;
            $response['post'] = $createPost->fill($input);
            $createPost->save();
        } catch(\Exception $e) {
            Log::info($e);
            $statusCode = 400;
        } finally {
            return Response::json($response, $statusCode);
        }
    }

    /**
     * Update the specified resource in storage
     *
     * @param int $id
     *
     * @return Response
     */

    public function update(Request $request, $model)
    {

        $input = ($request->input()['post']);
        //validate the user input

        try {
            $validateData = $this->_validation->validate($input);
        } catch(ValidationException $e) {
            $errors ['errors'] = $e->get_errors();
            return Response::json($errors, 422);
        }

        $model->update($input);
        $response['post'][] = $model;
        return $response;
    }

    /**
     *  Remove specified Resource from storage
     *
     * @para int $id
     * @return Response
     */
    public function destroy($post)
    {
        $post->delete();
        $response['post'][] = $post;
        return Response::json($response, 200);
    }
}