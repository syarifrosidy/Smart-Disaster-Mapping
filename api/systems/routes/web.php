<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
	$router->get('/kejadian', 'KejadianController@listKejadian');
	$router->post('/kejadian/add', 'DetailKejadianController@tambahKejadian');
	$router->options('/kejadian/add', 'DetailKejadianController@tambahKejadian');

	$router->get('/kejadian/detail[/{id}]', 'DetailKejadianController@detailKejadian');
	$router->post('/kejadian/korban', 'DetailKejadianController@utambahUpdateKorban');
	$router->options('/kejadian/korban', 'DetailKejadianController@utambahUpdateKorban');
