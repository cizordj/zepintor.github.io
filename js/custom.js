function loadPage(url){
    return $('main').load(url);
}
function home(){
    document.title = "Pinturas em Indaial | Zé Pintor";
    $("main").html(Metro.storage.getItem("home"));
    renderPrimaryPage();
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
        $('#link2').attr('href', 'javascript:about();');
    } else if(!boolean) {
        $('#link1').attr('href', '#home');
        $('#link2').attr('href', '#about'); 
    }
}
function clearHash(){
    window.location.hash='';
}
function loadRandomPage(){
    var pages = ["wood", "paintings", "roof", "plaster"];
    var index = Math.floor(Math.random() * 4);
    var funcName = pages[index];
    const isTheSamePage =
        window.location.hash === '#' + pages[index];
    isTheSamePage ? loadRandomPage() : Metro.utils.exec(funcName);
}

function renderSecondaryPage(){
    makeAnimations();
    collapseNavbar();
    swapNavbarLinks(true);
}

function wood(){
    document.title = "Zé Pintor | Madeira";
    window.location.hash='wood';
    loadPage("partials/wood.html").then(renderSecondaryPage);
}
function paintings(){
    document.title = "Zé Pintor | Pinturas";
    window.location.hash='paintings';
    loadPage("partials/paintings.html").then(renderSecondaryPage);
}
function roof(){
    document.title = "Zé Pintor | Telhado";
    window.location.hash='roof';
    loadPage('partials/roof.html').then(renderSecondaryPage);
}
function plaster(){
    document.title = "Zé Pintor | Gesso";
    window.location.hash='plaster';
    loadPage('partials/plaster.html').then(renderSecondaryPage);
}
function about(){
    home();
    document.title = "Zé Pintor | Sobre";
    window.location.hash = 'about';
}
function showBillOfSaleDialog() {
  Metro.dialog.create({
    title: "Sobre emissão de nota fiscal",
    content: "<p>Emitimos nota fiscal de mão de obra para empresas prestarem suas contas, em nome de pessoa física. "+
    "Sinta-se livre para buscar mais informações através do WhatsApp no botão ao lado.</p>",
    closeButton: true
  });
}
Metro.storage.setItem('home', $("main").html());
renderPrimaryPage();
