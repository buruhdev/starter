<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            "profile" => $request->user()
        ]);
    }

    public function update(UpdateProfileRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id)->update($request->only(['name', 'email']));

            return response()->json([
                'profile' => $user
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 404);
        }
    }
}
