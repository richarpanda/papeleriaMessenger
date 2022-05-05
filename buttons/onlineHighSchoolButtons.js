// ==================================================================================
// Obtiene preguntas de la modalidad prepa en linea.
// ==================================================================================
const e = require('../misc/enums');

module.exports = {
   getQuestion: function (questionPack) {
      switch (questionPack) {
         case e.HighSchoolSpeechStep.PRIMERBLOQUE:
            return [
               {
                  content_type: "text",
                  title: "Una exhibicion",
                  payload: "resUnaExhibicion"
               }, {
                  content_type: "text",
                  title: "Pequeños pagos",
                  payload: "resPagosPequeños"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.HighSchoolSpeechStep.SEGUNDOBLOQUE:
            return [{
               content_type: "text",
               title: "Si puedo",
               payload: "resInicia"
            },
            {
               content_type: "text",
               title: "No puedo",
               payload: "resNoInicia"
            },
            {
               content_type: "text",
               title: "Hablar con un asesor",
               payload: "asesor"
            }];
      }
   }
}