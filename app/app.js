(function(){
	var app = angular.module('obrasPac', ['ngRoute']);

	app.controller('HomeController', function($scope, $http){
		(function() {
			var myCenter=new google.maps.LatLng(-21.4, -43.83);

			var mapProp = {
			    center: myCenter,
			    zoom:4,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

		  	$scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

		  	var marker = new google.maps.Marker({
			    position: myCenter,
			    title:'Click to zoom'
		    });

		  	marker.setMap($scope.map);

		  	// Zoom to 9 when clicking on marker
		  	google.maps.event.addListener(marker,'click',function() {
			    $scope.map.setZoom(9);
			    $scope.map.setCenter(marker.getPosition());			    
		    });
		})();

		$http.get('/tcd-multimidia/api/obras/all/concluidas').success(function(dados){
			$scope.obras = dados;
			console.log($scope.obras.length);
			for(var i in $scope.obras) {
				$scope.adicionarPonto($scope.obras[i].val_lat, $scope.obras[i].val_long);
			}
		});

		$scope.adicionarPonto = function(x, y) {
			var myCenter=new google.maps.LatLng(x, y);
			var marker = new google.maps.Marker({
			    position: myCenter,
			    title:'Click to zoom'
		    });

		  	marker.setMap($scope.map);
		}
		
	});

})();