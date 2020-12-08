class Renderer{
    renderData = (data) => {
        const source = $('#content-div').html();
        const template = Handlebars.compile(source)
        let dataHTML = template({ data })
        $('#content-div').empty().append(citiesHTML)
    }
}