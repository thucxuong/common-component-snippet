function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Usage
var myEfficientFn = debounce(function() {
  // All the taxing stuff you do
}, 250);
window.addEventListener('resize', myEfficientFn);







function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done! 
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date())  0;
    },
    function() {
        // Done, success callback
    },
    function() {
        // Error, failure callback
    }
);







function once(fn, context) { 
  var result;

  return function() { 
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

// Usage
var canOnlyFireOnce = once(function() {
  console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada




var getAbsoluteUrl = (function() {
  var a;

  return function(url) {
    if(!a) a = document.createElement('a');
    a.href = url;

    return a.href;
  };
})();




var isDevice = {
  Android: navigator.userAgent.match(/Android/i)!=null, 
  BlackBerry: navigator.userAgent.match(/BlackBerry/i)!=null, 
  iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i)!=null, 
  Opera: navigator.userAgent.match(/Opera Mini/i)!=null, 
  Windows: navigator.userAgent.match(/IEMobile/i)!=null
};
isDevice.any = (isDevice.Android || isDevice.BlackBerry || isDevice.iOS || isDevice.Opera || isDevice.Windows);
isDevice.mobile = isDevice.any && (window.outerWidth < 768 && window.outerHeight < 768);
isDevice.tablet = isDevice.any && (window.outerWidth > 768 || window.outerHeight > 768);
isDevice.desktop = !isDevice.any && (window.outerWidth > 1024 || window.outerHeight > 1024);
