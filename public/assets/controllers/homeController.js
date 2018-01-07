app.controller('homeController', function($scope, $location, $route, gservice, geolocation, LocationService, homeFactory){
	var errors = [];
	$scope.convertAdress = function(address) {
		var geocoder = new google.maps.Geocoder();
		var address = $scope.address;
		geocoder.geocode({'address': address}, function(results, status){
			console.log(results);
		})
	}

	// var geocoder = new google.maps.Geocoder();
	// console.log(geocoder);
	$scope.addHome = function(Home){
		console.log(Home);
	
			var geocoder = new google.maps.Geocoder();
			console.log(geocoder);
			var address = Home.street_address;

			// Home.location = [$scope.loc.lng, $scope.loc.lat]
			geocoder.geocode({'address': address}, function(results, status){
				// if(status !== 200){
				// 	$scope.errors.push(results['errors'])
				// 	console.log($scope.errors);
				console.log('this is the status');
				console.log(status);
				if(status == 'OK') {
				  $scope.loc = {};
			      $scope.loc.lng = results[0].geometry.location.lng();
			      $scope.loc.lat = results[0].geometry.location.lat();
			      			      	Home.location = [$scope.loc.lng, $scope.loc.lat];

			      console.log($scope.loc);
			      homeFactory.addHome(Home, function(data){
			      	Home.location = [$scope.loc.lng, $scope.loc.lat];
			      	console.log('this is the homes location');
			      	console.log(Home.location);
			      	console.log('THIS IS THE HOME');
			      	console.log(Home);
			      	if(data['errors']){
			      		$scope.errors.push(data['errors']);
			      	} else {
			      		console.log('successfuly created Property')
			      		// $location.url('/homes');
			      		$route.reload();
			      		$scope.success = "new Property created";
			      	}
			      })
				} else {
					console.log(status);
					console.log(results);
					console.log('sorry data doesnt contain coords');
					if(results[0].geometry.location.lng() && results[0].geometry.location.lat() !== null){
					  $scope.loc = {};
				      $scope.loc.lng = results[0].geometry.location.lng();
				      $scope.loc.lat = results[0].geometry.location.lat();	
				         homeFactory.addHome(Home, function(data){
			      	Home.location = [$scope.loc.lng, $scope.loc.lat];
			      	if(data['errors']){
			      		$scope.errors.push(data['errors']);
			      	} else {
			      		console.log('successfuly created Property')
			      		// $location.url('/homes');
			      		$scope.success = "new Property created";
			      	}
			      })
					} else {
						console.log('sucks to suck')
					}
				}	  
			})
			 homeFactory.addHome(Home, function(data){
			      	Home.location = [$scope.loc.lng, $scope.loc.lat];
			      	console.log('this is the homes location');
			      	console.log(Home.location);
			      	console.log('THIS IS THE HOME');
			      	console.log(Home);
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
	// console.log(geolocation)
	function getHomes() {
		// geolocation.getLocation().then(function(data){
		// var lat = data.coords.latitude;
		// var long = data.coords.longitude;

		// gservice.getHomes(lat, long, function(data){
		// 		$scope.homes = data;
		// });

	  ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
      
      	gservice.getHomes(27.9564036, -82.8043212, function(data){
				$scope.homes = data;
		});
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(27.9564036, -82.8043212);
        geocoder.geocode({'location': latlng}, function(results, status){
          $scope.address = results[2];
          if( status === 'Ok'){
            if(results[1]){
              address = results;
              $scope.address = address;
            } else {
              console.log('no results found');
            }
          }
        });
	}getHomes();

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