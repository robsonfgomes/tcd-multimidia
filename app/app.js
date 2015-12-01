(function(){
var app = angular.module('obrasPac', ['ngRoute', 'angular.panels']);

//configuração das rotas

app.config(function($routeProvider) {
    $routeProvider
        .when('/obras-no-mapa', {
            templateUrl: 'views/mapas/mapa.html',
            controller: 'ObrasNoMapaController'
        })
        .when('/transportes', {
            templateUrl: 'views/estatisticas/transportes.html',
            controller : 'transportesController'
        })
        .otherwise({
           redirectTo: '/transportes'
        });             
    } 
);

app.config(['panelsProvider', function(panelsProvider){
    panelsProvider
        .add({
            id: 'menuEstados',
            position: 'left',
            size: '400px',
            templateUrl: 'views/panels/main.html',
            controller: 'ObrasNoMapaController'
        });
}]);


app.controller('ObrasNoMapaController', function($scope, $http, $location, panels){ 
        //estados brasileiros
        $scope.estados = [
            {
                nome: 'Acre',
                sigla: 'AC'
            },            
            {
                nome: 'Alagoas',
                sigla: 'AL'
            },
            {
                nome: 'Amapá',
                sigla: 'AP'
            },
            {
                nome: 'Amazonas',
                sigla: 'AM'
            },
            {
                nome: 'Bahia',
                sigla: 'BA'
            },
            {
                nome: 'Ceará',
                sigla: 'CE'
            },
            {
                nome: 'Distrito Federal',
                sigla: 'DF'
            },
            {
                nome: 'Espírito Santo',
                sigla: 'ES'
            },
            {
                nome: 'Goiás',
                sigla: 'GO'
            },
            {
                nome: 'Maranhão',
                sigla: 'MA'
            },
            {
                nome: 'Mato Grosso',
                sigla: 'MT'
            },
            {
                nome: 'Mato Grosso do Sul',
                sigla: 'MS'
            },
            {
                nome: 'Minas Gerais',
                sigla: 'MG'
            },
            {
                nome: 'Pará',
                sigla: 'PA'
            },
            {
                nome: 'Paraíba',
                sigla: 'PB'
            },
            {
                nome: 'Paraná',
                sigla: 'PR'
            },
            {
                nome: 'Pernambuco',
                sigla: 'PE'
            },
            {
                nome: 'Piauí',
                sigla: 'PI'
            },
            {
                nome: 'Rio de Janeiro',
                sigla: 'RJ'
            },
            {
                nome: 'Rio Grande do Norte',
                sigla: 'RN'
            },
            {
                nome: 'Rio Grande do Sul',
                sigla: 'RS'
            },
            {
                nome: 'Rondônia',
                sigla: 'RO'
            },
            {
                nome: 'Roraima',
                sigla: 'RR'
            },
            {
                nome: 'Santa Catarina',
                sigla: 'SC'
            },
            {
                nome: 'São Paulo',
                sigla: 'SP'
            },
            {
                nome: 'Sergipe',
                sigla: 'SE'
            },
            {
                nome: 'Tocantins',
                sigla: 'TO'
            }
        ];

        (function() {
            var myCenter = new google.maps.LatLng(-10.132177, -48.154633);
            var mapProp = {
                center: myCenter,
                zoom: 4,
                mapTypeControlOptions: {
                    mapTypeIds: [
                    ]
                }
            };

            $scope.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            
            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, $scope.map);

            centerControlDiv.index = 1;
            $scope.map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
            
            /**
             * The CenterControl adds a control to the map that recenters the map on Chicago.
             * This constructor takes the control DIV as an argument.
             * @constructor
             */
            function CenterControl(controlDiv, map) {

                // Set CSS for the control border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '22px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to recenter the map';
                controlDiv.appendChild(controlUI);                                

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = '<i class="fa fa-bars fa-lg"></i> Legenda';                               
                
                controlUI.appendChild(controlText);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI.addEventListener('click', function() {                                        
                    panels.open('menuEstados');                   
                });

            }            
            
            //var marker = new google.maps.Marker({
                //position: myCenter,
                //title: 'Click to zoom'
            //});

            //marker.setMap($scope.map);

            // Zoom to 9 when clicking on marker
            //google.maps.event.addListener(marker, 'click', function() {
                //$scope.map.setZoom(9);
                //$scope.map.setCenter(marker.getPosition());
            //});
        })();

        $http.get('/tcd-multimidia/api/obras/all/concluidas').success(function(dados) {
            $scope.obras = dados;            
            for (var i in $scope.obras) {
                if($scope.obras[i].idn_estagio <= 10) {
                    $scope.obras[i].marker = 'assets/img/vermelho.png';
                } else if($scope.obras[i].idn_estagio <= 71) {
                    $scope.obras[i].marker = 'assets/img/amarelo.png';
                } else {
                    $scope.obras[i].marker = 'assets/img/verde.png';
                }
                $scope.adicionarPonto($scope.obras[i].val_lat, $scope.obras[i].val_long, $scope.obras[i].marker);
            }
        });

        $scope.adicionarPonto = function(x, y, icon) {
            var myCenter = new google.maps.LatLng(x, y);
            var marker = new google.maps.Marker({
                position: myCenter,
                title: 'Click to zoom',
                icon: icon
            });

            marker.setMap($scope.map);
        };
});

app.controller('transportesController', function($scope, $http, $location){    
     
});

app.controller('homeController', function($scope, $http, $location){
    $scope.isActive = function(viewLocation) {
        return viewLocation == $location.path();
    };   
});

})();