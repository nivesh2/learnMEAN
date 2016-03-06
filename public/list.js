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

              var _index=-1;
              list.data.forEach(function(item,index,array){
                if(item.key === list.key){
                  item.value = list.value;
                }
              });
              
              if(_index===-1){
                list.data.push({'key':list.key,'value':list.value});
              }
              
              list.key='';
              list.value='';

            }, function errorCallback(response) {
              console.log(response);
            });
        }
    };

    list.delete = function(key){
      console.log('deleting '+key);
      $http({
        method: 'GET',
        url: "http://api-nivesh2.c9users.io/api/v1/delete?key="+key
      }).then(function successCallback(response){
          
          var _index=0;
          list.data.forEach(function(item,index,array){
            if(item.key === key){
               _index=index;
            }
          });
          list.data.splice(_index,1);
      }, function errorCallback(response){
        console.log(response);
      });
    };

  });
