app.factory('messageFactory', ['$http', function($http){

	function messageFactory(){
		
			this.newCF = function(message, callback){
			$http.post('/addMessage', message).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			})
		}
	}
	return new messageFactory()
}]);