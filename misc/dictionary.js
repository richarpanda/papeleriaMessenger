// ==================================================================================
// Diccionario de palabras mas usadas con base a lo escrito por usuarios
// ==================================================================================

const e = require('../misc/enums');
const quickRepHighSchool = require('../messages/quickReplies/highSchool');
const quickRepCollege = require('../messages/quickReplies/college');

module.exports = {

   getConcidences: function (enteredString) {
      let dictionaryResponse = { status: false, buttonsConfig: [], greeting: false };

      const saludo = [2, e.Default.SALUDO, null, 'BUEN', 'DIA','TARDE', 'NOCHE'];
      const info = [1, e.Default.SALUDO, null, 'INFO', 'INF','HOLA'];
      const prepa = [1, e.Messages.PREPA, '¿Son prepa técnica?', 'PREPARATORIA', 'TECNICA', 'PREPA'];
      const costos = [1, e.Messages.COSTOS, 'Costos y formas de pago', 'COSTO', 'CUESTA'];
      const pago = [2, e.Messages.COSTOS, 'Costos y formas de pago', 'FORMA', 'PAGO'];
      const expedicion = [1, e.Messages.EXPEDICION, 'Expedición certificado ', 'TIEMPO', 'EXPEDIR', 'EXPEDICION', 'CERTIFICADO', 'TARDA', 'DAR'];
      // const solopago = [2, e.Messages.SOLOPAGO, 'Curso en un pago', 'SOLO', 'PAGO', 'UNA', 'UN', 'SOLA', 'EXHIBICION'];
      const documentacion = [1, e.Messages.DOCUMENTACION, 'Documentación requerida', 'DOCUMENTACION'];
      const pais = [1, e.Messages.PAIS, 'Estudios de otro país', 'OTRO', 'PAIS', 'REVALIDA', 'ESTUDIOS'];
      const perfil = [1, e.Messages.PERFIL, 'Cómo entro a mi perfil', 'MI PERFIL'];
      const validez = [1, e.Messages.VALIDEZ, 'RVOE, CCT, Validez of.', 'RVOE', 'REVOE', 'CCT', 'VALIDEZ', 'OFICIAL', 'VALIDES', 'AVALADO', 'SEP'];
      const sep = [1, e.Messages.SEP, 'Sobre incorporación SEP', 'VALIDEZ', 'OFICIAL', 'VALIDES', 'AVALADO', 'SEP'];
      const revalidacion = [1, e.Messages.REVALIDACION, '¿Revalidan materias?', 'REAVALIDACION', 'REVALIDA', 'REVALIDAR'];
      const certificadoUni = [1, e.Messages.CERTIFICADOUNI, 'Validación certificado', 'CERTIFICADO', 'SIRVE', 'UNIVERSIDAD'];
      const uniInscripcion = [1, e.Messages.UNIINSCRIPCION, 'Inscripción Universidad', 'INSCRI', 'REQUISITOS', 'UNIVERSIDAD'];
      const requisitos = [1, e.Messages.REQUISITOS, 'Conocer requisitos', 'REQUISITOS'];
      const carreras = [1, e.Messages.CARRERAS, '¿Qué carreras tienen?', 'CARRERA'];
      const ubicacion = [1, e.Messages.UBICACION, 'Nuestra ubicación', 'UBICADOS', 'DONDE', 'UBICADA', 'UBICACION'];
      const horarios = [1, e.Messages.HORARIOS, 'Horarios de atención', 'HORARIO', 'ATENCION'];
      const compra = [1, e.Messages.COMPRA, 'Comprar certificado?', 'COMPRA',];
      const secundaria = [1, e.Messages.SECUNDARIA, '¿Tienen secundaria?', 'SECUNDARIA',];
      const fraude = [1, e.Messages.FRAUDE, '¿Son un fraude?', 'FRAUDE',];
      const fechasIniPrep = [1, e.Messages.FECHASINIPREP, 'Fechas de inicio Prepa', 'FECHA', 'INICIO', 'INICIAR', 'PREPA'];
      const fechasIniUni = [1, e.Messages.FECHASINIUNI, 'Fechas de inicio Uni', 'FECHA', 'INICIO', 'INICIAR'];
      const extra = [1, e.Messages.EXTRA, 'Hay examen extraordinario', 'EXTRAORDINARIO', 'EXAMEN'];
      const telefono = [1, e.Messages.TEL, 'Numero de contacto', 'NUMERO', 'CONTACTO', 'CONTACTARLOS', 'TELEFONO'];

      const dictionaryArray = [
           saludo
         , info
         , prepa
         , costos
         , pago
         , expedicion
         // , solopago
         , documentacion
         , pais
         , perfil
         , validez
         , sep
         , revalidacion
         , certificadoUni
         , uniInscripcion
         , requisitos
         , carreras
         , ubicacion
         , horarios
         , compra
         , secundaria
         , fraude
         , fechasIniPrep
         , fechasIniUni
         , extra
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