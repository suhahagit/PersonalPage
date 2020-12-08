const { get } = require("jquery");

//login popup upon loading page
const loginModal = () => {
  $("#login-pop").modal("show");
};

const checkIfLoggedIn = () => {
  const userName = $("#login-txt").val();
  const password = $("#pass-txt").val();
  // if(call loginUser function and validate)
  // then continue
};

//search for user, and display their items (req: public)
const searchUser = async () => {
  const userName = $("#search-txt").val();
  $("#search-txt").val("");
  // call find user function
  //render user on page
};

//load page upon login using UName
const loadCategory = async () => {
  //render cat
};

const login = async () => {
  checkIfLoggedIn();
  loadCategory(); // books
  //main page
};

const logout = async () => {
  //send back to login form
};

const signUp = async () => {
  const userName = $("#user-sign").val();
  const password = $("#pass-sign").val();
  //make new user + pass info, to add to DB
  //redirect to login form
};


//loadpage indexhtml + loadcategory

//onclick(function)

//const getDate = () => { }

$("cocoumber").on("click", () => {
  const category = $("#nav").find(".active .menu_item_text").val();
  switch (category) {
    case Book:
      // form popup
      break;
    case Video:
      // code block
      break;
    case Movie:
      // code block
      break;
    case Photo:
      // code block
      break;
    case Quote:
      // code block
      break;
    case Recipe:
      // code block
      break;
    case Restaurant:
      // code block
      break;
    case Note:
      // code block
      break;
    case Link:
      // code block
      break;
    default:
    // code block
  }
});

const addBook = () => {};

//eventlistener addObj - json
//json -> post
