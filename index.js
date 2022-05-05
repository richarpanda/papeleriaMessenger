// ==================================================================================
// Proyecto WebHook para messenger de IPEI
// ==================================================================================

'use strict';

// Importacion de dependencias y del servidor HTTP
const
   express = require('express'),
   body_parser = require('body-parser'),
   handler = require('./handlers'),
   app = express().use(body_parser.json()); // creates express http server

const apiHandler = require('./facebookAPIHandler');

// Inserta el puerto del servidor y escribe un mensaje en el log en caso de exito
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Configuracion para aceptar peticiones POST desde el extremo /webhook
app.post('/webhook', (req, res) => {

   let body = req.body;

   // Se verifica que el evento del webhook proviene de una pagina suscrita
   if (body.object === 'page') {
      // Realiza una iteracion sobre cada entrada, puede haber varias si se agrupan.
      body.entry.forEach(function (entry) {
         let webhook_event = null;

         if (entry.standby == undefined) {
            webhook_event = entry.messaging[0];

            // Se obtiene el PSID (Page Specified Identifier) del remitente
            let sender_psid = webhook_event.sender.id;
            
            // Valida que no tenga mensajes existentes, 
            apiHandler.callAPIGraph(apiHandler.getMessagesByIdRequest(sender_psid))
               .then(messageValidationResponse => {
                  let messages = JSON.parse(messageValidationResponse.body);
                  
                  // Se obtiene y valida el tipo de evento
                  if (webhook_event.message) {
                     handler.handleMessage(sender_psid, webhook_event.message, messages.data[0]);
                  }
                  else if (webhook_event.postback) {
                     handler.handlePostback(sender_psid, webhook_event.postback, messages.data[0]);
                  }
                  else if (webhook_event.request_thread_control) {
                     handler.handleRequestControl(sender_psid);
                  }
               });
         }
      });

      res.status(200).send('EVENT_RECEIVED');

   } else {
      res.sendStatus(404);
   }

});


// Configuracion para aceptar peticiones GET desde el extremo /webhook
app.get('/webhook', (req, res) => {

   const VERIFY_TOKEN = "1P31BOTT0K3N";

   let mode = req.query['hub.mode'];
   let token = req.query['hub.verify_token'];
   let challenge = req.query['hub.challenge'];

   if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

         console.log('WEBHOOK_VERIFIED');
         res.status(200).send(challenge);

      } else {
         res.sendStatus(403);
      }
   }
});
