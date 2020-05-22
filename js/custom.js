function loadPage(url){
    $.get(url).then(
        function(response){
            $("main").html(response);
        }
    );
}
function home(){
    document.title = "Pinturas em Indaial | Zé Pintor";
    loadPage("partials/home.html");    
    window.scrollTo(0,0);
    restoreButton();
}
function restoreButton(){
    document.getElementById("left-button").onclick = function(){
    contact();
    };
    document.getElementById('left-button-icon').className = '';
    document.getElementById("left-button-icon").classList.add('icon');
    document.getElementById("left-button-icon").classList.add('mif-news');
    document.getElementById("left-button-text").innerHTML = "Solicitar orçamento";
}
function services(){
    document.title = "Zé Pintor | Serviços";
    loadPage("partials/services.html");
    window.scrollTo(0,0);
    restoreButton();
}
function about(){
    document.title = "Zé Pintor | Sobre";
    loadPage("partials/about.html");
    window.scrollTo(0,0);
    restoreButton();
}
function contact(){
    document.title = "Zé Pintor | Contato";
    loadPage("partials/contact.html");
    window.scrollTo(0,0);
    document.getElementById("left-button-icon").classList.remove('mif-news');
    document.getElementById("left-button-icon").classList.add('mif-chevron-thin-up');
    document.getElementById("left-button-text").innerHTML="Enviar Orçamento";
    document.getElementById("left-button").onclick=function(){
        submitRequest();
    };
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
            home();
        } else {
            Metro.infobox.create("<h1>Opss...</h1><p>Alguma coisa deu errada, verifique se você não enviou um formulário vazio ;)</p>", "bg-darkCrimson fg-white");
        }
    };
    xhr.send(data);
}
