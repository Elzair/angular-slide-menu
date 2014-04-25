var slideMenu = angular.module('slideMenu', []);

slideMenu.factory('asmState', ['$rootScope', function($rootScope) {
  // This object tracks the status of each window and whether or not
  // it must be the only active window at a given time 
  $rootScope.asmStates = {
      'slideLeft': {active: false, exclusive: false}
    , 'slideRight': {active: false, exclusive: false}
    , 'slideTop': {active: false, exclusive: false}
    , 'slideBottom': {active: false, exclusive: false}
    , 'pushLeft': {active: false, exclusive: true}
    , 'pushRight': {active: false, exclusive: true}
    , 'pushTop': {active: false, exclusive: true}
    , 'pushBottom': {active: false, exclusive: true}
  };

  // This object tracks whether or not to push the asm-wrapper
  $rootScope.asmPush = null;

  /** This function toggles one of the menus listed in asmStates from 
   *  active to inactive and vice-versa based on certain criteria.
   *  @param menuKey the menu to attempt to toggle
   */
  var toggle = function(menuKey) {
    if ($rootScope.asmStates.hasOwnProperty(menuKey)) {
      var menuValue = $rootScope.asmStates[menuKey];
      var canToggle = true;
      var key = null
      for (key in $rootScope.asmStates) {
        var value = $rootScope.asmStates[key];
        // Ensure that no other exclusive menus are active, and do not 
        // activate an exclusive menu if any other menu is active.
        if ((key !== menuKey) && ((value.exclusive && value.active) || menuValue.exclusive)) {
          canToggle = false;
          break;
        }
      }
      if (canToggle) {
        menuValue.active = !menuValue.active;
        // Update asm-wrapper on whether it needs pushing aside
        $rootScope.asmPush = menuValue.exclusive ? menuKey : null;
      }
    } 
  };
}]);

slideMenu.directive('asmSlideLeft', function() {
  return {
       restrict: 'AEC'
     , scope: {
        'asmStates.slideLeft.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-horizontal: true, asm-left: true, ' + 
        'asm-left-open: asmStates.slideLeft.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmPushLeft', function() {
  return {
       restrict: 'AEC'
     , scope: {
        'asmStates.pushLeft.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-horizontal: true, asm-left: true, ' + 
        'asm-left-open: asmStates.pushLeft.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmSlideRight', function() {
  return {
       restrict: 'AEC'
     , scope: {
        'asmStates.slideRight.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-horizontal: true, asm-right: true, ' + 
        'asm-right-open: asmStates.slideRight.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmPushRight', function() {
  return {
       restrict: 'AEC'
     , scope: {
        'asmStates.pushRight.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-horizontal: true, asm-right: true, ' + 
        'asm-right-open: asmStates.pushRight.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmSlideTop', function() {
  return {
       restrict: 'AEC'
     , scope: {
        'asmStates.slideTop.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-vertical: true, asm-top: true, ' + 
        'asm-top-open: asmStates.slideTop.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmPushTop', function() {
  return {
      restrict: 'AEC'
     , scope: {
        'asmStates.pushTop.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-vertical: true, asm-top: true, ' + 
        'asm-top-open: asmStates.pushTop.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmSlideBottom', function() {
  return {
      restrict: 'AEC'
     , scope: {
        'asmStates.slideBottom.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-vertical: true, asm-bottom: true, ' + 
        'asm-bottom-open: asmStates.slideBottom.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmPushBottom', function() {
  return {
      restrict: 'AEC'
     , scope: {
        'asmStates.pushBottom.active': '='
       }
     , transclude: true
     , template: '<div ng-class="{asm: true, asm-vertical: true, asm-bottom: true, ' + 
        'asm-bottom-open: asmStates.pushBottom.active}" ng-transclude></div>' 
  };
});

slideMenu.directive('asmWrapper', function() {
  return {
      restrict: 'AEC'
    , scope: {
        'asmPush': '='
      }
    , transclude: true
    , template: '<div ng-class="{asm-wrapper: true, asm-body-closed: !asmPush, ' + 
        'asm-body-push-left: asmPush === "pushLeft", asm-body-push-right: asmPush === "pushRight", ' + 
        'asm-body-push-top: asmPush === "pushTop", asm-body-push-bottom: asmPush === "pushBottom"}" ' + 
        'ng-transclude></div>'
  };
});

slideMenu.directive('asmControl', ['$compile', 'asmState', function($compile, asmState) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element[0].innerHTML = '<a href="#">'+element[0].innerHTML+'</a>';
        element.find('a').bind('click', function(ev) {
          ev.preventDefault();
          asmState.toggle(attrs.asmMenu);
        });
        $compile(element.contents())(scope);
      }
  };
}]);
