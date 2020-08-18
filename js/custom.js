function loadPage(url){
    return $('main').load(url);
}
function home(){
    document.title = "Pinturas em Indaial | Zé Pintor";
    loadPage('/partials/home.html').then(
        function(){
            renderPrimaryPage();
        }
    )
}
function renderPrimaryPage(){
    makeAnimations();
    collapseNavbar();
    swapNavbarLinks(false);
    clearHash();
}
function makeAnimations(){
    $('.fadein').fadeIn();
    window.scrollTo(0,0);
}
function collapseNavbar(){
    if ($('button').hasClass('active')){
        $(".hamburger").fire('click');
    }
}
function swapNavbarLinks(boolean){
    if(boolean){
        $('#link1').attr('href', 'javascript:home();');
        $('#link2').attr('href', 'javascript:contact();');
        $('#link3').attr('href', 'javascript:about();');
    } else if(!boolean) {
        $('#link1').attr('href', '#home');
        $('#link2').attr('href', '#contact');
        $('#link3').attr('href', '#about'); 
    }
}
function clearHash(){
    window.location.hash='';
}
function loadRandomPage(){
    var pages = ["wood", "paintings", "roof", "plaster"];
    var index = Math.floor(Math.random() * 4);
    var funcName = pages[index];
    Metro.utils.exec(funcName);
}
function wood(){
    document.title = "Zé Pintor | Madeira";
    loadPage("partials/wood.html").then(
        function(){
            renderSecondaryPage();
        }
    )
}
function renderSecondaryPage(){
    makeAnimations();
    collapseNavbar();
    swapNavbarLinks(true);
    clearHash();
}
function paintings(){
    document.title = "Zé Pintor | Pinturas";
    loadPage("partials/paintings.html").then(
        function(){
            renderSecondaryPage();
        }
    )
}
function roof(){
    document.title = "Zé Pintor | Telhado";
    loadPage('partials/roof.html').then(
        function(){
            renderSecondaryPage();
        }
    )
}
function plaster(){
    document.title = "Zé Pintor | Gesso";
    loadPage('partials/plaster.html').then(
        function(){
            renderSecondaryPage();
        }
    )
}
function about(){
    document.title = "Zé Pintor | Sobre";
    loadPage("partials/home.html").then(
        function(){
            renderPrimaryPage();
            location.hash = 'about';
        }
    )
}
function contact(){
    document.title = "Zé Pintor | Contato";
    loadPage('partials/home.html').then(
        function(){
            renderPrimaryPage();
            location.hash = 'contact';
        }
    )
}
function submitForm(){
    var form = document.getElementById('formulary');
    var headers = { Accept: 'application/json' };

    $.ajax({url: 'https://formspree.io/mdozalpk',
        method: form.method,
        data: form,
        headers: headers
    }).then(
        function(response){
            Metro.infobox.create("<h1>Pedido enviado com sucesso!</h1><p>A sua solicitação foi efetuada com sucesso, assim que pudermos retornaremos o mais breve possível.</p>", "success");
            form.reset();
            window.location.hash="home";
        },
        function(xhr){
            Metro.infobox.create("<h1>Opss...</h1><p>Alguma coisa deu errada, verifique se não faltou preencher mais nada.</p>", "bg-darkCrimson fg-white");
        }
    );
}
function formatTelephone(e){
    var tel = e.value;
    if (tel.length === 0){
        e.value = '(' + tel;
        return true;
    } else if (tel.length === 3){
        e.value = tel + ') ';
        return true;
    } else if (tel.length === 9){
        if (e.value["5"] != "9"){
            e.value = tel + "-";
            e.maxLength = 14;
        }
        return true;
    } else if (tel.length === 10){
        if (e.value["5"] == "9"){
            e.value = tel + "-";
            e.maxLength = 15;
        }
        return true;
    }
}
home();
