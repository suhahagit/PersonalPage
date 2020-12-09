let SESSION;
const user = new User();
const categoryInfo = new Category();
const getAPIs = new APIs();
const renderer = new Renderer();

$("#link_to_register").on("click", function () {
  $("#register").modal({
    dismissible: false
  });
  $("#register").modal("open");
  $("#login").modal("close");
});

$("#link_back_to_login").on("click", function () {
  $("#login").modal({
    dismissible: false
  });
  $("#login").modal("open");
  $("#register").modal("close");
});

$("#form_login").on("submit", async () => {
  const loginData = {
    userName: $("#login_username").val(),
    password: $("#login_password").val()
  };
  await user.LoginUser(loginData);
  return false;
});

$("#form_register").on("submit", async () => {
  const userData = {
    userName: $("#register_username").val(),
    password: $("#register_password").val(),
    isPublic: $("#ispublic_register").prop("checked")
  };
  await user.RegisterUser(userData);
  return false;
});

// const viewByCategory = function(){
//     const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
//     $.get(`/${categoryName}/${SESSION.userName}`, function(result) {
//     if (result.length !== 0){

//         return result;
//     }
//     else
//         return null;
//     });
// };

// login + continuous session done
const viewByCategory = async () => {
    const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
    const data = await categoryInfo.get(categoryName, SESSION.userName);
    const count = await categoryInfo.getCount(categoryName);
    renderer.renderData(data, "#" + categoryName + "-template", count, categoryName);
    $("#menu_username").text(SESSION.userName);
};

const checkIfLoggedIn = async () => {
  const ses = await user.checkLog();
  if (ses.length !== 0) {
    SESSION = ses;
    viewByCategory();
  } else {
    $("#login").modal({
      dismissible: false
    });
    $("#login").modal("open");
  }
};

$("#logout").on("click", function () {
  console.log("good");
  $.get("/sessionDelete", function (n) {
    location.reload();
  });
});

$("#floating_addnew_item").on('click', function () {
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

$("#settings").on('click', function () {
  //TODO
  alert("settings");
});

$("#navs").on('click', '.remove-item', async function () {
  const id = $(this).closest('#content').find("div").attr('data-id');
  console.log(id);
  const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
  console.log(categoryName);
  await categoryInfo.remove(categoryName, id);
  // const count = await categoryInfo.getCount(categoryName)
  // renderer.renderData(data, "#" + categoryName + "-template", count, categoryName);
  viewByCategory()
});

$("#btn_search").on("click", function () {
  //TODO
  alert($("#txt_search").val());
});

$(".menu_item").on("click", function () {
  $(".menu_item").removeClass("active");
  $(this).addClass("active");
  //show category items
  viewByCategory();
});

$("#btn_find_book").on("click", async () => {
  const bookName = encodeURI($("#txt_find_book").val());
  const books = await getAPIs.getBook(bookName)
  $("#add_book_title").val(books[0].title);
  if (books[0].author) $("#add_book_author").val(books[0].author[0]);
  if (books[0].description)
    $("#add_book_description").val(books[0].description);
  if (books[0].thumbnail) $("#add_book_thumbnail").val(books[0].thumbnail);
});

$("#form_modal_add_book").on("submit", async () => {
  const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
  const bookData = {
    title: $("#add_book_title").val(),
    author: $("#add_book_author").val(),
    description: $("#add_book_description").val(),
    thumbnail: $("#add_book_thumbnail").val(),
    userName: SESSION.userName
  };
  const book = await categoryInfo.save("book", bookData);
  // const count = await categoryInfo.getCount(categoryName)
  // renderer.renderData(data, "#" + categoryName + "-template", count, categoryName);
  viewByCategory();
  if (book.length !== 0) {
    Notify.success({
      title: "Book Added",
      html: `"${book.title}" has been successfully added.`,
    });
    $("#modal_add_book").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$("#form_modal_add_movie").on('submit', function () {
  const jsonData = {
    title: $("#add_movie_title").val(),
    plot: $("#add_movie_plot").val(),
    year: $("#add_movie_year").val(),
    pic: $("#add_movie_pic").val(),
    rate: $("#add_movie_rate").val(),
    userName: SESSION.userName
  };

  $.post('/movie', jsonData, function (movie) {
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

$("#form_modal_add_series").on('submit', function () {
  const jsonData = {
    title: $("#add_series_title").val(),
    plot: $("#add_series_plot").val(),
    year: $("#add_series_year").val(),
    pic: $("#add_series_pic").val(),
    rate: $("#add_series_rate").val(),
    userName: SESSION.userName
  };
  $.post('/series', jsonData, function (series) {
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

//real-time weather
const setWeather = async (weather) => {
  $("#weather")
    .append(`<div><span class=temperature>${weather.temperature}&#8451</span>
             <span><img class='condition-pic' src=${weather.conditionPic}></span>
    </div>`);
};
const currentWeather = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  async function success(pos) {
    const crd = await pos.coords;
    const weatherinfo = await getAPIs.getWeather(crd.latitude, crd.longitude);
    setWeather(weatherinfo);
  }

  function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
};

currentWeather();