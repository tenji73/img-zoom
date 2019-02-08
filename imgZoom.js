angular.module('imgZoom', [])
.factory('imgZoomState',[ function() {
	var imgZooms = [];
	return {
		addPicker: function(imgZoom) {
			imgZooms.push(imgZoom);
		},
		closeAll: function() {
			for (var i=0; i<imgZooms.length; i++) {
				imgZooms[i].close();
			}
		}
	};
}])
.directive('imgZoom', ['$document','imgZoomState', function ($document,imgZoomState) {
	return {
		restrict : 'E',
		transclude : true,
		scope: {
			src : '=',
			class : '='
		},
		controller: ['$scope', '$element', function($scope, $element) {

			$scope.randID = '';
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		    for( var i=0; i < 12; i++ ) $scope.randID += chars.charAt(Math.floor(Math.random() * chars.length));
			$scope.opacity = 0;
		}],
		link: function ($scope, $element, attrs) {

			$element.bind('mouseenter', function (event) {
				$scope.opacity = 1;
				$scope.eWidth = $element[0].childNodes[0].clientWidth;
				$scope.eHeight = $element[0].childNodes[0].clientHeight;
				if (!$scope.$$phase) $scope.$apply();
			});			

			$element.bind('mouseout', function (event) {
				$scope.opacity = 0;
				if (!$scope.$$phase) $scope.$apply();
			});

			$element.bind('mousemove', function (event) {
				$('#img-' + $scope.randID).css('margin-left', (-(event.offsetX / $scope.eWidth) * ($('#img-' + $scope.randID).width() - $scope.eWidth ))  + 'px');
				$('#img-' + $scope.randID).css('margin-top', (-(event.offsetY / $scope.eHeight) * ($('#img-' + $scope.randID).height() - $scope.eHeight)) + 'px');
				if (!$scope.$$phase) $scope.$apply();
			});
		},

		template : '<div style="position:relative;cursor:all-scroll">'
		+ '<img src="{{src}}" class="{{class}}" style="max-width:100%;height:auto;">'
		+ '<div style="opacity:{{opacity}};pointer-events: none;position:absolute;left:0;top:0;right:0;bottom:0;z-index:100;overflow:hidden;" class="{{class}}"><img id="img-{{ randID }}" src="{{src}}" /></div>'
		+ '</div>'
	};
}]);