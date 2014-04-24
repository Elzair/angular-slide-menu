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
	
	slideMenu.directive('asmSlideLeft', function($compile) {
	  return {
	      restrict: 'AEC'
	    , replace: true
	    , link: function(scope, element, attr) {
	        element[0].classList.add('asm');
	        element[0].classList.add('asm-horizontal');
	        element[0].classList.add('asm-left');
	      }
	  };
	});
	
	slideMenu.directive('asmSlideRight', function($compile) {
	  return {
	      restrict: 'AEC'
	    , replace: true
	    , link: function(scope, element, attr) {
	      element[0].classList.add('asm');
	      element[0].classList.add('asm-horizontal');
	      element[0].classList.add('asm-right');
	    }
	  };
	});
	
	slideMenu.directive('asmPushLeft', function($compile) {
	  return {
	      restrict: 'AEC'
	    , replace: true
	    , link: function(scope, element, attr) {
	        element[0].classList.add('asm');
	        element[0].classList.add('asm-horizontal');
	        element[0].classList.add('asm-left');
	      }
	  };
	});
	
	slideMenu.directive('asmPushRight', function($compile) {
	  return {
	      restrict: 'AEC'
	    , link: function(scope, element, attr) {
	        element[0].classList.add('asm');
	        element[0].classList.add('asm-horizontal');
	        element[0].classList.add('asm-right');
	      }
	  };
	});
	
	slideMenu.directive('asmWrapper', function($compile, $document) {
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
	});
	
	slideMenu.directive('asmControl', function($document, $compile) {
	  return {
	      restrict: 'AEC'
	    , require: '^asmWrapper'
	    , link: function(scope, element, attrs, asmWrapperCtrl) {
	        element[0].innerHTML = '<a href="#">'+element[0].innerHTML+'</a>';
	        element.find('a').bind('click', function(ev) {
	          ev.preventDefault();
	          asmWrapperCtrl.toggleOpen(element[0].dataset.push);
	        });
	        $compile(element.contents())(scope);
	      }
	  };
	});


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
		".asm-wrapper {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 10;\n}\n#asm-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 15;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.8);\n}\n.asm {\n  position: fixed;\n  z-index: 20;\n  overflow: hidden;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n/*ul\n    list-style-type none\n    margin 0\n    padding 0\n    text-align center*/\n}\n.asm-horizontal {\n  top: 0;\n  width: 300px;\n  height: 100%;\n/*li\n    display block*/\n}\n.asm-vertical {\n  left: 0;\n  width: 100%;\n  height: 100px;\n}\n.asm-closed {\n  left: 0;\n  top: 0;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-left {\n  left: -300px;\n}\n.asm-open .asm-left {\n  left: 0;\n}\n.asm-body-push-left {\n  left: 300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-right {\n  right: -300px;\n}\n.asm-open .asm-right {\n  right: 0;\n}\n.asm-body-push-right {\n  left: -300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-top {\n  top: -100px;\n}\n.asm-open .asm-top {\n  top: 0;\n}\n.asm-body-push-top {\n  top: 100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-bottom {\n  bottom: -100px;\n}\n.asm-open .asm-bottom {\n  bottom: 0;\n}\n.asm-body-push-bottom {\n  top: -100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n";

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