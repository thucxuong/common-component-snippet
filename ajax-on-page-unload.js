// Sending ajax on page unload excepts button click for redirection
// test up
jQuery(document).ready(function($){
  window.flag = false;
  var unloadHandler = function(){
    $.ajax({
      type: "POST",
      url: url,
      data: $("form").serializeArray(),
      async: false
      // async false will make it work on IE8
    });
    if(!flag){
      return 'Do you want to leave this page ?';
    }else{
      return;
    }
  };

  $("button").on('click', function(e){
    e.preventDefault();
    flag = true;
  })

  window.onbeforeunload = unloadHandler;
});