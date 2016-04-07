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

  function saveEdit(callback){
    $.ajax({
      url: '/item',
      method: 'POST',
      data: $("input#editing").serialize()
    }).done(function(data){
      result = data;
      callback();
    }).fail(function(){
      result = false;
      callback();
    });
  }

  function saveNew(){
    $.ajax({
      url: '/item',
      method: 'PUT',
      data: $("input:not(#editing)").serialize()
    }).done(function(){
      window.location.reload();
    }).fail(function(){
      alert("Error saving value!");
    });
  }
  /*
  *Event Listeners
  */
  $("form").submit(function(event){
    event.preventDefault();
    logIn();
  });

  $("td:not(._id)").dblclick(function(){
    var cell = $(this);
    value = $(this).html();
    name = $(this).attr('class');
    id = $('td:first', $(this).parents('tr')).text();
    $(this).html("<input id='editing' name='"+name+"' type='text' value='"+value+"'><input type='hidden' name='_id' value='"+id+"'>");
    $("#editing").focus();
    $("#editing").focusout(function(){
      saveEdit(function(){
        if (result){
          cell.html(result);
        }
        else{
          cell.html(value);
        }
      });
    });
  });

  $(document).keypress(function(e){
    if (e.which == 13){
      $('#editing').focusout();
    }
  });

  $("button#new").click(function(){
    $("tr:last").after("<tr><td><button class='save'>Save</button></td><td><input type='text' placeholder='Description' name='info'></td><td><input type='text' placeholder='Sitiuation' name='sit'></td></tr>");
    $(this).css({"display":"none"});
    $("button.save").click(function(){
      saveNew();
      $("button#new").css({"display":"inline"});
    });
  });

});
