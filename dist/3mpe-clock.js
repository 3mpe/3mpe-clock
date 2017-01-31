/*
 * 3mpe-clock v1.0.0
 * https://github.com/3mpe/3mpe-clock
 * 
 * (c) 2017 Emre Vatansever <vatanseveremre90@gmail.com> (https://github.com/3mpe)
*/

	angular.module('3mpe.constants', [])
	.constant('moment', window.moment);
	
	
	angular.module('3mpe.directive')
	  .directive('ng3mpeClock', function ($timeout, $interval, moment) {
	    return {
	      scope: {
	        title:'@',
	        categorys:'@'
	      },
	      restrict: 'E',
	      template: './template/clock.html',
	      link: function (scope, iElm, iAttrs) {
	        
	        // second
	        $interval(function () {
	          var seconds = new Date().getSeconds();
	          var sdegree = seconds * 6;
	          var srotate = "rotate(" + sdegree + "deg)";
	
	          var sec = $(iElm).find('#sec');
	          sec.css({ "-moz-transform": srotate, "-webkit-transform": srotate });
	        }, 1000);
	
	        //hour
	        $interval(function () {
	          var hours = new Date().getHours();
	          var mins = new Date().getMinutes();
	          var hdegree = hours * 30 + (mins / 2);
	          var hrotate = "rotate(" + hdegree + "deg)";
	
	          var hour = $(iElm).find('#hour');
	          hour.css({ "-moz-transform": hrotate, "-webkit-transform": hrotate });
	        }, 1000);
	
	        // minute
	        $intrval(function () {
	          var mins = new Date().getMinutes();
	          var mdegree = mins * 6;
	          var mrotate = "rotate(" + mdegree + "deg)";
	
	          var min = $(iElm).find('#min');
	          min.css({ "-moz-transform": mrotate, "-webkit-transform": mrotate });
	        }, 1000);
	      }
	    };
	  })
	
	
	angular.module('3mpe', [
	  	'3mpe.constants',
	  	'3mpe.directive'  	
	  ]);
	
	