angular.module('gservice', [])
	.factory('gservice', function($rootScope, $http, LocationService){
		var googleMapService = {};
		googleMapService.clickLat = 0;
		googleMapService.clickLong = 0;
		console.log('yo')
		var locations = [];

		var lastMarker;
		var currentSelectedMarker;

		var selectedLat = 27.9564036;
		var selectedLong = -82.8043212;

		googleMapService.getHomes = function(latitude, longitude, callback, filteredResults){
			console.log('getting homes')
			locations = [];

			selectedLat = latitude;
			selectedLong = longitude;
			
			if (filteredResults){
				locations = convertToMapPoints(filteredResults);

				intitialize(latitude, longitude, true);
			}
			else {
				var coords = [longitude, latitude]
				 $http.post('/getHomes',coords).then(function(response, err){
				 	 // console.log(coords)
                console.log('getting homes')
                  console.log(response);
                  if(typeof(callback) == 'function'){
                        respArray = [];
                    for (var i = 0; i < response.data.length; i++){
                        respArray.push(response.data[i].obj);
                        console.log(respArray)    
                    }
                    
                    // console.log(respArray)
                    callback(respArray)
                    }
                     // console.log(err);
                    // Then convert the results into map points
                    locations = convertToMapPoints(response);
                    initialize(latitude, longitude, false);

                    if (err){
                      console.log(err);
                    };            
				 })
			}
		}

		var convertToMapPoints = function(response, err){
			// console.log(response);
			// console.log(response.data);
            console.log(response);
            console.log('object')
            console.log(response.data);
			var locations = [];
			for(var i = 0; i < response.data.length; i++) {
				var aye = response.data[i]
                var  contentString = '<p><b>adress</b>: ' + aye.street_address + '<br><b>price</b>: ' + aye.price + '<br>' + "<a href=\"#/property/"+ aye._id + "\"> Visit </a> ";
               
				try {
                    // console.log(aye.location[1], homes.location[0]);
                      locations.push(new Location(
                        // console.log()
                        new google.maps.LatLng(aye.location[1], aye.location[0]),
                        new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 320
                        }),
                    ))
                 
                    // locations.push(new Location(
                    //     // console.log()

                    //     new google.maps.LatLng(business.location[1], business.location[0]),
                    //     new google.maps.InfoWindow({
                    //         content: contentString,
                    //         maxWidth: 320
                    //     }),
                    //     business.name,
                    //     business.email
                    // ))
				}
				catch(err){
                    // console.log(err)
                     console.log("Couldn't convert point")
                    // $scope.error = "issue with coords"
                }
			}
			return locations;
		}

		var Location = function(latlon, message, link){
			this.latlon = latlon;
			this.message = message;
			this.link = link;
		};
		var initialize = function(latitude, longitude,filter) {
			var myLatLng = {lat: selectedLat, lng: selectedLong};
			if(!map){
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 10,
					center: myLatLng,
					minzoom: 12,
					styles: [
						{
							featureType: 'poi',
							stylers: [{visibility: 'off'}]
						}
					]
				});
			}
		       // If a filter was used set the icons yellow, otherwise blue
            if(filter){
                icon = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            }
            else{
                icon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            }
                del = "assets/factories/dels.png"
            var icon = {
                url: 'assets/pics/shops.png',
                // size:  new google.maps.Size(20, 32),
                scaledSize: new google.maps.Size(54, 60), // scaled size
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            };
            // Loop through each location in the array and place a marker
            locations.forEach(function(n, i){
               var marker = new google.maps.Marker({
                   position: n.latlon,
                   map: map,
                   title: "Big Map",
                   icon: icon
               });

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e){

                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });
		}
		return googleMapService;
	});	