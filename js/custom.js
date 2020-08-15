function loadPage(url, hashtag){
    if (hashtag == null){
        hashtag = '';
    }
    $('main').load(url).then(
        function(){
            makeAnimations();
            location.hash = hashtag;
            if ($('button').hasClass('active')){
                $(".hamburger").fire('click');
            }
            document.getElementById('formulary').reset();
        }
    )
}
function loadRandomPage(){
    var pages = ["wood", "paintings", "roof", "plaster"];
    var index = Math.floor(Math.random() * 4);
    var funcName = pages[index];
    Metro.utils.exec(funcName);
}
function makeAnimations(){
    $('.fadein').fadeIn();
    window.scrollTo(0,0);
}
function home(){
    document.title = "Pinturas em Indaial | Zé Pintor";
    loadPage('/partials/home.html');
    changeNavbarLinks(false);
}
function wood(){
    document.title = "Zé Pintor | Madeira";
    loadPage("partials/wood.html");
    changeNavbarLinks(true);
}
function paintings(){
    document.title = "Zé Pintor | Pinturas";
    loadPage("partials/paintings.html");
    changeNavbarLinks(true);
}
function roof(){
    document.title = "Zé Pintor | Telhado";
    loadPage('partials/roof.html');
    changeNavbarLinks(true);
}
function plaster(){
    document.title = "Zé Pintor | Gesso";
    loadPage('partials/plaster.html');
    changeNavbarLinks(true);
}
function about(){
    document.title = "Zé Pintor | Sobre";
    loadPage("partials/home.html", 'about');
    changeNavbarLinks(false);
}
function contact(){
    document.title = "Zé Pintor | Contato";
    loadPage('partials/home.html', 'contact');
    changeNavbarLinks(false);
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
function darkenNavbar(){
    var height = $(window).height() - 30;
    if (document.body.scrollTop > height || document.documentElement.scrollTop > height){
        $('#navbar').removeClass('bg-transparent');
        $('#navbar').addClass('bg-dark');
    } else {
        $('#navbar').removeClass('bg-dark');
        $('#navbar').addClass('bg-transparent'); 
    }
}
function changeNavbarLinks(boolean){
    if(boolean){
        $('#link1').attr('href', 'javascript:home();');
        $('#link2').attr('href', 'javascript:contact();');
        $('#link3').attr('href', 'javascript:about();');
    } else {
        $('#link1').attr('href', '#home');
        $('#link2').attr('href', '#contact');
        $('#link3').attr('href', '#about'); 
    }
}
function formatTelephone(e){
    var tel = e.value;
    if (tel.length === 2){
        document.forms[0].telefone.value = "(" + tel + ") ";
        return true;
    }
}
home();
$(window).on('scroll', function(){darkenNavbar()});
