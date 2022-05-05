// ==================================================================================
// Obtiene botones principales
// ==================================================================================

module.exports = {
   getInitialButtons: function () {
      return [{
         content_type: "text",
         title: "Prepa en linea",
         payload: "prepalinea"
      },
      {
         content_type: "text",
         title: "Universidad en linea",
         payload: "unilinea"
      },
      {
         content_type: "text",
         title: "Hablar con un asesor",
         payload: "asesor"
      }];
   }
}