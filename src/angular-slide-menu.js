var slideMenu = angular.module('slideMenu', []);

slideMenu.factory('asmState', ['$rootScope', function($rootScope) {
  // This object tracks the status of each window and whether or not
  // it must be the only active window at a given time 
  $rootScope.asmMenuStates = {
      'slideLeft': {active: false, exclusive: false}
    , 'slideRight': {active: false, exclusive: false}
    , 'slideTop': {active: false, exclusive: false}
    , 'slideBottom': {active: false, exclusive: false}
    , 'pushLeft': {active: false, exclusive: true}
    , 'pushRight': {active: false, exclusive: true}
    , 'pushTop': {active: false, exclusive: true}
    , 'pushBottom': {active: false, exclusive: true}
  };
  var toggle = function(menu) {
    if ($rootScope.asmMenuStates.hasOwnProperty(menu)) {
      var canToggle = true;
      var m = null, men = $rootScope.asmMenuStates[menu];
      for (m in $rootScope.asmMenuStates) {
        var me = $rootScope.asmMenuStates[m];
        // Ensure that no other exclusive menus are active, and do not 
        // toggle an exclusive menu if any other menu is active.
        if ((m !== menu) && ((me.exclusive && me.active && ) || men.exclusive)) {
          canToggle = false;
        }
      }
      if (canToggle) {
        men.active = !men.active;
      }
    } 
  };
}]);

slideMenu.directive('asmSlideLeft', ['asmState', function(asmState) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmSlideLeftClasses = ['asm', 'asm-horizontal', 'asm-left'];
        ]
        $scope.watch('asmMenuStates.slideLeft', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmSlideLeftClasses = ['asm', 'asm-horizontal', 'asm-left', 'asm-left-open'];
          }
          else if (!newState && oldState) {
            $scope.asmSlideLeftClasses = ['asm', 'asm-horizontal', 'asm-left'];
          }
        });
      }
    , link: function(scope, element, attr) {
        element[0].classList.add('asm');
        element[0].classList.add('asm-horizontal');
        element[0].classList.add('asm-left');
      }
  };
}]);

slideMenu.directive('asmPushLeft', ['asmState', function(asmState) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmPushLeftClasses = ['asm', 'asm-horizontal', 'asm-left'];
        ]
        $scope.watch('asmMenuStates.pushLeft', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmPushLeftClasses = ['asm', 'asm-horizontal', 'asm-left', 'asm-left-open'];
          }
          else if (!newState && oldState) {
            $scope.asmPushLeftClasses = ['asm', 'asm-horizontal', 'asm-left'];
          }
        });
      }
    , link: function(scope, element, attr) {
        element[0].classList.add('asm');
        element[0].classList.add('asm-horizontal');
        element[0].classList.add('asm-left');
      }
  };
}]);

slideMenu.directive('asmSlideRight', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmSlideRightClasses = ['asm', 'asm-horizontal', 'asm-right'];
        ]
        $scope.watch('asmMenuStates.slideRight', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmSlideRightClasses = ['asm', 'asm-horizontal', 'asm-right', 'asm-right-open'];
          }
          else if (!newState && oldState) {
            $scope.asmSlideRightClasses = ['asm', 'asm-horizontal', 'asm-right'];
          }
        });
      }
    , link: function(scope, element, attr) {
      element[0].classList.add('asm');
      element[0].classList.add('asm-horizontal');
      element[0].classList.add('asm-right');
    }
  };
}]);

slideMenu.directive('asmPushRight', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmPushRightClasses = ['asm', 'asm-horizontal', 'asm-right'];
        ]
        $scope.watch('asmMenuStates.pushRight', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmPushRightClasses = ['asm', 'asm-horizontal', 'asm-right', 'asm-right-open'];
          }
          else if (!newState && oldState) {
            $scope.asmPushRightClasses = ['asm', 'asm-horizontal', 'asm-right'];
          }
        });
      }
    , link: function(scope, element, attr) {
      element[0].classList.add('asm');
      element[0].classList.add('asm-horizontal');
      element[0].classList.add('asm-right');
    }
  };
}]);

