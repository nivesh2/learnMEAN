angular.module('myList',[])
  .controller('ListController',function($http){
    var list = this;

    list.data = [];

    list.getData = function(){
        $http({
          method: 'GET',
          url: 'http://api-nivesh2.c9users.io/api/v1/fetch'
        }).then(function successCallback(response){
          list.data = response.data.data;
        }, function errorCallback(response){
          console.log(response);
          list.value = 'Error';
        });
    };

    list.addData = function() {
        console.log('add function called');
        if(list.key!==undefined){
          var _data = JSON.stringify({"key":list.key, "value":list.value});
          console.log(_data);
          // Simple GET request example:
          $http({
            method: 'POST',
            url: 'http://api-nivesh2.c9users.io/api/v1/insert',
            data: _data
          }).then(function successCallback(response) {
              console.log(response);

              //asynchronously refreshes the data from the API server
              list.getData();
              
              list.key='';
              list.value='';

            }, function errorCallback(response) {
              console.log(response);
              list.value = 'Error';
            });
        }
    };

    list.delete = function(key){
      console.log('deleting '+key);
      $http({
        method: 'GET',
        url: `http://api-nivesh2.c9users.io/api/v1/delete?key=${key}`
      }).then(function successCallback(response){
          list.getData();
      }, function errorCallback(response){
        console.log(response);
      });
    };

  });
