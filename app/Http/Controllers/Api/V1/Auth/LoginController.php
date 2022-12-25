<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(LoginRequest $request)
    {
        $http = new \GuzzleHttp\Client;

        try {

            $response = $http->post(config('app.url') . "/oauth/token", [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->email,
                    'password' => $request->password
                ]
            ]);

            return $response->getBody();
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {

            if ($e->getCode() === 400) {
                return response()->json([
                    "message" => "",
                    "errors" => [
                        "email" => ["Invalid email address"]
                    ]
                ], $e->getCode());
            }

            if ($e->getCode() === 401) {
                return response()->json([
                    "message" => "",
                    "errors" => [
                        "email" => ["Invalid email address"]
                    ]
                ], $e->getCode());
            }

            return response()->json([
                "message" => $e->getMessage(),
                "errors" => []
            ], $e->getCode());
        }
    }
}
