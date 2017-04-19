var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function($scope, $http,$sce) {
	$scope.categories=[];
	$scope.filtered = false;
	$scope.posts = [];

  	$http.get("harvard-fb-posts.json")
	  	.then(function(response) {
	  		console.log(response);
	      // $scope.tweets = response.data;
	      angular.forEach(response.data.data, function(data,key){
	      	//t = data.Text;
			//data.text = data.Text.replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1">#$1</a>');
			//data.message = data.message.replace(/#(\S*)/g,'<a target="_blank" href="https://twitter.com/hashtag/$1?src=hash">#$1</a>');
			
			data.message = urlify(data.message);

			//console.log(t);
			$scope.posts.push(data);
	      });
	      /*console.log(response.data.Entities)
	      $scope.dataType = typeof(response.data);*/
	      //$scope.posts = response.data.data;
	      console.log($scope.posts);
		});

	function urlify(text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
	        return '<a href="' + url + '">' + url + '</a>';
	    })
	    // or alternatively
	    // return text.replace(urlRegex, '<a href="$1">$1</a>')
	}

	

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