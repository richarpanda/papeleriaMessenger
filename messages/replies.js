// ==================================================================================
// Obtiene mensajes de prepa en linea
// ==================================================================================
const util = require("../misc/utils");
const e = require("../misc/enums");

module.exports = {
   getMessages: function (payload) {
      switch (payload) {
         case e.RepliesPayloads.SIPRODUCTOS:
            return ["Favor de escribir con una o dos palabras clave el producto en el que estas interesado.."];
         case e.RepliesPayloads.PRODUCTOSENCONTRADOS:
            return ["Estos son productos que coinciden con tu busqueda:"];
         case e.RepliesPayloads.VERCARRITO:
            return [""];
         case e.RepliesPayloads.NOPRODUCTOS:
               return [""];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.RepliesPayloads.PRODUCTOSENCONTRADOS:
            return "Puedes agrgar al carrito el producto que te interese, ¿o te gustaria que busque algo mas por ti?";

         case e.HighSchoolSpeechStep.SEGUNDOBLOQUE:
            return "*¿Puedes iniciar con tu preparatoria este mismo 2 de Noviembre?*";

         case e.HighSchoolSpeechStep.RESINICIA:
            return "A continuación te transferire con un asesor para iniciar la captura de tus datos. Favor de esperar...";
      }
   }
}