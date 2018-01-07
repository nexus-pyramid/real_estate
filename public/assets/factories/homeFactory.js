app.factory('homeFactory', ['$http', function($http){

	function homeFactory(){
		this.addHome = function(home, callback){
			$http.post('/addHome', home).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			})
		}	
	}
	return new homeFactory()
}]);