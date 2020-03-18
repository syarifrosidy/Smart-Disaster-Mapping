angular.module('bnpbApp.controllers')
.controller('tabelController', [
    '$rootScope', '$scope', '$log', '$filter', '$state',
    function($rootScope, $scope, $log, $filter, $state) {

    	$scope.detailKejadian = false;

    	$scope.$watch(function() {
    		return $rootScope.detailKejadian;
		}, function() {
			$scope.title = 'Klustering : '+$rootScope.detailKejadian.namaKejadian;

			$scope.detailKejadian = $rootScope.detailKejadian;
			
			if($scope.detailKejadian)
				$scope.loadMap();

		}, true);
	}
]);