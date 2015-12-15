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
           redirectTo: '/obras-no-mapa'
        });             
    } 
);
//configurando os painéis
app.config(['panelsProvider', function(panelsProvider){
    panelsProvider
        .add({
            id: 'menuEstados',
            position: 'left',
            size: '400px',
            templateUrl: 'views/panels/main.html',
            controller: 'ObrasNoMapaController'
        })
        .add({
            id: 'estado',
            position: 'left',
            size: '400px',
            templateUrl: 'views/panels/estado.html',
            controller: 'EstadoController'
        });
}]);

//configurand os serviços globais
app.service('PropriedadesCompartilhadas', function () {
    var item;

    return {
        getItem: function () {
            return item;
        },
        setItem: function(value) {
            item = value;
        }
    };
});

app.service('dadosDaObra', function () {
    var item;

    return {
        getItem: function () {
            return item;
        },
        setItem: function(value) {
            item = value;
        }
    };
});


app.controller('ObrasNoMapaController', function($scope, $http, $location, panels, PropriedadesCompartilhadas, dadosDaObra){ 
        //variaveis
        $scope.markers = [];
        //estados brasileiros
        $scope.estados = [
            {
                nome: 'Acre',
                uf: 'AC'
            },            
            {
                nome: 'Alagoas',
                uf: 'AL'
            },
            {
                nome: 'Amapá',
                uf: 'AP'
            },
            {
                nome: 'Amazonas',
                uf: 'AM'
            },
            {
                nome: 'Bahia',
                uf: 'BA'
            },
            {
                nome: 'Ceará',
                uf: 'CE'
            },
            {
                nome: 'Distrito Federal',
                uf: 'DF'
            },
            {
                nome: 'Espírito Santo',
                uf: 'ES'
            },
            {
                nome: 'Goiás',
                uf: 'GO'
            },
            {
                nome: 'Maranhão',
                uf: 'MA'
            },
            {
                nome: 'Mato Grosso',
                uf: 'MT'
            },
            {
                nome: 'Mato Grosso do Sul',
                uf: 'MS'
            },
            {
                nome: 'Minas Gerais',
                uf: 'MG'
            },
            {
                nome: 'Pará',
                uf: 'PA'
            },
            {
                nome: 'Paraíba',
                uf: 'PB'
            },
            {
                nome: 'Paraná',
                uf: 'PR'
            },
            {
                nome: 'Pernambuco',
                uf: 'PE'
            },
            {
                nome: 'Piauí',
                uf: 'PI'
            },
            {
                nome: 'Rio de Janeiro',
                uf: 'RJ'
            },
            {
                nome: 'Rio Grande do Norte',
                uf: 'RN'
            },
            {
                nome: 'Rio Grande do Sul',
                uf: 'RS'
            },
            {
                nome: 'Rondônia',
                uf: 'RO'
            },
            {
                nome: 'Roraima',
                uf: 'RR'
            },
            {
                nome: 'Santa Catarina',
                uf: 'SC'
            },
            {
                nome: 'São Paulo',
                uf: 'SP'
            },
            {
                nome: 'Sergipe',
                uf: 'SE'
            },
            {
                nome: 'Tocantins',
                uf: 'TO'
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
                $scope.adicionarPonto($scope.obras[i].val_lat, $scope.obras[i].val_long, $scope.obras[i].marker, $scope.obras[i].idn_empreendimento);
            }
        });

        $scope.adicionarPonto = function(x, y, icon, idDoPonto) {
            var myCenter = new google.maps.LatLng(x, y);
            var marker = new google.maps.Marker({
                position: myCenter,
                title: 'Click para mostrar detalhes',
                icon: icon
            });

            google.maps.event.addListener(marker, 'click', function() {
                //alert(idDoPonto);
                $http.get('/tcd-multimidia/api/obras/id/'+idDoPonto+'').success(function(dados) {
                    //console.log(dados);
                    dadosDaObra.setItem(dados);
                    panels.open('estado');
                });
            });

            $scope.markers.push(marker);
            marker.setMap($scope.map);            
        };    
        
        //função de click para cada estado
        $scope.obrasPorEstado = function(estado) {  
            dadosDaObra.setItem('');  
            $scope.estado = estado;        
            //removendo todos os marcadores do mapa
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers = [];

            //carregando as obras do estado selecionado
            $http.get('/tcd-multimidia/api/obras/'+ $scope.estado.uf+'/all').success(function(dados) {
                $scope.obras = dados;            
                for (var i in $scope.obras) {
                    if($scope.obras[i].idn_estagio <= 10) {
                        $scope.obras[i].marker = 'assets/img/vermelho.png';
                    } else if($scope.obras[i].idn_estagio <= 71) {
                        $scope.obras[i].marker = 'assets/img/amarelo.png';
                    } else {
                        $scope.obras[i].marker = 'assets/img/verde.png';
                    }
                    $scope.adicionarPonto($scope.obras[i].val_lat, $scope.obras[i].val_long, $scope.obras[i].marker, $scope.obras[i].idn_empreendimento);
                }
            });
            //setando as estatísticas do estado
            $http.get('/tcd-multimidia/api/obras/'+$scope.estado.uf+'/estatisticas').success(function(dados) {
                $scope.estado.estatisticas = dados;
            });             
            PropriedadesCompartilhadas.setItem($scope.estado);
            panels.close('menuEstados');                          
            panels.open('estado');
        };        
});

