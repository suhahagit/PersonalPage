class User {
  constructor() {
    this.data = [];
  }

  async RegisterUser(registerationData) {
    await $.post("/user", registerationData);
  }

  async LoginUser(userName, password) {
    const userData = await $.get(`/user/${userName}/${password}`);
    this.data = userData;
  }

  async findUser(userName) {
    const userData = await $.get(`/user/${userName}`);
    this.data = userData;
  }

  async updateUser(userName) {
    await $.ajax({
      url: `/user/${userName}`,
      method: "PUT",
      success: () => {},
    });
  }
}

class Book {
  constructor() {
    this.data = [];
  }
  async getBooks(userName) {
    const booksData = await $.get(`/books/${userName}`);
    this.data = booksData;
  }

  async getBook(bookName) {
    const booksData = $.get(`/book/${bookName}`);
    this.data = booksData;
  }

  async saveBook(bookInfo) {
    await $.post("/book", bookInfo);
  }

  async removeBook(bookName) {
    await $.ajax({
      url: `/book/${bookName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }

  //   updateBook(bookName) {
  //     $.ajax({
  //       url: `/book/${bookName}`,
  //       type: "PUT",
  //       dataType: "json",
  //       success: function (book) {
  //         //TODO
  //       },
  //     });
  //   }
}

class Link {
  constructor() {
    this.data = [];
  }

  async getLinks(userName) {
    const linksData = await $.get(`/links/${userName}`);
    this.data = linksData;
  }

  async saveLink(linkName) {
    await $.post("/link", linkName);
  }

  async removeLink(linkName) {
    await $.ajax({
      url: `/link/${linkName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Note {
  constructor() {
    this.data = [];
  }

  async getNotes(userName) {
    const notesData = await $.get(`/notes/${userName}`);
    this.data = notesData;
  }

  async saveNote(noteName) {
    await $.post("/note", noteName);
  }

  async removeNote(noteName) {
    await $.ajax({
      url: `/note/${noteName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Photo {
  constructor() {
    this.data = [];
  }

  async getPhotos(userName) {
    const pictures = await $.get(`/pictures/${userName}`);
    this.data = pictures;
  }

  async savePhoto(photoName) {
    await $.post("/picture", photoName);
  }

  async removePhoto(photoName) {
    await $.ajax({
      url: `/picture/${photoName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Quote {
  constructor() {
    this.data = [];
  }

  async getQuotes(userName) {
    const quotesData = await $.get(`/quotes/${userName}`);
    this.data = quotesData;
  }

  async saveQuote(quoteName) {
    await $.post("/quote", quoteName);
  }

  async removeQuote(quoteName) {
    await $.ajax({
      url: `/quote/${quoteName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Recipe {
  constructor() {
    this.data = [];
  }

  async getRecipes(userName) {
    const recipesData = await $.get(`/recipes/${userName}`);
    this.data = recipesData;
  }

  async saveRecipe(recipeName) {
    await $.post("/recipe", recipeName);
  }

  async removeRecipe(recipeName) {
    await $.ajax({
      url: `/recipe/${recipeName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Restaurant {
  constructor() {
    this.data = [];
  }

  async getRestaurants(userName) {
    const restaurantsData = await $.get(`/restaurants/${userName}`);
    this.data = restaurantsData;
  }

  async saveRestaurant(restaurantName) {
    await $.post("/restaurant", restaurantName);
  }

  async removeRestaurant(restaurantName) {
    await $.ajax({
      url: `/restaurant/${restaurantName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Video {
  constructor() {
    this.data = [];
  }

  async getVideos(userName) {
    const videosData = await $.get(`/videos/${userName}`);
    this.data = videosData;
  }

  async saveVideo(videoName) {
    await $.post("/video", videoName);
  }

  async removeVideo(videoName) {
    await $.ajax({
      url: `/video/${videoName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}

class Movie {
  constructor() {
    this.data = [];
  }

  async getMovies(userName) {
    const moviesData = await $.get(`/movies/${userName}`);
    this.data = moviesData;
  }

  async saveMovie(movieName) {
    await $.post("/video", movieName);
  }

  async removeMovie(movieName) {
    await $.ajax({
      url: `/video/${movieName}`,
      method: "DELETE",
      success: () => {
        alert("Deleted");
      },
    });
  }
}