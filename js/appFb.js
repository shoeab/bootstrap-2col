var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function($scope, $http,$sce) {
	$scope.categories=[];
	$scope.filtered = false;
	$scope.posts = [];
	$scope.posts_luther = [];

  	$http.get("data/harvard-fb-posts.json")
	  	.then(function(response) {
	  		console.log(response);
	      // $scope.tweets = response.data;
	      angular.forEach(response.data.data, function(data,key){
	      	//t = data.Text;
			//data.text = data.Text.replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1">#$1</a>');
			//data.message = data.message.replace(/#(\S*)/g,'<a target="_blank" href="https://twitter.com/hashtag/$1?src=hash">#$1</a>');
			
			data.message = urlify(data.message);

			//console.log(data.message);
			//console.log(t);
			$scope.posts.push(data);
	      });
	      /*console.log(response.data.Entities)
	      $scope.dataType = typeof(response.data);*/
	      //$scope.posts = response.data.data;
	      console.log($scope.posts);
		});

		$http.get("data/updated-fb-data.json")
	  	.then(function(response) {
	  		console.log(response);
	      // $scope.tweets = response.data;
	      angular.forEach(response.data.data, function(data,key){
	      	

			data.message = urlify(data.message);

			data.message = data.message.replace(/#(\S*)/g,'<a target="_blank" href="https://www.facebook.com/hashtag/$1?source=embed">#$1</a>');

			//console.log(t);
			$scope.posts_luther.push(data);
	      });
	      /*console.log(response.data.Entities)
	      $scope.dataType = typeof(response.data);*/
	      //$scope.posts = response.data.data;
	      console.log($scope.posts_luther);
		});

	function urlify(text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
	        return '<a href="' + url + '">' + url + '</a>';
	    })
	    // or alternatively
	    // return text.replace(urlRegex, '<a href="$1">$1</a>')
	}

	/*function urlify(text) {
	    if (text) {
	        text = text.replace(
	            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
	            function(url){
	                var full_url = url;
	                if (!full_url.match('^https?:\/\/')) {
	                    full_url = 'http://' + full_url;
	                }
	                return '<a href="' + full_url + '">' + url + '</a>';
	            }
	        );
	    }
	    return text;
	}*/

	

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