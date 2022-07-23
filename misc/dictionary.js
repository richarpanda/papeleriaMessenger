// ==================================================================================
// Diccionario de palabras mas usadas con base a lo escrito por usuarios
// ==================================================================================

const e = require('../misc/enums');
const quickRepHighSchool = require('../messages/quickReplies/highSchool');
const quickRepCollege = require('../messages/quickReplies/college');

module.exports = {

   getConcidences: function (enteredString) {
      let dictionaryResponse = { status: false, buttonsConfig: [], greeting: false };

      // [Numero de palabras a buscar, Nombre del PAYLOAD, Titulo en el Boton, [Cadenas a buscar coincidencias]]

      const saludo = [2, e.Default.SALUDO, null, 'BUEN', 'DIA','TARDE', 'NOCHE'];
      const info = [1, e.Default.SALUDO, null, 'INFO', 'INF','HOLA'];
      const telefono = [1, e.Messages.TEL, 'Numero de contacto', 'NUMERO', 'CONTACTO', 'CONTACTARLOS', 'TELEFONO'];

      const dictionaryArray = [
           saludo
         , info
         , telefono
      ];

      enteredString = enteredString.toUpperCase();
      enteredString = quitAccentMarks(enteredString);

      for (let index = 0; index < dictionaryArray.length; index++) {
         let response = searchWordCoincidence(enteredString, dictionaryArray[index]);

         if (response.status) {
            if (response.buttonConfig.payload === e.Default.SALUDO) {
               dictionaryResponse.greeting = true;
               dictionaryResponse.buttonsConfig.push(response.buttonConfig);
               dictionaryResponse.status = true;
               break;
            }
            dictionaryResponse.buttonsConfig.push(response.buttonConfig);
            dictionaryResponse.status = true;
         }

         if (dictionaryResponse.buttonsConfig.length === 3)
            break;
      }

      return dictionaryResponse;
   },

   validateLastMessage: function (botLastMessage) {
      let response = { status: false, message: null, enumStep: null, modality: null }
      
      if (botLastMessage == quickRepHighSchool.getNextQuestion(e.HighSchoolSpeechStep.PRIMERBLOQUE)) {
         response.status = true;
         response.message = botLastMessage;
         response.enumStep = e.HighSchoolSpeechStep.PRIMERBLOQUE;
         response.modality = e.Modality.HISHSCHOOL;
      }
      else if (botLastMessage == quickRepHighSchool.getNextQuestion(e.HighSchoolSpeechStep.SEGUNDOBLOQUE))
      {
         response.status = true;
         response.message = botLastMessage;
         response.enumStep = e.HighSchoolSpeechStep.SEGUNDOBLOQUE;
         response.modality = e.Modality.HISHSCHOOL;
      }
      else if (botLastMessage == quickRepCollege.getNextQuestion(e.CollegeSpeechStep.CARRERAS))
      {
         response.status = true;
         response.message = botLastMessage;
         response.enumStep = e.CollegeSpeechStep.CARRERAS;
         response.modality = e.Modality.COLLEGE;
      }
      else if (botLastMessage == quickRepCollege.getNextQuestion(e.CollegeSpeechStep.DERECHO))
      {
         response.status = true;
         response.message = botLastMessage;
         response.enumStep = e.CollegeSpeechStep.DERECHO;
         response.modality = e.Modality.COLLEGE;
      }

      return response;
   }
}

function searchWordCoincidence(enteredString, dictionaryArrayItem) {
   let dictionaryResponse = { status: false, buttonConfig: { type: "postback", payload: dictionaryArrayItem[1], title: dictionaryArrayItem[2] } };
   let coincidenceCondition = dictionaryArrayItem[0];
   let coincidences = 0;

   for (let index = 3; index < dictionaryArrayItem.length; index++) {
      if (enteredString.includes(dictionaryArrayItem[index])) {
         coincidences += 1;

         if (coincidences >= coincidenceCondition) {
            console.log("Cadena encontrada");
            dictionaryResponse.status = true;
            break;
         }
      }
   }

   return dictionaryResponse;
}

function quitAccentMarks(stringVal) {
   const accentMarks = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
   return stringVal.split('').map(letter => accentMarks[letter] || letter).join('').toString();
}