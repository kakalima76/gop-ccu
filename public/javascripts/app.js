angular.module('app',['ngCookies'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('timestampInterceptor');
})



