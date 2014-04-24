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
        this.toggleOpen = function() {
          $element[0].classList.toggle('asm-open');
          $element[0].classList.toggle('asm-closed');
          switch($attrs.push) {
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
          asmWrapperCtrl.toggleOpen();
        });
        $compile(element.contents())(scope);
      }
  };
});
