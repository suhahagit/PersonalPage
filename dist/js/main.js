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

const currentWeather = () => {
    async function success(pos){
      const coords = await pos.coords;
      const weatherInfo = await getAPIs.getWeather(coords.latitude, coords.longitude);
      $("#weather").append(`<b>${weatherInfo.temperature}°C</b>`);
    }

    navigator.geolocation.getCurrentPosition(success);
};

// login + continuous session done
const viewByCategory = async () => {
    const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
    const data = await categoryInfo.get(categoryName, SESSION.userName);
    const count = await categoryInfo.getCount(categoryName);
    renderer.renderData(data, "#" + categoryName + "-template", count, categoryName);
    $("#menu_username").text(SESSION.userName);
    setTimeout(currentWeather, 2000);
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
  const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
  await categoryInfo.remove(categoryName, id);
  viewByCategory();
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
  const bookData = {
    title: $("#add_book_title").val(),
    author: $("#add_book_author").val(),
    description: $("#add_book_description").val(),
    thumbnail: $("#add_book_thumbnail").val(),
    userName: SESSION.userName
  };

  const book = await categoryInfo.save("book", bookData);
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

$("#form_modal_add_link").on("submit", async () => {
  const linkData = {
    title: $("#add_link_title").val(),
    link: $("#add_link").val(),
    description: $("#add_link_description").val(),
    userName: SESSION.userName
  };
  const link = await categoryInfo.save("link", linkData);
  if (link.length !== 0) {
    Notify.success({
      title: "Link Added",
      html: `"${link.title}" has been successfully added.`,
    });
    $("#modal_add_link").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});


$("#form_modal_add_note").on("submit", async () => {
  const noteData = {
    title: $("#add_note_title").val(),
    note: $("#add_note").val(),
    userName: SESSION.userName
  };
  const note = await categoryInfo.save("note", noteData);
  if (note.length !== 0) {
    Notify.success({
      title: "Note Added",
      html: `"${note.title}" has been successfully added.`,
    });
    $("#modal_add_note").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$("#form_modal_add_picture").on("submit", async () => {
  const pictureData = {
    title: $("#add_picture_title").val(),
    description: $("#add_picture_description").val(),
    pic: $("#add_picture").val(),
    userName: SESSION.userName
  };
  const picture = await categoryInfo.save("picture", pictureData);
  if (picture.length !== 0) {
    Notify.success({
      title: "Picture Added",
      html: `"${picture.title}" has been successfully added.`,
    });
    $("#modal_add_picture").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$("#form_modal_add_quote").on("submit", async () => {
  const quoteData = {
    quote: $("#add_quote_title").val(),
    author: $("#add_quote_author").val(),
    userName: SESSION.userName
  };
  const quote = await categoryInfo.save("quote", quoteData);
  if (quote.length !== 0) {
    Notify.success({
      title: "Quote Added",
      html: `"${quote.author}" has been successfully added.`,
    });
    $("#modal_add_quote").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$("#form_modal_add_recipe").on("submit", async () => {
  const recipeData = {
    name: $("#add_recipe_title").val(),
    description: $("#add_recipe_description").val(),
    pic: $("#add_recipe_photo").val(),
    userName: SESSION.userName
  };
  const recipe = await categoryInfo.save("recipe", recipeData);
  if (recipe.length !== 0) {
    Notify.success({
      title: "Recipe Added",
      html: `"${recipe.name}" has been successfully added.`,
    });
    $("#modal_add_recipe").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$("#form_modal_add_restaurant").on("submit", async () => {
  const restaurantData = {
    name: $("#add_restaurant_title").val(),
    description: $("#add_restaurant_description").val(),
    city: $("#add_restaurant_description").val(),
    pic: $("#add_restaurant_photo").val(),
    userName: SESSION.userName
  };
  const restaurant = await categoryInfo.save("restaurant", restaurantData);
  if (restaurant.length !== 0) {
    Notify.success({
      title: "Restaurant Added",
      html: `"${restaurant.name}" has been successfully added.`,
    });
    $("#modal_add_restaurant").modal("close");
  } else {
    Notify.error({
      title: "Invalid Data",
      html: "Invalid parameters!",
    });
  }
  return false;
});

$(".dropdown-trigger").dropdown();
checkIfLoggedIn();