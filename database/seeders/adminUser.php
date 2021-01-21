<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class adminUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Trial User',
            'email' => 'trial@iklimuforest.com',
            'role' => 1,
            'email_verified_at' => now(),
            'password' => Hash::make('test123'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
