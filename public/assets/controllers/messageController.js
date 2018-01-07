app.controller('messageController', function($scope, $location, $route, messageFactory){

	// $scope.addMessage = function(message) 
	// 	messageFactory.addMessage(message, function(data){
	// 			if(data['errors']){
	// 		      		$scope.errors.push(data['errors']);
	// 		      	} else {
	// 		      		console.log('successfuly added message')
	// 		      		// $location.url('/homes');
	// 		      		// $scope.success = "new Property created";
	// 		      	}
	// 	})
	$scope.newCF = function(cf){
	 messageFactory.newCF(cf, function(data){
      	// Home.location = [$scope.loc.lng, $scope.loc.lat];
      	// console.log('this is the homes location');
      	// console.log(Home.location);
      	// console.log('THIS IS THE HOME');
      	// console.log(Home);
      	if(data['errors']){
      		$scope.errors.push(data['errors']);
      	} else {
      		console.log('successfuly created Property')
      		// $location.url('/homes');
      		$route.reload();
      		$scope.success = "new Property created";
      	}
      })
	}
            function initMap() {
            var loco = {lat : 27.8466905,
               lng : -82.78752519999999};
            var map = new google.maps.Map(document.getElementById('about_map'), {
                  zoom: 17,
                  center: loco
            });
            var marker = new google.maps.Marker({
                  position: loco,
                  map: map
            });
      }initMap();

});