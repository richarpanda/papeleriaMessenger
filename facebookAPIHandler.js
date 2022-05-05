// ==================================================================================
// Maneja el envio de peticion a los distintos metodos de la API de Facebook.
// ==================================================================================

// Developer Test Page
const PAGE_ACCESS_TOKEN = "EAANahtgwPY4BADBQeBfJwaM2IEdmvv2PxfURS0RBEPj1fOcu7WjEQW2yrrCNWpA2d3p5o98RWh2ZAFUDBS23iEta6dVTWszZAp8JixaL3qzTDClJCstxktXdZBs6DkHf6htJ55byTHNcIo6U1HzvC21iGOTJQEFhsU8dZCIiE4qKFX0aKFL84JKzwnadbEoZD"
// IPEI
//const PAGE_ACCESS_TOKEN = 'EAANahtgwPY4BADVRe6ATdZCqBewYEZCxzoAXlmdVIxHRm3lf9PZBsHlHMOWEmX5Md7SyZAVkSA5I09rZCZBHEqK7bziGG5CEiyQcSRYowa6aeZBxxI5UblZAQHcjMyen6y9pZCDUd0mFB7DDEGLZAZAaydeaKnVBhtj8lXDlsa86rjmUsZCC1FwB1JrrBQo6HIcbZBxsZD';
                              
const request = require('request');
const target_app_id = 263902037430900;

module.exports = {
   // Envia una peticion a la API de messages
   callSendAPI: async function (request_body) {
      return new Promise((resolve, reject) => {
         request({
            "uri": "https://graph.facebook.com/v4.0/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
         }, (err, res, body) => {
            if (res.statusCode == 200)
               resolve({ status: true, message: "Mensaje enviado" });
            else
               resolve({
                  status: false, message: 'Status Code: ' + res.statusCode + ' | '
                     + 'Request: ' + JSON.stringify(request_body) + ' | '
                     + 'Body: ' + JSON.stringify(res.body)
               });
         });
      });
   },

   // Envia una peticion a la API de thread Control
   callThreadControlAPI: async function (request_body) {
      return new Promise((resolve, reject) => {
         request({
            "uri": "https://graph.facebook.com/v2.6/me/pass_thread_control",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
         }, (err, res, body) => {
            if (res.statusCode == 200)
               resolve({ status: true, message: "Recibidor secundario asignado" });
            else
               resolve({
                  status: false, message: 'Status Code: ' + res.statusCode + ' | '
                     + 'Request: ' + JSON.stringify(request_body) + ' | '
                     + 'Body: ' + JSON.stringify(res.body)
               });
         });
      })
   },

   // Envia una petición a la API Graph de Facebook
   callAPIGraph: async function (requestStr) {
      return new Promise((resolve, reject) => {
         request({
            "uri": "https://graph.facebook.com/v8.0/me/" + requestStr,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET"
         }, (err, res, body) => {
            if (res.statusCode == 200)
               resolve({ status: true, message: "Completado", body: res.body });
            else
               resolve({
                  status: false, message: 'Status Code: ' + res.statusCode + ' | '
                     + 'Body: ' + JSON.stringify(res.body)
               });
         });
      })
   },

   // Genera la peticion que se le hara a la Send API
   createAPIRequest: function (requestOption, sender_psid, response = null) {
      let request_body;
      switch (requestOption) {
         case 'message':
            return request_body = {
               "recipient": {
                  "id": sender_psid
               },
               "message": response
            }

         case 'mark_seen':
         case 'typing_on':
         case 'typing_off':
            return request_body = {
               "recipient": {
                  "id": sender_psid
               },
               "sender_action": requestOption
            }

         case 'threadControl':
            return request_body = {
               "recipient": { "id": sender_psid },
               "target_app_id": target_app_id,
               "metadata": "Favor de atender al siguiente cliente"
            }
      }
   },

   // Genera la plantilla para enviar mensaje de respueta rapida
   getQuickReplyTemplate: function (messageText, repliesConfig) {
      return JSON.stringify({
         text: messageText,
         quick_replies: repliesConfig
      });
   },

   // Genera la plantilla para enviar mensaje de tipo boton
   getButtonTemplate: function (messageText, buttonsConfig) {
      return JSON.stringify({
         attachment: {
            type: "template",
            payload: {
               template_type: "button",
               text: messageText,
               buttons: buttonsConfig
            }
         }
      });
   },

   // Genera una plantilla para enviar mensajes multimedia
   getMediaTemplate: function (attachmentId, mediaType) {
      return JSON.stringify({
         attachment: {
            type: "template",
            payload: {
               template_type: "media",
               elements: [
                  {
                     media_type: mediaType,
                     attachment_id: attachmentId
                  }
               ]
            }
         }
      });
   },

   // Genera el request para obtener mensajes por Id
   getMessagesByIdRequest: function (id) {
      return "conversations?fields=message_count,snippet,id,updated_time,unread_count,messages.limit(2){message}&user_id=" + id;
   }
}