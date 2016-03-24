using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebApplication1
{
    public class ChatHub : Hub
    {
        public void enviar(string nome, string mensagem)
        {
            if ( mensagem.Length > 0 )
            {
                Clients.All.broadcastMensagem(nome, mensagem);
            }
        }
    }
}