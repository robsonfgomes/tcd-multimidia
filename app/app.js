(function(){
	var app = angular.module('obrasPac', ['ngRoute']);

	app.controller('HomeController', function($scope, $http){
		$http.get('/tcd-multimidia/api/obras/all/concluidas').success(function(dados){
			$scope.obras = dados;
			console.log($scope.obras.length);
		});
	});

})();