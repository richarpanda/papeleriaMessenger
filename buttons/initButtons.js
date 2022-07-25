// ==================================================================================
// Obtiene botones principales
// ==================================================================================

module.exports = {
   getInitialButtons: function () {
      return [
      {
         content_type: "text",
         title: "Si",
         payload: "siproductos"
      },
      {
         content_type: "text",
         title: "No",
         payload: "noproductos"
      },
      {
         content_type: "text",
         title: "Hablar con un asesor",
         payload: "asesor"
      }];
   },
   getAsesorButton: function () {
      return [
      {
         content_type: "text",
         title: "Hablar con un asesor",
         payload: "asesor"
      }];
   },
   getCarritoButtons: function () {
      return [
         {
            content_type: "text",
            title: "Si",
            payload: "siproductos"
         },
         {
            content_type: "text",
            title: "Ver carrito",
            payload: "vercarrito"
         },
         {
            content_type: "text",
            title: "Finalizar pedido",
            payload: "finalizarpedido"
         },
         {
            content_type: "text",
            title: "Hablar con un asesor",
            payload: "asesor"
         }];
   }
}