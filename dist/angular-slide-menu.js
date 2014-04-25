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
	        $rootScope.asmStates[menuKey].active = !$rootScope.asmStates[menuKey].active;
	        // Update asm-wrapper on whether it needs pushing aside
	        $rootScope.asmPush = $rootScope.asmStates[menuKey].exclusive ? menuKey : null;
	        console.log(menuKey + ' active:' + $rootScope.asmStates[menuKey].active);
	      }
	      else {
	        console.log('Cannot toggle!');
	      }
	    } 
	  };
	  return {
	    toggle: toggle
	  }
	}]);
	
	slideMenu.directive('asmSlideLeft', function($rootScope) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , link: function(scope, element, attrs) {
	        element[0].outerHTML = '<div ng-class="{asm: true, \'asm-horizontal\': true, \'asm-left\': true, ' + 
	        '\'asm-left-open\': $rootScope.asmStates.slideLeft.active}">' + element[0].outerHTML + '</div';
	      }
	  };
	});
	
	slideMenu.directive('asmPushLeft', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.pushLeft.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-horizontal\': true, \'asm-left\': true, ' + 
	        '\'asm-left-open\': asmStates.pushLeft.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmSlideRight', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.slideRight.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-horizontal\': true, \'asm-right\': true, ' + 
	        '\'asm-right-open\': asmStates.slideRight.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmPushRight', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.pushRight.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-horizontal\': true, \'asm-right\': true, ' + 
	        '\'asm-right-open\': asmStates.pushRight.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmSlideTop', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.slideTop.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-vertical\': true, \'asm-top\': true, ' + 
	        '\'asm-top-open\': asmStates.slideTop.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmPushTop', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.pushTop.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-vertical\': true, \'asm-top\': true, ' + 
	        '\'asm-top-open\': asmStates.pushTop.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmSlideBottom', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.slideBottom.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-vertical\': true, \'asm-bottom\': true, ' + 
	        '\'asm-bottom-open\': asmStates.slideBottom.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmPushBottom', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	        'asmStates.pushBottom.active': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{asm: true, \'asm-vertical\': true, \'asm-bottom\': true, ' + 
	        '\'asm-bottom-open\': asmStates.pushBottom.active}" ng-transclude></div>' 
	  };
	});
	
	slideMenu.directive('asmWrapper', function() {
	  return {
	      restrict: 'AEC'
	    , scope: {
	      'asmPush': '='
	      }
	    , transclude: true
	    , template: '<div ng-class="{\'asm-wrapper\': true, \'asm-body-closed\': !asmPush, ' + 
	        '\'asm-body-push-left\': asmPush === \'pushLeft\', \'asm-body-push-right\': asmPush === \'pushRight\', ' + 
	        '\'asm-body-push-top\': asmPush === \'pushTop\', \'asm-body-push-bottom\': asmPush === \'pushBottom\'}" ' + 
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
		".asm-wrapper {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 10;\n}\n#asm-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 15;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.8);\n}\n.asm {\n  position: fixed;\n  z-index: 20;\n  overflow: hidden;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-horizontal {\n  top: 0;\n  width: 300px;\n  height: 100%;\n}\n.asm-vertical {\n  left: 0;\n  width: 100%;\n  height: 100px;\n}\n.asm-body-closed {\n  left: 0;\n  top: 0;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-left {\n  left: -300px;\n}\n.asm-left-open {\n  left: 0;\n}\n.asm-body-push-left {\n  left: 300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-right {\n  right: -300px;\n}\n.asm-right-open {\n  right: 0;\n}\n.asm-body-push-right {\n  left: -300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-top {\n  top: -100px;\n}\n.asm-top-open {\n  top: 0;\n}\n.asm-body-push-top {\n  top: 100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-bottom {\n  bottom: -100px;\n}\n.asm-bottom-open {\n  bottom: 0;\n}\n.asm-body-push-bottom {\n  top: -100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n";

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