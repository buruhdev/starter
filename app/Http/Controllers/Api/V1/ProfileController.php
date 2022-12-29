<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use League\Flysystem\UnableToDeleteFile;

class ProfileController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "profile" => $request->user()
        ]);
    }

    public function update(UpdateProfileRequest $request, $id): \Illuminate\Http\JsonResponse
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

    public function updateImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'required'
        ]);

        try {
            $user = User::findOrFail($id);

            File::delete(storage_path('public/images/' . $user->image));

            $image = $request->image->store('images', 'public');

            $user->update(['image' => $image]);

            return response()->json([
                'profile' => $user
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 404);
        } catch (UnableToDeleteFile $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 500);
        }

    }

    public function storeTempImageProfile(Request $request)
    {
        $request->validate([
            'image' => 'required'
        ]);

        $tempPath = $request->file('image')->storeAs('temps', $request->image->getClientOriginalName(), 'public');

        return response()->json([
            "message" => "temp image uri",
            "tempUri" => $tempPath
        ]);

    }
}
