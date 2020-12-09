let SESSION;
const user = new User();
const dummy = new Category();
const extra = new Extra();
const renderer = new Renderer();

// const callWeather=async()=>{
// const weather = await extra.getWeather(51.5074, 0.1278)
// console.log(weather)
// $('#weather').append(`<div><span class=temperature>${weather.temperature}&#8451</span>

//     <span><img class='condition-pic' src=${weather.conditionPic}></span>
//     <span class='condition-status'>${weather.condition}</span>
//  </div>`)}

// callWeather()

$("#link_to_register").on("click", function () {
  $("#register").modal({ dismissible: false });
  $("#register").modal("open");
  $("#login").modal("close");
});

$("#link_back_to_login").on("click", function () {
  $("#login").modal({ dismissible: false });
  $("#login").modal("open");
  $("#register").modal("close");
});

$("#form_login").on("submit", async () => {
  const loginData = {
    userName: $("#login_username").val(),
    password: $("#login_password").val(),
  };
  await user.LoginUser(loginData);
  return false;
});

$("#form_register").on("submit", async () => {
  const userData = {
    userName: $("#register_username").val(),
    password: $("#register_password").val(),
    isPublic: $("#ispublic_register").prop("checked"),
  };
  await user.RegisterUser(userData);
  return false;
});

const checkIfLoggedIn = async () => {
  const ses = await user.checkLog();
  if (ses.length !== 0) {
    SESSION = ses;
    viewByCategory();
  } else {
    $("#login").modal({ dismissible: false });
    $("#login").modal("open");
  }
};

$("#logout").on("click", function () {
  console.log("good");
  $.get("/sessionDelete", function (n) {
    location.reload();
  });
});

// login + continuous session done
const viewByCategory = async () => {
  const categoryName = $("#navs")
    .find(".active .menu_item_text")
    .text()
    .toLowerCase();
  const data = await dummy.get(categoryName, SESSION.userName);
  renderer.renderData(data, '#books-template')
};

$("#floating_addnew_item").on("click", function () {
  //TODO, add new item to current category
  const categoryName = $("#navs")
    .find(".active .menu_item_text")
    .text()
    .toLowerCase();
  $("#modal_add_book").modal();
  $("#modal_add_book").modal("open");
});

$("#settings").on("click", function () {
  //TODO
  console.log("settings");
});

$("#navs").on('click', '.remove-item', function () {
  const id = $(this).closest('#content').find("div").attr('data-id');
  const categoryName = $("#navs").find(".active .menu_item_text").text().toLowerCase();
  console.log(id)
  console.log(categoryName)
  dummy.remove(categoryName, id);
});

$("#btn_search").on("click", function () {
  //TODO
  console.log($("#txt_search").val());
});

$(".menu_item").on("click", function () {
  $(".menu_item").removeClass("active");
  $(this).addClass("active");
  //show category items
  viewByCategory();
});

$("#btn_find_book").on("click", async () => {
  const bookName = encodeURI($("#txt_find_book").val());
  const books = await extra.getBook(bookName)
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
  const book = await dummy.save("book", bookData);
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
    maximumAge: 0,
  };
  async function success(pos) {
    const crd = await pos.coords;
    console.log("Your current position is:");
    const weatherinfo = await extra.getWeather(crd.latitude, crd.longitude);
    setWeather(weatherinfo);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
};
currentWeather();
