// ==================================================================================
// Obtiene preguntas de la modalidad universidad en linea.
// ==================================================================================

const init = require('./initButtons');
const e = require('../misc/enums');

module.exports = {
   getQuestion: function (careers) {
      switch (careers) {
         case e.CollegeSpeechStep.CARRERAS:
            return [{
               content_type: "text",
               title: "DERECHO",
               payload: "derecho"
            },
            {
               content_type: "text",
               title: "PSICOLOGÍA",
               payload: "psicologia"
            },
            {
               content_type: "text",
               title: "ADMINISTRACIÓN",
               payload: "administracion"
            }];

         case e.CollegeSpeechStep.DERECHO:
         case e.CollegeSpeechStep.PSICOLOGIA:
         case e.CollegeSpeechStep.ADMINISTRACION:
            return init.getInitialButtons();
      }
   }
}