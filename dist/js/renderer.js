class Renderer {
    renderData(data, handlebarScript){
        console.log(data);
        console.log(handlebarScript);
        $('#content').empty();
        if (data.length !== 0){
            const template = Handlebars.compile($(handlebarScript).html());
            $('#content').append(template(data));
        }
    }
}