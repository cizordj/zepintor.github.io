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
function wood(){
    document.title = "Zé Pintor | Madeira";
    loadPage("partials/wood.html");
    resetBottomBar();
}
function paintings(){
    document.title = "Zé Pintor | Pinturas";
    loadPage("partials/paintings.html");
    resetBottomBar();
}
function roof(){
    document.title = "Zé Pintor | Telhado";
    loadPage('partials/roof.html');
    resetBottomBar();
}
function plaster(){
    document.title = "Zé Pintor | Gesso";
    loadPage('partials/plaster.html');
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
function randomPage(){
    var pages = ["wood", "paintings", "roof", "plaster"];
    var index = Math.floor(Math.random() * 4);
    var hash = pages[index];
    window.location.hash = hash;
}
function submitRequest(){
    var form = document.getElementById('formulary');
    var headers = { Accept: 'application/json' };
    $.ajax({url: form.action,
        method: form.method,
        data: form,
        headers: headers
    }).then(
        function(response){
            Metro.infobox.create("<h1>Pedido enviado com sucesso!</h1><p>A sua solicitação foi efetuada com sucesso, assim que pudermos retornaremos o mais breve possível.</p>", "success");
            window.location.hash="home";
            form.reset();
        },
        function(xhr){
            Metro.infobox.create("<h1>Opss...</h1><p>Alguma coisa deu errada, verifique se você não enviou um formulário vazio ;)</p>", "bg-darkCrimson fg-white");
        }
    );
}
(function init(){
    $(window).on('hashchange', function(){
        changePage();
    });
    if (window.location.hash){
        changePage();
    } else {
        window.location.hash='home';
    }
})();
