const loginModal = function(){

};

const checkIfLoggedIn = function(){
    //TODO local storage
    const isValidUser = false; //call a function to check if we have a valid user in local storage
    if (!isValidUser){
        //showLoginModal();
    }
};

const handleSearch = async function(){
    //TODO
    console.log("hi");
};

const loadPage = async function(){
    //TODO
    checkIfLoggedIn();
};


const txtSearch = $("#txt_search"),
    btnSearch = $("#btn_search");

btnSearch.on('click', handleSearch);
$(".dropdown-trigger").dropdown();

loadPage();