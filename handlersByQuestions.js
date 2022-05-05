// ==================================================================================
// Handlers de los eventos webhooks admitidos por la plataforma de Facebook Messenger
// ==================================================================================

const apiHandler = require('./facebookAPIHandler');
const dictionary = require('./misc/dictionary');
const util = require('./misc/utils');
const e = require('./misc/enums');

const init = require('./buttons/initButtons');

const quickRepCollege = require('./messages/quickReplies/college');
const quickRepHighSchool = require('./messages/quickReplies/highSchool');
const defaultMessages = require('./messages/defaultMessages');
const faq = require('./messages/textMessage/faqMessages');

module.exports = {
   // Maneja el evento de 'messaging handover'
   handleRequestControl: async function (sender_psid) {
      apiHandler.callThreadControlAPI(
         apiHandler.createAPIRequest('threadControl', sender_psid));
   },

   // Maneja eventos de tipo 'messages'
   handleMessage: async function (sender_psid, received_message) {
      let messages;

      apiHandler.callSendAPI(apiHandler.createAPIRequest('mark_seen', sender_psid));
      apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      if (received_message.text) {
         if (received_message.quick_reply == undefined) {
            let coincidences = dictionary.getConcidences(received_message.text);

            if (coincidences.status && coincidences.greeting) {
               let payload = coincidences.buttonsConfig[0].payload;
               await util.sendMessages(defaultMessages.getMessages(payload), sender_psid);
               await util.sendNextQuestions(null, sender_psid, payload, defaultMessages.getNextQuestion(payload));
            }
            else if (coincidences.status) {
               util.sendNextButtonQuestions(sender_psid, coincidences.buttonsConfig, defaultMessages.getNextQuestion(e.Default.PREGUNTAS))
            }
            else {
               await util.sendMessages(defaultMessages.getMessages(null), sender_psid);
               await util.sendNextQuestions(null, sender_psid, null, defaultMessages.getNextQuestion(null));
            }
         }
         else {
            let recievedPayload = received_message.quick_reply.payload;
            switch (received_message.quick_reply.payload) {
               //#region FLUJO PREPA EN LINEA
               case e.QuestionsPack.PREPALINEA:
               case e.QuestionsPack.COMOFUNCIONA:
               case e.QuestionsPack.CONOCERCOSTOS:
               case e.QuestionsPack.SOBRECERTIFICADO:
               case e.QuestionsPack.FORMASPAGO:
               case e.QuestionsPack.FECHASINGRESO:
               case e.QuestionsPack.REQUISITOSINSCRIPCION:
                  await util.sendMessages(quickRepHighSchool.getMessages(recievedPayload), sender_psid);
                  await util.sendNextQuestions(e.Modality.HISHSCHOOL, sender_psid, recievedPayload, quickRepHighSchool.getNextQuestion(recievedPayload));
                  break;
               //#endregion

               //#region FLUJO UNIVERSIDAD EN LINEA
               case e.QuestionsPack.UNILINEA:
                  messages = ['Con gusto le brindo más información de este sistema',
                     'La Universidad en línea IPEI es un modelo de estudios flexible con VALIDEZ OFICIAL que le permite estudiar en los horarios que mejor se adapten a su ritmo de vida,',
                     'De modo que no tendrá que conectarse específicamente a un horario para tomar clases. ',
                     'Este programa tendrá una duración de 2 años y lo podrá cursar COMPLETO desde su teléfono celular, tableta o computadora, tanto temarios de estudio, así como exámenes los presentará en línea. ',
                     'Aquí usted cursara un total de *6 cuatrimestres*, presentando una materia cada quince días,',
                     'Tendrá temarios de estudio y cuestionarios de apoyo durante toda la semana y al termino de cada semana presentara un examen,',
                     'Siendo así un total de 2 exámenes por cada materia.     ',
                     'Todos los exámenes que presentara son de opción múltiple y en caso de que no apruebe podrá volver a presentarlo sin pagar un costo adicional (solamente durante el fin de semana). ',
                     'Nuestros programas son de *titulación directa* de modo que NO requerirá presentar un examen final de conocimientos o tesis. ',
                     'Al concluir con su carrera recibirá su carta de pasante para poder iniciar labores profesionales.',
                     'En un momento un asesor se comunicara contigo para brindarte mas información sobre este sistema. Favor de esperar.'];

                  await util.sendMessages(messages, sender_psid);
                  await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
                  break;
               //#endregion

               case e.Default.ASESOR:
                  await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);

                  if (util.getOfficeHours() != "true") {
                     await util.sendMessages([util.getOfficeHours()], sender_psid);
                  }

                  await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
                  break;
            }
         }
      }
   },

   // Maneja eventos de tipo 'messaging_postbacks'
   handlePostback: async function (sender_psid, received_postback) {
      let recievedPayload = received_postback.payload;

      apiHandler.callSendAPI(apiHandler.createAPIRequest('mark_seen', sender_psid));
      apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      // Inserta la respuesta basandose en el payload del postback
      switch (recievedPayload) {
         case e.Default.EMPEZAR:
            await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, defaultMessages.getNextQuestion(recievedPayload));
            break;

         case e.Default.ASESOR:
            await util.sendMessages(defaultMessages.getMessages(recievedPayload), sender_psid);

            if (util.getOfficeHours() != "true") {
               await util.sendMessages([util.getOfficeHours()], sender_psid);
            }

            await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
            break;

         case e.Messages.PREPA:
         case e.Messages.PAGO:
         case e.Messages.EXPEDICION:
         case e.Messages.SOLOPAGO:
         case e.Messages.DOCUMENTACION:
         case e.Messages.PAIS:
         case e.Messages.PERFIL:
         case e.Messages.VALIDEZ:
         case e.Messages.REVALIDACION:
         case e.Messages.CERTIFICADOUNI:
         case e.Messages.UNIINSCRIPCION:
         case e.Messages.REQUISITOS:
         case e.Messages.CARRERAS:
         case e.Messages.UBICACION:
         case e.Messages.HORARIOS:
         case e.Messages.COMPRA:
         case e.Messages.SECUNDARIA:
         case e.Messages.FRAUDE:
         case e.Messages.FECHASINIPREP:
         case e.Messages.FECHASINIUNI:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;

         case e.Messages.COSTOS:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextMediaQuestions(sender_psid, "330871928215871", e.MediaTypes.IMAGE);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;
      }
   }
};