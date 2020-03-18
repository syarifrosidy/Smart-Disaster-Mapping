angular.module('bnpbApp.controllers')
.controller('mapController', [
    '$rootScope', '$scope', '$log', '$filter', '$state',
    function($rootScope, $scope, $log, $filter, $state) {

    	$scope.detailKejadian = false;

    	$scope.$watch(function() {
    		return $rootScope.detailKejadian;
		}, function() {
			$scope.title = 'Mapping : '+$rootScope.detailKejadian.namaKejadian;

			$scope.detailKejadian = $rootScope.detailKejadian;
			
			if($scope.detailKejadian)
				$scope.loadMap();

		}, true);


		$scope.loadMap = function(){
			var peta = $scope.detailKejadian.peta;

			var kmlSrc = peta.kml;
			var zoom = peta.zoom;
			var lat = peta.lat;
			var lng = peta.lng;
			
			initializeMap(kmlSrc, lat, lng, zoom, function afterMapRender(){
				var dataList = $scope.detailKejadian.dataList;

				$.each(dataList, function(i, dataItem){
					setPolyColor(dataItem.mapAreaId, dataItem.kluster[2]);

					var info = 'Kota : <strong>'+dataItem.namaKota+'</strong><br/>';
						info += 'Kec : <strong>'+dataItem.namaKec+'</strong><br/>';
						info += 'Kluster : <strong>'+dataItem.kluster[1]+'</strong><hr/>';
						info += 'Meninggal : <strong>'+$filter('number')(dataItem.korban.meninggal)+'</strong><br/>';
						info += 'Hilang : <strong>'+$filter('number')(dataItem.korban.hilang)+'</strong><br/>';
						info += 'Luka : <strong>'+$filter('number')(dataItem.korban.luka)+'</strong><br/>';
						info += 'Mengungsi : <strong>'+$filter('number')(dataItem.korban.mengungsi)+'</strong><br/>';
						info += 'Terdampak : <strong>'+$filter('number')(dataItem.korban.terdampak)+'</strong><br/>';
					setPolyInfo(dataItem.mapAreaId, info);
				})
		  	});

		}
	}
]);