/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var slideMenu = angular.module('slideMenu', []);
	
	slideMenu.factory('asmService', ['$rootScope', function($rootScope) {
	  return {
	      // This object tracks the status of each window and whether or not
	      // it must be the only active window at a given time 
	      asmStates: {
	          'slideLeft': {active: false, exclusive: false}
	        , 'slideRight': {active: false, exclusive: false}
	        , 'slideTop': {active: false, exclusive: false}
	        , 'slideBottom': {active: false, exclusive: false}
	        , 'pushLeft': {active: false, exclusive: true}
	        , 'pushRight': {active: false, exclusive: true}
	        , 'pushTop': {active: false, exclusive: true}
	        , 'pushBottom': {active: false, exclusive: true}
	      }
	
	      // This object tracks whether or not to push the asm-wrapper
	    , asmPush: null
	
	      /** This function toggles one of the menus listed in asmStates from 
	       *  active to inactive and vice-versa based on certain criteria.
	       *  @param menuKey the menu to attempt to toggle
	       */
	    , toggle: function(menuKey) {
	        if (this.asmStates.hasOwnProperty(menuKey)) {
	          var menuValue = this.asmStates[menuKey];
	          var canToggle = true;
	          var key = null
	          for (key in this.asmStates) {
	            var value = this.asmStates[key];
	            // Ensure that no other exclusive menus are active, and do not 
	            // activate an exclusive menu if any other menu is active.
	            //if (key === menuKey) {
	            //  continue;
	            //}
	            if ((key !== menuKey) && (value.active && (value.exclusive || menuValue.exclusive))) {
	              canToggle = false;
	              break;
	            }
	          }
	          if (canToggle) {
	            this.asmStates[menuKey].active = !this.asmStates[menuKey].active;
	            // Update asm-wrapper on whether it needs pushing aside
	            console.log(menuKey.substring(4).toLowerCase());
	            this.asmPush = (menuKey.substring(0, 4) === 'push' && this.asmStates[menuKey].active) 
	              ? menuKey.substring(4).toLowerCase() : null;
	            console.log(this.asmPush);
	            console.log(menuKey + ' active: ' + this.asmStates[menuKey].active);
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
	      }
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
	          console.log('Body Caught Event: ' + asmService.asmPush);
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
	                console.log(iAttrs);
	                ev.preventDefault();
	                asmService.toggle(iAttrs.asmControl);
	              });
	            }
	        };
	      }
	  };
	}]);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(4)
		// The css code:
		(__webpack_require__(3))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		".asm-wrapper {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 10;\n}\n#asm-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9998;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.8);\n}\n.asm {\n  position: fixed;\n  z-index: 9999;\n  overflow: hidden;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-horizontal {\n  top: 0;\n  width: 300px;\n  height: 100%;\n}\n.asm-vertical {\n  left: 0;\n  width: 100%;\n  height: 100px;\n}\n.asm-body-closed {\n  left: 0;\n  top: 0;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-left {\n  left: -300px;\n}\n.asm-left-open {\n  left: 0;\n}\n.asm-body-push-left {\n  left: 300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-right {\n  right: -300px;\n}\n.asm-right-open {\n  right: 0;\n}\n.asm-body-push-right {\n  left: -300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-top {\n  top: -100px;\n}\n.asm-top-open {\n  top: 0;\n}\n.asm-body-push-top {\n  top: 100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-bottom {\n  bottom: -100px;\n}\n.asm-bottom-open {\n  bottom: 0;\n}\n.asm-body-push-bottom {\n  top: -100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		return function() {
			head.removeChild(styleElement);
		};
	}

/***/ }
/******/ ])
/*
//@ sourceMappingURL=angular-slide-menu.js.map
*/