/* Bling.js */
window.$ = document.querySelectorAll.bind( document );

Node.prototype.on = window.on = function( name, fn ) {
  this.addEventListener( name, fn );
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function( name, fn ) {
  this.forEach( function( elem, i ) {
    elem.on( name, fn );
  } );
};

function namespacing( namespacStr ) {
  var NSArr = namespacStr.split( "." );
  var tempObj = window;
  for ( var i = 0, len = NSArr.length; i < len; i++ ) {
    tempObj[ NSArr[ i ] ] = tempObj[ NSArr[ i ] ] || {};
    tempObj = tempObj[ NSArr[ i ] ];
  }
  tempObj = 0;
}

( function() {
  namespacing( "util" );

  util.insertAfter = function( newNode, referenceNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
  };

  util.hasClass = function( elm, className ) {
    return ( " " + elm.className + " " ).indexOf( " " + className + " " ) > -1;
  };

  util.addClass = function( elm, className ) {
    if ( !util.hasClass( elm, className ) ) {
      if ( elm.classList )
      elm.classList.add( className );
      else
      elm.className += " " + className;
    }
  };

  util.removeClass = function( elm, className ) {
    if ( util.hasClass( elm, className ) ) {
      elm.className = elm.className.replace( new RegExp( "(^|\\s)" + className + "(\\s|$)" ), " " ).replace( /\s$/, "" );
    }
  };

  namespacing( "browsersCheck" );
  var htmlEle = document.querySelector( "html" );
  browsersCheck.isIE8 = navigator.userAgent.indexOf( "MSIE 8" ) >= 0;
  browsersCheck.isIE8 && util.addClass( htmlEle, "IE8" );
  browsersCheck.isTouchDevice = "ontouchstart" in document.documentElement;
  !browsersCheck.isTouchDevice && util.addClass( htmlEle, "no-touch" );

} )();

// Start navigation
document.addEventListener( "DOMContentLoaded", function() {
  window.navigation = ( function() {
    "use strict";
    var view = document.querySelector( ".navigation" );
    
    var slideUp = function(parentLi){
      util.removeClass( parentLi, "expanded" );
      var childrenLevel = parentLi.querySelector('.level');
      if(childrenLevel){
        childrenLevel.style.height = 0;
        parentLi.expanded = false;
      }
    };
    
    var slideDown = function(parentLi){
      util.addClass( parentLi, "expanded" );
      var childrenLevel = parentLi.querySelector('.level');
      if(childrenLevel){
        childrenLevel.style.height = parentLi.querySelector('ul').offsetHeight + "px";
        parentLi.expanded = true;
      }
    };
    
    var toogleSubLevel = function( e ) {
      e.preventDefault();
      var parentLi = this.parentNode.parentNode;
      if ( parentLi.expanded ) {
        slideUp(parentLi);
      }else {
        parentLi.parentNode.querySelectorAll(".expanded").forEach(function(el){
          if(parentLi !== el){
            slideUp(el);
          }
        });
        slideDown(parentLi);
      }
    };
    
    var navigation = {
      addMobileToggler: function() {
        if ( !browsersCheck.isIE8 ) {
          view.querySelectorAll( "li" ).forEach( function( liItem ) {
              if(liItem.querySelector('ul')===null)
                  return;
              liItem.expanded = false;
              var btn = document.createElement( "button" );
              btn.setAttribute( "class", "sub-menu-toggler closed" );
              btn.innerHTML = "<span class='open-icon'>+</span><span class='close-icon'>-</span>";
              var itemLink = liItem.querySelector( "a" );
              btn.on( "click", toogleSubLevel );
              itemLink.appendChild( btn );
            } );
        }
      },
      init: function() {
        navigation.addMobileToggler();
        
        window.on('resize', function(){
          view.querySelectorAll('.level li').forEach(function(el){
            slideUp(el);
          });
        });
        
        document.on('click', function(){
          view.querySelectorAll('li').forEach(function(el){
            slideUp(el)
          });
        });
       
        view.on('click', function(e){
          e.stopPropagation();
        });
        
        return navigation;
      }
    };

    return navigation.init();
  }() );
} );
