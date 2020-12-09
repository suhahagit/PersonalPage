class Renderer {
    renderData(data, handlebarScript){
        $('#content').empty();
        if (data.length !== 0){
            const template = Handlebars.compile($(handlebarScript).html());
            $('#content').append(template(data));
        }
    }
}