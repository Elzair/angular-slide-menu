var slideMenu = angular.module('slideMenu', []);

slideMenu.factory('asmService', ['$rootScope', function($rootScope) {
  // This object tracks the status of each window and whether or not
  // it must be the only active window at a given time 
  var asmStates = {
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
  var asmPush = null;

  /** This function toggles one of the menus listed in asmStates from 
   *  active to inactive and vice-versa based on certain criteria.
   *  @param menuKey the menu to attempt to toggle
   */
  var toggle = function(menuKey) {
    if (asmStates.hasOwnProperty(menuKey)) {
      var menuValue = asmStates[menuKey];
      var canToggle = true;
      var key = null
      for (key in asmStates) {
        var value = asmStates[key];
        // Ensure that no other exclusive menus are active, and do not 
        // activate an exclusive menu if any other menu is active.
        if ((key !== menuKey) && ((value.exclusive && value.active) || menuValue.exclusive)) {
          canToggle = false;
          break;
        }
      }
      if (canToggle) {
        asmStates[menuKey].active = !asmStates[menuKey].active;
        // Update asm-wrapper on whether it needs pushing aside
        asmPush = menuKey.substring(0, 4) === 'push' ? menuKey.substring(4).toLowerCase() : null;
        console.log(menuKey + ' active: ' + asmStates[menuKey].active);
        // Emit event
        $rootScope.$emit('asmEvent', null);
      }
      else {
        console.log('Cannot toggle!');
      }
    } 
    else {
      console.log('Unknown menu!');
    }
  };

  // Return Service object
  return {
      asmStates: asmStates
    , asmPush: asmPush
    , toggle: toggle
  };
}]);

slideMenu.directive('asmSlideLeft', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-horizontal asm-left');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.slideLeft.active) {
            element.addClass('asm-left-open');
          }
          else {
            element.removeClass('asm-left-open');
          }
        });
      }
  }
}]);

slideMenu.directive('asmPushLeft', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-horizontal asm-left');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.pushLeft.active) {
            element.addClass('asm-left-open');
          }
          else {
            element.removeClass('asm-left-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmSlideRight', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-horizontal asm-right');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.slideRight.active) {
            element.addClass('asm-right-open');
          }
          else {
            element.removeClass('asm-right-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmPushRight', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-horizontal asm-right');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.pushRight.active) {
            element.addClass('asm-right-open');
          }
          else {
            element.removeClass('asm-right-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmSlideTop', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-vertical asm-top');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.slideTop.active) {
            element.addClass('asm-top-open');
          }
          else {
            element.removeClass('asm-top-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmPushTop', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-vertical asm-top');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.pushTop.active) {
            element.addClass('asm-top-open');
          }
          else {
            element.removeClass('asm-top-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmSlideBottom', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-vertical asm-bottom');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.slideBottom.active) {
            element.addClass('asm-bottom-open');
          }
          else {
            element.removeClass('asm-bottom-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmPushBottom', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm asm-vertical asm-bottom');
        $rootScope.$on('asmEvent', function() {
          if (asmService.asmStates.pushBottom.active) {
            element.addClass('asm-bottom-open');
          }
          else {
            element.removeClass('asm-bottom-open');
          }
        });
      }
  };
}]);

slideMenu.directive('asmWrapper', ['$rootScope', 'asmService', function($rootScope, asmService) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element.addClass('asm-wrapper asm-body-closed');
        $rootScope.$on('asmEvent', function() {
          switch(asmService.asmPush) {
            case 'left':
              element.removeClass('asm-body-closed');
              element.addClass('asm-body-push-left');
              break;
            case 'right':
              element.removeClass('asm-body-closed');
              element.addClass('asm-body-push-right');
              break;
            case 'top':
              element.removeClass('asm-body-closed');
              element.addClass('asm-body-push-top');
              break;
            case 'bottom':
              element.removeClass('asm-body-closed');
              element.addClass('asm-body-push-bottom');
              break;
            default:
              element.removeClass('asm-body-push-left asm-body-push-right asm-body-push-top asm-body-push-bottom');
              element.addClass('asm-body-closed');
              break;
          }
        });
      }
  };
}]);

slideMenu.directive('asmControl', ['asmService', function(asmService) {
  return {
      restrict: 'AEC'
    , compile: function(element, attrs) {
        element[0].innerHTML = '<a href="#">' + element[0].innerHTML + '</a>';
        return {
            pre: function preLink(scope, iElement, iAttrs) {
            }
          , post: function postLink(scope, iElement, iAttrs) {
              iElement.find('a').on('click', function(ev) {
                ev.preventDefault();
                asmService.toggle(attrs.menu);
              });
            }
        };
      }
  };
}]);
