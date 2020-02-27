function openInNewTab(url) {
    window.location = url;
}
function openFormulary() {
    var path = "/partials/form.txt";
    location.hash = +1;
    $.get(path).then(
            function (response) {
                displayDialog(response);
            });
}
;
function displayDialog(formulary) {
    Metro.dialog.create({
        title: "Solicite seu orçamento sem compromisso =)",
        content: formulary,
        actions: [
            {
                caption: "Cancelar",
                cls: "js-dialog-close default",
                onclick: function () {
                    console.log("Formulário de orçamento fechado");
                }
            },
            {
                caption: "Enviar",
                cls: "js-dialog-close light",
                onclick: function () {
                    submitRequest();
                }
            }
        ],
        onShow: function () {
            var el = $(this);
            el.addClass("ani-swoopInTop");
            setTimeout(function () {
                el.removeClass("ani-swoopInTop");
            }, 500);
        },
        onHide: function () {
            console.log("hide");
            var el = $(this);
            el.addClass("ani-swoopOutTop");
            setTimeout(function () {
                el.removeClass("ani-swoopOutTop");
            }, 5000);
        }
    });
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
        } else {
            Metro.infobox.create("<h1>Opss...</h1><p>Alguma coisa deu errada, verifique se você não enviou um formulário vazio ;)</p>", "alert");
        }
    };
    xhr.send(data);
}