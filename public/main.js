$(document).ready(function(){
  var result;
  /*
  *Functions
  */
  function logIn(){
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

  function saveItem(callback){
    $.ajax({
      url: '/item',
      method: 'POST',
      data: $("input").serialize()
    }).done(function(data){
      result = data;
      callback();
    }).fail(function(){
      result = false;
      callback();
    });
  }

  /*
  *Event Listeners
  */
  $("form").submit(function(event){
    event.preventDefault();
    logIn();
  });

  $("td").dblclick(function(){
    var cell = $(this);
    value = $(this).html();
    name = $(this).attr('class');
    id = $('td:first', $(this).parents('tr')).text();
    $(this).html("<input id='editing' name='"+name+"' type='text' value='"+value+"'><input type='hidden' name='_id' value='"+id+"'>");
    $("#editing").focus();
    $("#editing").focusout(function(){
      saveItem(function(){
        if (result){
          console.log("What?!?"+result);
          cell.html(result);
        }
        else{
          console.log("This is f w..."+value);
          cell.html(value);
        }
      });
    });
  });
});
