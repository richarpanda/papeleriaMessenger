// ==================================================================================
// Utilidades de la aplicación
// ==================================================================================

const e = require('../misc/enums');
const apiHandler = require('../facebookAPIHandler');
const onlineHighSchoolButtons = require('../buttons/onlineHighSchoolButtons');
const onlineCollegeButtons = require('../buttons/onlineCollegeButtons');
const init = require('../buttons/initButtons');

const sleep = () => {
   return new Promise(function (resolve) {
      setTimeout(resolve, 750);
   });
};

module.exports = {
   // Envia un lote de mensajes seguidos
   sendMessages: async function (messagesArr, sender_psid) {
      for await (let msg of messagesArr) {
         let response = null;
         response = { "text": msg }

         await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

         await sleep();

         await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, response))
            .then(res => console.log(res));
      }
   },

   // Envia el siguiente lote de preguntas con respuesta rapída
   sendNextQuestions: async function (modality, sender_psid, dataConfig, message) {
      let buttons;

      switch (modality) {
         case e.Modality.HISHSCHOOL:
            buttons = onlineHighSchoolButtons.getQuestion(dataConfig);
            break;
         case e.Modality.COLLEGE:
            buttons = onlineCollegeButtons.getQuestion(dataConfig);
            break;
         case e.Modality.FAQ:
         default:
            buttons = init.getInitialButtons()
            break;
      }

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getQuickReplyTemplate(message, buttons)))
         .then(res => console.log(res));
   },

   // Envia el siguiente lote de preguntas con botón
   sendNextButtonQuestions: async function (sender_psid, dataConfig, message) {
      let buttons = dataConfig;
      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getButtonTemplate(message, buttons)))
         .then(res => console.log(res));
   },

   // Envia el siguiente lote de preguntas multimedia
   sendNextMediaQuestions: async function (sender_psid, attachmentId, mediaType) {
      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getMediaTemplate(attachmentId, mediaType)))
         .then(res => console.log(res));
   },

   // Obtiene el horario de atencion
   getOfficeHours: function () {
      const day = new Date(new Date().toUTCString()).getDay();
      const hour = module.exports.convertUtcToLocalTime(
         new Date(new Date().toUTCString()).getHours());

      let message = true;

      if (day != 0) {
         if (hour >= 14 && hour <= 16) { // Horario de comida.
            message = "Nuestros asesores se encuentran en horario de comida, su mensaje sera atendido en cuanto regresen.";
         }
         else if (hour < 10) { // Horario antes de incio de horarios de atención.
            message = "Nuestros asesores aun no entran en horario de atencion, su mensaje sera antendido a partir de las 10 am."
         }
         else if (hour > 18 && day != 6) { // Lunes a Viernes fuera de horario de atención.
            message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia de mañana a partir de las 10 am.";
         }
         else if (hour > 16 && day == 6) { // Sábado fuera de horario de atención.
            message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia Lunes a partir de las 10 am.";
         }
      }
      else // Domingo
         message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia Lunes a partir de las 10 am.";

      return message;
   },

   // Obtiene las fechas de inicio, fin y expedicion de certificados con base a la modalidad
   getDates: function () {
      const day = new Date().getDay();
      const month = module.exports.getMonthName(new Date().getMonth() + 1);
      const endDateDays = 69;
      let dates = {
         startDate: null,
         endDate: null,
         certificateDate: null,
         paidDate: null
      }
      

      let startDay = 0;
      if (day == 2)
         startDay = 6;

      else if (day == 3)
         startDay = 5;

      else if (day == 4)
         startDay = 4;

      else if (day == 5)
         startDay = 3;

      else if (day == 6)
         startDay = 2;

      const startDate = module.exports.getNextDate(new Date().toDateString(), startDay);
      const endDate = module.exports.getNextDate(startDate, endDateDays);
      const certDate = module.exports.getNextDate(new Date().getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate(), 80);
      let monthRangeCert = 0;

      dates.startDate = 'lunes ' + startDate.getDate() + ' de ' + module.exports.getMonthName(startDate.getMonth() + 1);
      dates.endDate = 'domingo ' + endDate.getDate() + ' de ' + module.exports.getMonthName(endDate.getMonth() + (endDate.getDate() > 25 ? 2 : 1));
      dates.paidDate = 'viernes ' + module.exports.getNextDate(startDate, 4).getDate() + ' de ' + module.exports.getMonthName(module.exports.getNextDate(startDate, 4).getMonth() + (day > 25 ? 2 : 1));

      if ((certDate.getMonth() + 1) == 11)
         monthRangeCert = 1;
      else if ((certDate.getMonth() + 1) == 12)
         monthRangeCert = 2;
      else
         monthRangeCert = certDate.getMonth() + 3;

      dates.certificateDate = module.exports.getMonthName((certDate.getMonth()) + 1) + '/' + module.exports.getMonthName(monthRangeCert);
      return dates;
   },

   // Realiza la suma de dias a una fecha determinada
   getNextDate: function (dateStr, daysSum) {
      return new Date(new Date(dateStr)
         .setDate(new Date(dateStr)
            .getDate() + daysSum));
   },

   // Obtiene el nombre del mes en base al numero de mes
   getMonthName: function (month) {
      switch (month) {
         case 1:
         case 13:
            return 'Enero';
         case 2:
         case 14:
            return 'Febrero';
         case 3:
            return 'Marzo';
         case 4:
            return 'Abril';
         case 5:
            return 'Mayo';
         case 6:
            return 'Junio';
         case 7:
            return 'Julio';
         case 8:
            return 'Agosto';
         case 9:
            return 'Septiembre';
         case 10:
            return 'Octubre';
         case 11:
            return 'Noviembre';
         case 12:
            return 'Diciembre';
      }
   },

   // Convierte a horario local
   convertUtcToLocalTime: function (time) {
      let localTIme;

      if (time == 0) localTIme = 19;
      else if (time == 1) localTIme = 20;
      else if (time == 2) localTIme = 21;
      else if (time == 3) localTIme = 22;
      else if (time == 4) localTIme = 23;
      else if (time == 5) localTIme = 0;
      else localTIme = time - 5;

      return localTIme;
   }
}