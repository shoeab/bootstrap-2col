var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function($scope, $http,$sce) {
	$scope.categories=[];
	$scope.filtered = false;
	$scope.tweets = [];

  	$http.get("data/tweetsData.json")
	  	.then(function(response) {
	  		console.log(response);
	      // $scope.tweets = response.data;
	      angular.forEach(response.data, function(data,key){
	      	//t = data.Text;
			//data.text = data.Text.replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1">#$1</a>');
			data.Text = data.Text.replace(/#(\S*)/g,'<a target="_blank" href="https://twitter.com/hashtag/$1?src=hash">#$1</a>');
			//console.log(t);
			$scope.tweets.push(data);
	      });
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