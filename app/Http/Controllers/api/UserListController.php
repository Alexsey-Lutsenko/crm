<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\UserList;
use Illuminate\Http\Request;

class UserListController extends Controller
{
    public function add(Request $request) {

        $user = UserList::create([
            'name' => $request -> name,
            'email' => $request -> email
        ]);

        if (!$user) {
            return response()->json(["message" => "failed"], 500);
        }

        return response()->json(["message" => "succeeded"]);

    }

    public function get() {

        $users = UserList::all('id','name','email');

        return response()->json($users, 200);
    }

    public function remove(Request $request) {
        UserList::firstOrNew(['id' => $request->id])->delete();

        return response()->json($request->id);
    }

    public function update(Request $request) {
        UserList::firstOrNew(['id' => $request->id])->update([
            'name' => $request -> name,
            'email' => $request -> email
        ]);
    }
}
