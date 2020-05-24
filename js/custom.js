function changePage(){
    if ($('button').hasClass('active')){
        console.log('button has true value, that is, it is active');
        $(".hamburger").fire('click');
    }
    var hash = window.location.hash.substring(1);
    var a=new Function(hash+"();");
    a.apply(null);
}
function loadPage(url){
    $.get(url).then(
        function(response){
            $("main").html(response);
            doAnimations();
            window.scrollTo(0,0);
        }
    );
}
function home(){
    document.title = "Pinturas em Indaial | Zé Pintor";
    loadPage("partials/home.html");
    resetBottomBar();
}
function resetBottomBar(){
    $('#left-button').on('click', function(e){
        window.location.hash = "contact";
    });
    $('#left-button-icon').clearClasses();
    $('#left-button-icon').addClass('icon mif-news');
    $('#left-button-text').innerText('Solicitar orçamento');
}
function doAnimations(){
    $('.fadein').fadeIn();
}
function services(){
    document.title = "Zé Pintor | Serviços";
    loadPage("partials/services.html");
    resetBottomBar();
}
function about(){
    document.title = "Zé Pintor | Sobre";
    loadPage("partials/about.html");
    resetBottomBar();
}
function contact(){
    document.title = "Zé Pintor | Contato";
    loadPage("partials/contact.html");
    $('#left-button-icon').removeClass('mif-news');
    $('#left-button-icon').addClass('mif-chevron-thin-up');
    $('#left-button-text').innerText('Enviar pedido');
    $('#left-button').on('click', function(e){
        submitRequest();
    });
}
function whatsapp(){
    var url = "https://wa.me/5547991673021";
    window.open(url, '_blank');
}
function submitRequest() {
    var method = document.getElementById("formulary").method;
    var data = new FormData(document.getElementById("formulary"));
    var url = document.getElementById("formulary").action;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE)
            return;
        if (xhr.status === 200) {
            Metro.infobox.create("<h1>Pedido enviado com sucesso!</h1><p>A sua solicitação foi efetuada com sucesso, assim que pudermos retornaremos o mais breve possível.</p>", "success");
            window.location.hash="home";
        } else {
            Metro.infobox.create("<h1>Opss...</h1><p>Alguma coisa deu errada, verifique se você não enviou um formulário vazio ;)</p>", "bg-darkCrimson fg-white");
        }
    };
    xhr.send(data);
}
