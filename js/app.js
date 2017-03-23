var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.categories=[];
	$scope.filtered = false;

  	$http.get("ex.json")
	  	.then(function(response) {
	      $scope.tweets = response.data;
	      $scope.dataType = typeof(response.data);
	      	angular.forEach(response.data, function(value, key) {
	      		if($scope.categories.indexOf(value.categoryType) !== -1) {
					$scope.message = 'artNr already exists!';
				}
				else{
					ob = '{"id":'+value.categoryType+'}';
		  			$scope.categories.push(JSON.parse(ob));
		  			// console.log(value)
				}
	      		
		  	});
		  	console.log($scope.categories)
		});

	$scope.filterTweet = function(){
		if($scope.categoryFilter!='' || $scope.categoryFilter!=undefined)
		{	console.log('test')
			$scope.filtered = true;
			var tweets = $scope.tweets;
			$scope.filteredTweets = [];
			angular.forEach(tweets, function(value, key) {
				if(value.categoryType==$scope.categoryFilter)
	      		{
	      			//ob = '{"id":'+value.categoryType+'}';
	      			$scope.filteredTweets.push(value);
	      			 console.log(value)
	      	  	}
		  	});
		}
		else{
			$scope.filteredTweets = $scope.tweets;
		}
	}
});