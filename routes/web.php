<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/offerings', ['uses' => 'PurchasesController@getAllOfferings']);

Route::get('/purchases', ['uses' => 'PurchasesController@getPurchases']);

Route::post('/purchases', ['uses' => 'PurchasesController@postPurchases', 'as' => 'purchase']);
