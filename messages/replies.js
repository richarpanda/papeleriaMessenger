// ==================================================================================
// Obtiene mensajes de respuesta
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
         case e.RepliesPayloads.FINALIZARPEDIDO:
            return ["Se te transferira con un asesor para anotar los ultimos detalles de tu pedido. Favor de esperar."];
         case e.RepliesPayloads.VERCARRITO:
            return ["Tu pedido es el siguiente: "];
         case e.RepliesPayloads.PEDIDOVACIO:
            return ["No encontre pedidos generados el dia de hoy"];
         case e.RepliesPayloads.NOPRODUCTOS:
            return [""];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.RepliesPayloads.PRODUCTOSENCONTRADOS:
            return "Puedes agregar al carrito el producto que te interese, ¿o te gustaria que busque algo mas por ti?";

         case e.RepliesPayloads.PRODUCTOSNOENCONTRADOS:
            return "No encontre informacion para el producto que ingresaste, intenta con otra palabra o puedes hablar con un asesor.";

         case e.RepliesPayloads.VERCARRITO:
               return "¿Deseas agregar algo mas?";
      }
   }
}