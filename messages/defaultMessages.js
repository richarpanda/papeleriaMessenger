// ==================================================================================
// Obtiene mensajes default que se utilizan en diferente plantillas
// ==================================================================================
const e = require("../misc/enums");

module.exports = {
   getMessages: function (messageType) {
      switch (messageType) {
         case e.Default.EMPEZAR:
         case e.Default.SALUDO:
            return ["Hola, soy tu asistente virtual de IPEI y te ire guiando para brindarte información. Comunícate conmigo utilizando los botones de respuesta."];

         case e.Default.ASESOR:
            return ["Se te transferira con un asesor, por favor espera. Podria tomar unos minutos hasta que el asesor te responda."];

         default:
            return ["Lo siento no te entendi. *Favor de contestar utilizando los botones de respuesta*."];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.Default.EMPEZAR:
         case e.Default.SALUDO:
            return "Cuentame ¿Sobre que sistema estas interesado en recibir información?";
          
         case e.Default.PREGUNTAS:
             return "¿Alguno de los siguientes temas o preguntas frecuentas te ayudan a resolver tu duda? Favor de seleccionarlo.";

         default:
            return "Intenta preguntarme con otras palabras o también puedo brindarte información sobre nuestros sistemas.";
      }
   }
}