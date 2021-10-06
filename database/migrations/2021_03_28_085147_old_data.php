<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OldData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('old_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('author');
            $table->string('label');
            $table->integer('month');
            $table->integer('year');
            $table->json('data');
            $table->timestamps();

            $table->foreign('author')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('old_data');
    }
}
