<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function index(Request $request)
    {

        $request->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json([
            "message" => "You have been successfully logged out",
            "errors" => [
                "email" => ["Invalid email address"]
            ]
        ]);
    }
}
