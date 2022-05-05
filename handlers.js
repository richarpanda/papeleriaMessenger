// ==================================================================================
// Handlers de los eventos webhooks admitidos por la plataforma de Facebook Messenger
// ==================================================================================

const apiHandler = require('./facebookAPIHandler');
const dictionary = require('./misc/dictionary');
const util = require('./misc/utils');
const e = require('./misc/enums');

const quickRepCollege = require('./messages/quickReplies/college');
const quickRepHighSchool = require('./messages/quickReplies/highSchool');
const defaultMessages = require('./messages/defaultMessages');
const faq = require('./messages/textMessage/faqMessages');

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
            let lastBotMessage = messageData.messages.data[1].message;
            let validateLastMessage = dictionary.validateLastMessage(lastBotMessage);
            let coincidences = dictionary.getConcidences(received_message.text);

            console.log("Mensaje recibido: " + received_message.text);
            console.log("Ultimo mensaje del Bot: " + lastBotMessage);

            if (coincidences.status && coincidences.greeting) {
               let payload = coincidences.buttonsConfig[0].payload;
               await util.sendMessages(defaultMessages.getMessages(payload), sender_psid);
               await util.sendNextQuestions(null, sender_psid, payload, defaultMessages.getNextQuestion(payload));
            }
            else if (coincidences.status) {
               util.sendNextButtonQuestions(sender_psid, coincidences.buttonsConfig,
                  defaultMessages.getNextQuestion(e.Default.PREGUNTAS))
            }
            else {
               if(validateLastMessage.status)
               {
                  await util.sendMessages(defaultMessages.getMessages(null), sender_psid);

                  if (validateLastMessage.modality == e.Modality.HISHSCHOOL) {
                     await util.sendNextQuestions(e.Modality.HISHSCHOOL, sender_psid, validateLastMessage.enumStep,
                        quickRepHighSchool.getNextQuestion(validateLastMessage.enumStep));
                  }
                  else if (validateLastMessage.modality == e.Modality.COLLEGE) {
                     await util.sendNextQuestions(e.Modality.COLLEGE, sender_psid, validateLastMessage.enumStep,
                        quickRepCollege.getNextQuestion(validateLastMessage.enumStep));
                  }
               }
               else  
                  await util.sendNextQuestions(null, sender_psid, null, defaultMessages.getNextQuestion(null));
            }
         }
         else {
            let recievedPayload = received_message.quick_reply.payload;
            
            switch (recievedPayload) {
               //#region FLUJO PREPA EN LINEA
               case e.HighSchoolSpeechStep.PRIMERBLOQUE:
                  await util.sendMessages(quickRepHighSchool.getMessages(recievedPayload), sender_psid);
                  await util.sendNextQuestions(e.Modality.HISHSCHOOL, sender_psid, recievedPayload,
                     quickRepHighSchool.getNextQuestion(recievedPayload));
                  break;

               case e.HighSchoolSpeechStep.RESPAGOSPEQUEÑOS:
               case e.HighSchoolSpeechStep.RESUNAEXHIBICION:
                  await util.sendMessages(quickRepHighSchool.getMessages(recievedPayload), sender_psid);
                  await util.sendMessages(quickRepHighSchool.getMessages(e.HighSchoolSpeechStep.SEGUNDOBLOQUE), sender_psid);
                  await util.sendNextQuestions(e.Modality.HISHSCHOOL, sender_psid, e.HighSchoolSpeechStep.SEGUNDOBLOQUE,
                      quickRepHighSchool.getNextQuestion(e.HighSchoolSpeechStep.SEGUNDOBLOQUE));
                  break;

               case e.HighSchoolSpeechStep.RESINICIA:
               case e.HighSchoolSpeechStep.RESNOINICIA:
                  await util.sendMessages(quickRepHighSchool.getMessages(recievedPayload), sender_psid);
                  await util.sendNextQuestions(e.Modality.HISHSCHOOL, sender_psid, recievedPayload,
                     quickRepHighSchool.getNextQuestion(recievedPayload));

                  if (util.getOfficeHours() != "true") {
                     await util.sendMessages([util.getOfficeHours()], sender_psid);
                  }

                  await apiHandler.callThreadControlAPI(apiHandler.createAPIRequest('threadControl', sender_psid));
                  break;
               //#endregion

               //#region FLUJO UNIVERSIDAD EN LINEA
               case e.QuestionsPack.UNILINEA:
                  await util.sendNextQuestions(e.Modality.COLLEGE, sender_psid, e.CollegeSpeechStep.CARRERAS, 
                     quickRepCollege.getNextQuestion(e.CollegeSpeechStep.CARRERAS));
                  break;

               case e.CollegeSpeechStep.DERECHO:
               case e.CollegeSpeechStep.PSICOLOGIA:
               case e.CollegeSpeechStep.ADMINISTRACION:
                  await util.sendMessages(quickRepCollege.getMessages(recievedPayload), sender_psid);
                  await util.sendNextQuestions(e.Modality.COLLEGE, sender_psid, recievedPayload,
                     quickRepCollege.getNextQuestion(recievedPayload));
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

   handlePostback: async function (sender_psid, received_postback, messageData) {
      let recievedPayload = received_postback.payload;
     
      apiHandler.callSendAPI(apiHandler.createAPIRequest('mark_seen', sender_psid));
      apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

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
         case e.Messages.SEP:
         case e.Messages.REVALIDACION:
         case e.Messages.CERTIFICADOUNI:
         case e.Messages.UNIINSCRIPCION:
         case e.Messages.REQUISITOS:
         case e.Messages.CARRERAS:
         case e.Messages.HORARIOS:
         case e.Messages.COMPRA:
         case e.Messages.SECUNDARIA:
         case e.Messages.FRAUDE:
         case e.Messages.FECHASINIPREP:
         case e.Messages.FECHASINIUNI:
         case e.Messages.EXTRA:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;

         case e.Messages.UBICACION:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextMediaQuestions(sender_psid, e.MediaAttachments.UBICACIONIMG, e.MediaTypes.IMAGE);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;

         case e.Messages.COSTOS:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextMediaQuestions(sender_psid, e.MediaAttachments.COSTOSIMAGE, e.MediaTypes.IMAGE);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;

         case e.Messages.TEL:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextMediaQuestions(sender_psid, e.MediaAttachments.WHATSAPPIMG, e.MediaTypes.IMAGE);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;

         case e.Messages.VALIDEZ:
            await util.sendMessages(faq.getMessages(recievedPayload), sender_psid);
            await util.sendNextMediaQuestions(sender_psid, e.MediaAttachments.SOBREIPEIMG, e.MediaTypes.IMAGE);
            await util.sendNextQuestions(null, sender_psid, recievedPayload, faq.getNextQuestion(recievedPayload));
            break;
      }
   }
};