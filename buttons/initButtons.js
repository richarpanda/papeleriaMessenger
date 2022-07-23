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
   }
}