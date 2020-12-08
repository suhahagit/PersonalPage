class Renderer {
    constructor(){
    }

    renderData(data){
        content.empty();
        //TODO
        const template = Handlebars.compile($('#Data-template').html());
        content.append(template(data));
    }
}