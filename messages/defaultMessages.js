// ==================================================================================
// Obtiene mensajes default que se utilizan en diferente plantillas
// ==================================================================================
const e = require("../misc/enums");

module.exports = {
   getMessages: function (messageType) {
      switch (messageType) {
         case e.Default.EMPEZAR:
         case e.Default.SALUDO:
            return ["Hola soy Tokyo, tu asistente virtual y te ire guiando para brindarte información o generar tu pedido. Comunícate conmigo utilizando los botones de respuesta."];
         
         case e.Default.ASESOR:
         case e.Default.NOPRODUCTOS:
            return ["Se te transferira con un vendedor, por favor espera. Podria tomar unos minutos hasta que el vendedor te responda."];

         default:
            return ["Lo siento no te entendi. *Favor de contestar utilizando los botones de respuesta*."];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.Default.EMPEZAR:
         case e.Default.SALUDO:
            return "Cuentame ¿Estas interesado en algun producto en especifico?";
          
         case e.RepliesPayloads.CARRITO:
            return "Agregue el producto al carrito, ¿deseas buscar algo mas?";

         case e.Default.PREGUNTAS:
             return "¿Alguno de los siguientes temas o preguntas frecuentas te ayudan a resolver tu duda? Favor de seleccionarlo.";

         default:
            return "Intenta preguntarme con otras palabras o también puedo brindarte información sobre nuestros sistemas.";
      }
   }
}