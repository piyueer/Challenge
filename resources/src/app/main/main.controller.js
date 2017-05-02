(function() {
  'use strict';

  angular
    .module('page')
    .controller('MainController', MainController)
    .controller('TableController', TableController);

  /** @ngInject */
  function MainController($http,$log) {
    var vm =this;
    var url="offerings";
    $http.get(url).success(function(data){
      vm.purchase=data.offerings;
    }).error(function(){

    })

    // vm.purchase=[
    //   {id:1,title:'wares1',price:123},
    //   {id:2,title:'wares2',price:234},
    //   {id:3,title:'wares2',price:345},
    //   {id:4,title:'wares3',price:456}
    // ]
    vm.id=null;

    vm.setId=function(){
      for(var i=0;i<vm.purchase.length;i++){
        if(vm.purchase[i].id==vm.id){
          vm.price = vm.purchase[i].price;
        }
      }
    }
    
    vm.showAlert={
          show:false,
          words:""
        }
    vm.submit=function(){
      if(!vm.name){
        vm.showAlert={
          show:true,
          words:"Please enter your user name"
        }
        return;
      }
      if(vm.quantity && vm.price){
        
        vm.showAlert={
          show:false,
          words:""
        }
        vm.result=parseFloat(vm.quantity)*parseFloat(vm.price);
        var url ='purchases';
        var sendData = {
          customerName: vm.name,
          offeringID:vm.id,
          quantity:parseFloat(vm.quantity)
        } 
        $log.log(sendData.quantity);
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {customerName:sendData.customerName, offeringID:sendData.offeringID,quantity:sendData.quantity}
        }).success(function () {});
      }else if(!vm.quantity && vm.price){
        vm.showAlert={
          show:true,
          words:"Please select the price"
        }
      }else if(vm.quantity && !vm.price){
        vm.showAlert={
          show:true,
          words:"Please select a commodity"
        }
      }else{
        vm.showAlert={
          show:true,
          words:"Please select and commodity prices"
        }
      }
    }
  }

  function TableController($http) {
    var vm = this;
    var url="purchases";
    $http.get(url).success(function(data){
      vm.data=data.purchases;
    }).error(function(){

    })
    // vm.data=[
    //   {id:1,title:"title words",quantity:12,unit:12,total:144},
    //   {id:1,title:"title words",quantity:12,unit:11,total:144},
    //   {id:1,title:"title words",quantity:12,unit:15,total:144},
    //   {id:1,title:"title words",quantity:12,unit:17,total:144}
    // ]
  }
})();
