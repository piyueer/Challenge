(function() {
  'use strict';

  angular
    .module('page', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr']);

})();

(function() {
  'use strict';

  angular
      .module('page')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Less',
        'url': 'http://lesscss.org/',
        'description': 'Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.',
        'logo': 'less.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('page')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    NavbarController.$inject = ["moment"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();

(function() {
  'use strict';

  acmeMalarkey.$inject = ["malarkey"];
  angular
    .module('page')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    MalarkeyController.$inject = ["$log", "githubContributor"];
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function() {
        angular.forEach(vm.contributors, function(contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function() {
          $log.info('Activated Contributors View');
        });
      }

      function getContributors() {
        return githubContributor.getContributors(10).then(function(data) {
          vm.contributors = data;

          return vm.contributors;
        });
      }
    }

  }

})();

(function() {
  'use strict';

  githubContributor.$inject = ["$log", "$http"];
  angular
    .module('page')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();

(function() {
  'use strict';

  MainController.$inject = ["$http", "$log"];
  TableController.$inject = ["$http"];
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

(function() {
  'use strict';

  runBlock.$inject = ["$log"];
  angular
    .module('page')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  angular
    .module('page')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('table',{
        url:'/table',
        templateUrl:'app/table/table.html',
        controller:'TableController',
        controllerAs:'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('page')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();

(function() {
  'use strict';

  config.$inject = ["$logProvider", "toastrConfig"];
  angular
    .module('page')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();

angular.module("page").run(["$templateCache", function($templateCache) {$templateCache.put("app/table/table.html","<div class=\"container\">\r\n	<table class=\"table table-striped\">\r\n		<thead>\r\n			<tr>\r\n				<th>Purchase ID</th>\r\n				<th>Offering title</th>\r\n				<th>Quantity</th>\r\n				<th>Unit price</th>\r\n				<th>Total</th>\r\n			</tr>\r\n		</thead>\r\n		<tbody>\r\n			<tr ng-repeat=\"item in main.data\">\r\n				<td>{{item.id}}</td>\r\n				<td>{{item.offering.title}}</td>\r\n				<td>{{item.quantity}}</td>\r\n				<td>{{item.offering.price}}</td>\r\n				<td>{{item.quantity*item.offering.price}}</td>\r\n			</tr>\r\n		</tbody>\r\n	</table>\r\n</div>");
$templateCache.put("app/main/main.html","<div class=\"container\">\n  <form>\n    <div class=\"form-group\">\n      <label for=\"purchase\">select the Offering</label>\n      <select class=\"form-control\" ng-model=\"main.id\" ng-change=\"main.setId()\">\n        <option ng-repeat=\"option in main.purchase\" value=\"{{option.id}}\">{{option.title}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"name\">customer name</label>\n      <input type=\"text\" ng-model=\"main.name\" class=\"form-control\" id=\"name\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"quantity\">quantity</label>\n      <input type=\"number\" ng-model=\"main.quantity\" class=\"form-control\" id=\"quantity\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"total\"> total amount of the purchase</label>\n      <input value=\"{{(main.price*main.quantity)?(main.price*main.quantity):0}}\" type=\"text\" class=\"form-control\" id=\"total\" disabled=\"disabled\">\n    </div>\n    <button type=\"button\" ng-click=\"main.submit()\" class=\"btn btn-default\">submit</button>\n    <div class=\"alert alert-danger alert-tab\" ng-if=\"main.showAlert.show\" role=\"alert\">{{main.showAlert.words}}</div>\n  </form>\n</div>\n");
$templateCache.put("app/components/navbar/navbar.html","<nav class=\"navbar navbar-static-top navbar-inverse\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"https://github.com/Swiip/generator-gulp-angular\">\n        <span class=\"glyphicon glyphicon-home\"></span> Gulp Angular\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-6\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"active\"><a ng-href=\"#\">Home</a></li>\n        <li><a ng-href=\"#\">About</a></li>\n        <li><a ng-href=\"#\">Contact</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right acme-navbar-text\">\n        <li>Application was created {{ vm.relativeDate }}.</li>\n      </ul>\n    </div>\n  </div>\n</nav>\n");}]);
//# sourceMappingURL=../maps/scripts/app-aa1186b6e0.js.map
