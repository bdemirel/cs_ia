$(document).ready(function(){
  function login(toBeSent){
    $.ajax({
      url: '/login',
      method: 'POST',
      data: toBeSent
    }).done(function(){
      //write on page
    });
  }
});
