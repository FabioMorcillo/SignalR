$(document).ready(function () {

    var chat = $.connection.chatHub;

    chat.client.broadcastMensagem = function (nome, mensagem) {

        var guardaNome = nome;
        var guardaMensagem = mensagem;

        if ( nome === "" )
        {
            $("#mensagemChat").append("<li>" + guardaMensagem + "</li>");
        }
        else
        {
            $("#mensagemChat").append("<li><strong>" + guardaNome + "</strong>&nbsp;&nbsp;" + guardaMensagem + "</li>");
        }

        var objDiv = document.getElementById("mensagemChat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    var nomePrompt = prompt("Qual seu nome: ", "");

    if ( nomePrompt === "" || !nomePrompt  )
    {
        alert("É necessário informar um nome !");

        window.location = "index.html";

        return;
    }
    else
    {
        $("#apelido").append("Bem vindo " + nomePrompt);
    }

    $("#mensagem").focus();

    

    $.connection.hub.start().done(

        function () {

            window.onbeforeunload = function (e) {
                chat.server.enviar("", "<font color=red>" + nomePrompt + " saiu do chat</font>");
            };


            chat.server.enviar("", "<font color=blue>" + nomePrompt + " entrou no chat</font>");

        $("#btnEnviar").click(function () {

            chat.server.enviar(nomePrompt, $("#mensagem").val())

            $("#mensagem").val("").focus();

        })

        // Validando o botão enter
        $(document).keypress(function (e)
        {
            if (e.which == 13)
            {
                chat.server.enviar(nomePrompt, $("#mensagem").val())

                $("#mensagem").val("").focus();
            }
        });


        })


    

})