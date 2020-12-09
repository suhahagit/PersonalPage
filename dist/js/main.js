var session;

//login popup upon loading page
const loginModal = () => {
  $("#login").modal({dismissible: false});
  $("#login").modal('open');
};

const checkIfLoggedIn = () => {
    $.get('/session', function(ses){
        if (ses.length !== 0)
            session = ses;
        else
            loginModal();
    });
};



$("cocoumber").on("click", () => {
  const category = $("#nav").find(".active .menu_item_text").val();
  switch (category) {
    case "Book":
      // form popup
      break;
    case "Video":
      // code block
      break;
    case "Movie":
      // code block
      break;
    case "Photo":
      // code block
      break;
    case "Quote":
      // code block
      break;
    case "Recipe":
      // code block
      break;
    case "Restaurant":
      // code block
      break;
    case "Note":
      // code block
      break;
    case "Link":
      // code block
      break;
    default:
    // code block
  }
});


$("#link_to_register").on('click', function(){
    $("#register").modal({dismissible: false});
    $("#register").modal('open');
    $("#login").modal('close');
});

$("#link_back_to_login").on('click', function(){
    $("#login").modal({dismissible: false});
    $("#login").modal('open');
    $("#register").modal('close');
});

$("#form_login").on('submit', function(){
    const jsonData = {userName: $("#login_username").val(), password: $("#login_password").val()};
    $.post('/user/login', jsonData, function(user){
        if (user.length !== 0){
            Notify.success({
                title : 'Welcome!',
                html : `Welcome back ${user.userName}`
            });
            $("#login").modal('close');
        }
        else{
            Notify.error({
                title : 'Invalid Data',
                html : 'Invalid username or password!'
            });
        }
    });
    return false;
});

$("#form_register").on('submit', function(){
    const jsonData = {userName: $("#register_username").val(), password: $("#register_password").val(), isPublic: $("#ispublic_register").prop('checked')};

    $.post('/user/register', jsonData, function(user){
        if (user.length !== 0){
            Notify.success({
                title : 'Registration Complete!',
                html : `Welcome ${user.userName}`
            });
            $("#register").modal('close');
            $("#login").modal('open');
        }
        else{
            Notify.error({
                title : 'Failed to register',
                html : 'Invalid data or user is already taken!'
            });
        }
    });
    return false;
});


checkIfLoggedIn();