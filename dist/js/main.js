let SESSION;

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
  const jsonData = {
      userName: $("#login_username").val(),
      password: $("#login_password").val()
  };
  $.post('/user/login', jsonData, function (user){
    if (user.length !== 0) {
        Notify.success({
          title: 'Welcome User',
          html: `Welcome back ${user.userName} :)`
        });
        $("#login").modal('close');
        checkIfLoggedIn();
    } else {
        Notify.error({
          title: 'Invalid Data',
          html: 'Invalid username or password!'
        });
    }
  });
  return false;
});

$("#form_register").on('submit', function(){
  const jsonData = {
    userName: $("#register_username").val(),
    password: $("#register_password").val(),
    isPublic: $("#ispublic_register").prop('checked')
  };

  $.post('/user/register', jsonData, function(user){
    if (user.length !== 0) {
        Notify.success({
          title: 'Registration Complete!',
          html: `Welcome ${user.userName}`
        });
        $("#register").modal('close');
        $("#login").modal('open');
    } else {
        Notify.error({
          title: 'Failed Registration',
          html: 'Invalid data or user is already taken!'
        });
    }
  });
  return false;
});

const viewByCategory = function(){
    //TODO add new item in X categories
    const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
    $.get(`/${categoryName}/${SESSION.userName}`, function(result) {
    if (result.length !== 0){
        new Renderer().renderData(result, "#" + categoryName + "-template");
        return result;
    }
    else
        return null;
    });
};

const checkIfLoggedIn =()=>{
  $.get('/session', function (ses){
      if (ses.length !== 0){
        SESSION = ses;
        viewByCategory();
      }
      else {
        $("#login").modal({dismissible: false});
        $("#login").modal('open');
      }
  });
};

$("#floating_addnew_item").on('click', function(){
    //TODO, add new item to current category
    const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
    switch (categoryName) {
        case "books":
            $("#modal_add_book").modal();
            $("#modal_add_book").modal('open');
            break;

        case "links":
            $("#modal_add_link").modal();
            $("#modal_add_link").modal('open');
            break;

        case "movies":
            $("#modal_add_movie").modal();
            $("#modal_add_movie").modal('open');
            break;

        case "serieses":
            $("#modal_add_series").modal();
            $("#modal_add_series").modal('open');
            break;

        case "videos":
            $("#modal_add_video").modal();
            $("#modal_add_video").modal('open');
            break;

        case "notes":
            $("#modal_add_note").modal();
            $("#modal_add_note").modal('open');
            break;

        case "pictures":
            $("#modal_add_picture").modal();
            $("#modal_add_picture").modal('open');
            break;

        case "quotes":
            $("#modal_add_quote").modal();
            $("#modal_add_quote").modal('open');
            break;

        case "recipes":
            $("#modal_add_recipe").modal();
            $("#modal_add_recipe").modal('open');
            break;

        case "restaurants":
            $("#modal_add_restaurant").modal();
            $("#modal_add_restaurant").modal('open');
            break;
    }
});

$("#settings").on('click', function(){
    //TODO
    alert("settings");
});

$("#navs").on('click', '.remove-item', function(){
    //TODO
    const id = $(this).closest('#content').find("div").attr('data-id');
    console.log(id);
    const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
    console.log(categoryName);
    //dummy.remove(categoryName, id);
    console.log("must remove this item");
});

$("#btn_search").on('click', function(){
  //TODO
  alert($("#txt_search").val());
});

$(".menu_item").on('click', function(){
    $(".menu_item").removeClass("active");
    $(this).addClass("active");
    //show category items
    viewByCategory();
});

$("#logout").on('click', function(){
    console.log("good");
    $.get('/sessionDelete', function(n) {
        location.reload();
    });
});

$("#btn_find_book").on('click', function(){
    const bookName = encodeURI($("#txt_find_book").val());
    $.get(`/book/${bookName}`, function(books){
      if (books.length !== 0){
          $("#add_book_title").val(books[0].title);
          $("#add_book_author").val(books[0].author[0]);
          if (books[0].description)
            $("#add_book_description").val(books[0].description);
          if (books[0].thumbnail)
            $("#add_book_thumbnail").val(books[0].thumbnail);
      }
  });
});

$("#form_modal_add_book").on('submit', function(){
    const jsonData = {
        title: $("#add_book_title").val(),
        author: $("#add_book_author").val(),
        description: $("#add_book_description").val(),
        thumbnail: $("#add_book_thumbnail").val(),
        userName: SESSION.userName
    };
    $.post('/book', jsonData, function(book){
      if (book.length !== 0) {
          Notify.success({
            title: 'Book Added',
            html: `"${book.title}" has been successfully added.`
          });
          $("#modal_add_book").modal('close');
      } else {
          Notify.error({
            title: 'Invalid Data',
            html: 'Invalid parameters!'
          });
      }
    });
    return false;
});

$("#form_modal_add_movie").on('submit', function(){
  const jsonData = {
      title: $("#add_movie_title").val(),
      plot: $("#add_movie_plot").val(),
      year: $("#add_movie_year").val(),
      pic: $("#add_movie_pic").val(),
      rate: $("#add_movie_rate").val(),
      userName: SESSION.userName
  };
  $.post('/movie', jsonData, function(movie){
    if (movie.length !== 0) {
        Notify.success({
          title: 'Movie Added',
          html: `"${movie.title}" has been successfully added.`
        });
        $("#modal_add_movie").modal('close');
    } else {
        Notify.error({
          title: 'Invalid Data',
          html: 'Invalid parameters!'
        });
    }
  });
  return false;
});

$("#form_modal_add_series").on('submit', function(){
  const jsonData = {
      title: $("#add_series_title").val(),
      plot: $("#add_series_plot").val(),
      year: $("#add_series_year").val(),
      pic: $("#add_series_pic").val(),
      rate: $("#add_series_rate").val(),
      userName: SESSION.userName
  };
  $.post('/series', jsonData, function(series){
    if (series.length !== 0) {
        Notify.success({
          title: 'Series Added',
          html: `"${series.title}" has been successfully added.`
        });
        $("#modal_add_series").modal('close');
    } else {
        Notify.error({
          title: 'Invalid Data',
          html: 'Invalid parameters!'
        });
    }
  });
  return false;
});


$(".dropdown-trigger").dropdown();
checkIfLoggedIn();