app.controller('EstadoController', function($scope, $http, $location, panels, PropriedadesCompartilhadas, dadosDaObra){            
    $scope.getEstado = function() {
        if(PropriedadesCompartilhadas.getItem()) {

        $scope.total = parseInt(PropriedadesCompartilhadas.getItem().estatisticas.vermelho.qt) + parseInt(PropriedadesCompartilhadas.getItem().estatisticas.amarelo.qt) + parseInt(PropriedadesCompartilhadas.getItem().estatisticas.verde.qt);
        $scope.vermelho = Math.round(((parseInt(PropriedadesCompartilhadas.getItem().estatisticas.vermelho.qt)) / $scope.total) * 100);
        $scope.amarelo = Math.round(((parseInt(PropriedadesCompartilhadas.getItem().estatisticas.amarelo.qt)) / $scope.total) * 100);
        $scope.verde = Math.round(((parseInt(PropriedadesCompartilhadas.getItem().estatisticas.verde.qt)) / $scope.total) * 100);
        $scope.estado = PropriedadesCompartilhadas.getItem();     
        $scope.graficoDoEstado($scope.vermelho, $scope.amarelo, $scope.verde);        
        return $scope.estado;
        }
    }

    $scope.getDadosDaObra = function() {
        if(dadosDaObra.getItem()) {
            $scope.obra = dadosDaObra.getItem();
            return $scope.obra;
        }
    };

    $scope.voltar = function() {                    
        panels.close('estado');
        panels.open('menuEstados');    
    };

    //função para converter o valor para moeda
    $scope.formatReal = function(valor) {
        var int = parseInt(valor);
        var tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }

    //create a chart
    $scope.graficoDoEstado = function(vermelho, amarelo, verde) {
        
        var ctx = document.getElementById("myChart").getContext("2d");

        var data = [
            {
                value: vermelho,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Não iniciadas"
            },            
            {
                value: amarelo,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Em andamento"
            },
            {
                value: verde,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Concluidas"
            }
        ];
        //options
        var options = {
            segmentShowStroke: false,
            animateRotate: true,
            animateScale: false,
            percentageInnerCutout: 50,
            tooltipTemplate: "<%= value %>%"
        }
        // And for a doughnut chart
        myDoughnutChart = new Chart(ctx).Doughnut(data, options);

        //add a legend
        document.getElementById('js-legend').innerHTML = myDoughnutChart.generateLegend();
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