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
        asmPush = asmStates[menuKey].exclusive ? menuKey : null;
        console.log(menuKey + ' active: ' + asmStates[menuKey].active);
        // Emit event
        $rootScope.active = asmStates.slideLeft.active;
        $rootScope.$emit('asmEvent', null)
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
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.slideLeft.active;
          console.log('New active: ' + $scope.active);
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-horizontal asm-left');
        attrs.$set('data-ng-class', '{"asm-left-open: active"}');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {}
        }
      }
  }
}]);

slideMenu.directive('asmPushLeft', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.pushLeft.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-horizontal asm-left');
        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-left": true, "asm-left-open": active}');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmSlideRight', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.slideRight.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-horizontal asm-right');
        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-right": true, "asm-right-open": active');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmPushRight', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.pushRight.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-horizontal asm-right');
        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-right": true, "asm-right-open": active');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmSlideTop', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.slideTop.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-vertical asm-top');
        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-top": true, "asm-top-open": active}"');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmPushTop', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.pushTop.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-vertical asm-top');
        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-top": true, "asm-top-open": active}"');
         return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmSlideBottom', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.slideBottom.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-vertical asm-bottom');
        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-bottom": true, "asm-bottom-open": active');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmPushBottom', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.active = asmService.asmStates.pushBottom.active;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('class', 'asm asm-vertical asm-bottom');
        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-bottom": true, "asm-bottom-open": active');
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmWrapper', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
  return {
      restrict: 'AEC'
    , scope: {}
    , controller: function($scope) {
        $rootScope.$on('asmEvent', function(event, prop) {
          $scope.asmPush = asmService.asmPush;
        });
      }
    , compile: function(element, attrs) {
        attrs.$set('ng-class', '{"asm-wrapper": true, "asm-body-closed": !asmPush, ' + 
          '"asm-body-push-left": asmPush === "pushLeft", "asm-body-push-right": asmPush === "pushRight", ' + 
          '"asm-body-push-top": asmPush === "pushTop", "asm-body-push-bottom": asmPush === "pushBottom"}'); 
        return {
            pre: function preLink(scope, iElement, iAttrs) {}
          , post: function postLink(scope, iElement, iAttrs) {
              //$compile(iElement.contents())(scope);
            }
        }
      }
  };
}]);

slideMenu.directive('asmControl', ['$compile', 'asmService', function($compile, asmService) {
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
