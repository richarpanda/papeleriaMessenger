// ==================================================================================
// Obtiene mensajes de universidad
// ==================================================================================
const e = require("../../misc/enums");

module.exports = {
  	getMessages: function (payload) {
    	switch (payload) {
      	case e.CollegeSpeechStep.DERECHO:
				return ["En el siguiente link se encuentra toda la información sobre la carrera",
					"https://cdn.glitch.com/d53d8ec1-7812-45fc-b6b4-ed973732bbdd%2FLicenciatura%20Ejecutiva%20en%20Derecho.pdf?v=1602130121960",
					"Si tienes alguna otra duda, favor de pulsar el boton de 'Hablar con un asesor'"];

			case e.CollegeSpeechStep.PSICOLOGIA:
				return ["En el siguiente link se encuentra toda la información sobre la carrera",
					"https://cdn.glitch.com/d53d8ec1-7812-45fc-b6b4-ed973732bbdd%2FLicenciatura%20Ejecutiva%20en%20Psicolog%C3%ADa.pdf?v=1602130124969",
					"Si tienes alguna otra duda, favor de pulsar el boton de 'Hablar con un asesor'"];

      	case e.CollegeSpeechStep.ADMINISTRACION:
				return ["En el siguiente link se encuentra toda la información sobre la carrera",
					"https://cdn.glitch.com/d53d8ec1-7812-45fc-b6b4-ed973732bbdd%2FLicenciatura%20en%20Administraci%C3%B3n%20de%20Empresas.pdf?v=1602130127859",
					"Si tienes alguna otra duda, favor de pulsar el boton de 'Hablar con un asesor'"];
   	}
	},

	getNextQuestion: function (payload) {
		switch (payload) {
			case e.CollegeSpeechStep.CARRERAS:
				return "¿Sobre que carrera te gustaria recibir información?";

			case e.CollegeSpeechStep.DERECHO:
			case e.CollegeSpeechStep.PSICOLOGIA:
			case e.CollegeSpeechStep.ADMINISTRACION:
				return "O si gustas puedo brindarte mas información sobre nuestros sistemas";
		}
	}
};
