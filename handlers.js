// ==================================================================================
// Handlers de los eventos webhooks admitidos por la plataforma de Facebook Messenger
// ==================================================================================

const apiHandler = require('./facebookAPIHandler');
const dictionary = require('./misc/dictionary');
const util = require('./misc/utils');
const e = require('./misc/enums');

const replies = require('./messages/replies');
const defaultMessages = require('./messages/defaultMessages');
const faq = require('./messages/faqMessages');

module.exports = {
   handleRequestControl: async function (sender_psid) {
      apiHandler.callThreadControlAPI(
         apiHandler.createAPIRequest('threadControl', sender_psid));
   },

   handleMessage: async function (sender_psid, received_message, messageData) {
      let messages;

      apiHandler.callSendAPI(apiHandler.createAPIRequest('mark_seen', sender_psid));
      apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));
     
      if (received_message.text) {
         if (received_message.quick_reply == undefined) {
            let coincidences = dictionary.getConcidences(received_message.text);

            console.log("Mensaje recibido: " + received_message.text);

            if (coincidences.status && coincidences.greeting) {
               let payload = coincidences.buttonsConfig[0].payload;
               await util.sendMessages(defaultMessages.getMessages(payload), sender_psid);
               await util.sendNextQuestions(sender_psid, payload, defaultMessages.getNextQuestion(payload));
            }
            else {
               await util.searchProduct(received_message.text, e.RepliesPayloads.PRODUCTOSENCONTRADOS, sender_psid);
            }
         }
         else {
            let recievedPayload = received_message.quick_reply.payload;
            
            switch (recievedPayload) {
               case e.RepliesPayloads.SIPRODUCTOS:
                  await util.sendMessages(replies.getMessages(recievedPayload), sender_psid);
                  break;
              

               case e.Default.ASESOR:
               case e.RepliesPayloads.NOPRODUCTOS:
                  await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);

                  if (util.getOfficeHours() != "true") {
                     await util.sendMessages([util.getOfficeHours()], sender_psid);
                  }

                  await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
                  break;
              default:
                  
                break;
            }
         }
      }
   },

   handlePostback: async function (sender_psid, received_postback, messageData) {
      let recievedPayload = received_postback.payload;
     
      apiHandler.callSendAPI(apiHandler.createAPIRequest('mark_seen', sender_psid));
      apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      switch (recievedPayload) {
         case e.Default.EMPEZAR:
            await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);
            await util.sendNextQuestions(sender_psid, recievedPayload, defaultMessages.getNextQuestion(recievedPayload));
            break;

         case e.Default.ASESOR:
            await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);

            if (util.getOfficeHours() != "true") {
               await util.sendMessages([util.getOfficeHours()], sender_psid);
            }

            await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
            break;
      }
   }
};