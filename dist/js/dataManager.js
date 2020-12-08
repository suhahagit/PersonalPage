class DataManager {
    constructor(){
        this.data = [];
    }

    RegisterUser(){
        //TODO
    }

    LoginUser(){
        //TODO
    }
}

class Book extends DataManager {
    getBooks(userName){
        $.get(`/books/${userName}`, function(books){
            //TODO
        });
    }

    getBook(bookName){
        $.get(`/book/${bookName}`, function(book){
            //TODO
        });
    }

    saveBook(bookName){
        $.post('/book', bookName, function(book){
            if (book.length !== 0){
                //TODO
                this.data.push(book);
            }
        });
    }

    removeBook(bookName){
        $.ajax({
            url: `/book/${bookName}`,
            type: 'DELETE',
            dataType: 'json',
            success: function(book){
                //TODO
            }
        });
    }

    updateBook(bookName){
        $.ajax({
            url: `/book/${bookName}`,
            type: 'PUT',
            dataType: 'json',
            success: function(book){
                //TODO
            }
        });
    }
}
