$(document).ready(function(){
  /*
  *Functions
  */
  function log_in(){
    $.ajax({
      url: '/login',
      method: 'POST',
      data: $("form").serialize()
    }).done(function(res){
      if(res.auth){
        Cookies.set('jwt', res.token);
        window.location.reload();
      }
      else{
        $('#msg').text("Unexpected error!");
      }
    }).fail(function(res){
      if(!res.auth){
        $('#msg').text("Wrong username or password!");
      }
      else{
        $('#msg').text("Unexpected error!");
      }
    });
  }

  /*
  *Event Listeners
  */
  $("form").submit(function(event){
    event.preventDefault();
    log_in();
  });
});