slideMenu.directive('asmSlideTop', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmSlideTopClasses = ['asm', 'asm-horizontal', 'asm-top'];
        ]
        $scope.watch('asmMenuStates.slideTop', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmSlideTopClasses = ['asm', 'asm-horizontal', 'asm-top', 'asm-top-open'];
          }
          else if (!newState && oldState) {
            $scope.asmSlideTopClasses = ['asm', 'asm-horizontal', 'asm-top'];
          }
        });
      }
    , link: function(scope, element, attr) {
        element[0].classList.add('asm');
        element[0].classList.add('asm-vertical');
        element[0].classList.add('asm-top');
      }
  };
}]);

slideMenu.directive('asmPushTop', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmPushTopClasses = ['asm', 'asm-horizontal', 'asm-top'];
        ]
        $scope.watch('asmMenuStates.pushTop', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmPushTopClasses = ['asm', 'asm-horizontal', 'asm-top', 'asm-top-open'];
          }
          else if (!newState && oldState) {
            $scope.asmPushTopClasses = ['asm', 'asm-horizontal', 'asm-top'];
          }
        });
      }
    , link: function(scope, element, attr) {
        element[0].classList.add('asm');
        element[0].classList.add('asm-vertical');
        element[0].classList.add('asm-top');
      }
  };
}]);

slideMenu.directive('asmSlideBottom', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmSlideBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom'];
        ]
        $scope.watch('asmMenuStates.slideBottom', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmSlideBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom', 'asm-bottom-open'];
          }
          else if (!newState && oldState) {
            $scope.asmSlideBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom'];
          }
        });
      }
    , link: function(scope, element, attr) {
      element[0].classList.add('asm');
      element[0].classList.add('asm-vertical');
      element[0].classList.add('asm-bottom');
    }
  };
}]);

slideMenu.directive('asmPushBottom', ['$compile', function($compile) {
  return {
      restrict: 'AEC'
    , priority: 1000
    , controller: function($scope, $element, $attrs) {
        $scope.asmPushBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom'];
        ]
        $scope.watch('asmMenuStates.pushBottom', function(newState, oldState) {
          if (newState && !oldState) {
            $scope.asmPushBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom', 'asm-bottom-open'];
          }
          else if (!newState && oldState) {
            $scope.asmPushBottomClasses = ['asm', 'asm-horizontal', 'asm-bottom'];
          }
        });
      }
    , link: function(scope, element, attr) {
      element[0].classList.add('asm');
      element[0].classList.add('asm-vertical');
      element[0].classList.add('asm-bottom');
    }
  };
}]);

slideMenu.directive('asmWrapper', ['$compile', '$document', function($compile, $document) {
  return {
      restrict: 'AEC'
    , controller: function($scope, $element, $attrs) {
        this.toggleOpen = function(push) {
          $element[0].classList.toggle('asm-open');
          $element[0].classList.toggle('asm-closed');
          switch(push) {
            case 'top':
              $element[0].classList.toggle('asm-body-push-top');
              break;
            case 'bottom':
              $element[0].classList.toggle('asm-body-push-bottom');
              break;
            case 'left':
              $element[0].classList.toggle('asm-body-push-left');
              break;
            case 'right':
              $element[0].classList.toggle('asm-body-push-right');
              break;
            default:
              break;
          }
          // Create or destroy asm-mask
          if ($attrs.mask) {
            var mask = $document[0].getElementById('asm-mask');
            if (mask) {
              $element[0].removeChild(mask);
            }
            else {
              mask = $document[0].createElement('div');
              mask.setAttribute('id', 'asm-mask');
              $element[0].appendChild(mask);
            }
          }
        };
      }
    , link: function(scope, element, attr) {
        element[0].classList.add('asm-wrapper');
        element[0].classList.add('asm-closed');
        $compile(element.contents())(scope);
      }
  };
}]);

slideMenu.directive('asmControl', ['$compile', 'asmState', function($compile, asmState) {
  return {
      restrict: 'AEC'
    , link: function(scope, element, attrs) {
        element[0].innerHTML = '<a href="#">'+element[0].innerHTML+'</a>';
        element.find('a').bind('click', function(ev) {
          ev.preventDefault();
          asmState.toggle(attrs.asmMenu);
          //scope.$emit('asm-'+attrs.asmMenu);
        });
        $compile(element.contents())(scope);
      }
  };
}]);
