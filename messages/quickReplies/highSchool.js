// ==================================================================================
// Obtiene mensajes de prepa en linea
// ==================================================================================
const util = require("../../misc/utils");
const e = require("../../misc/enums");

module.exports = {
   getMessages: function (payload) {
      switch (payload) {
         case e.HighSchoolSpeechStep.PRIMERBLOQUE:
            return ["Con mucho gusto te platico de nuestro sistema en LINEA",
               "La prepa en línea en 2 meses es un modelo de estudios con VALIDEZ OFICIAL que te permite estudiar en los horarios que mejor se adapten a tu ritmo de vida.",
               "Tiene una duración exacta de 10 semanas (1 materia y 1 examen por semana) y la puedes cursar COMPLETA desde tu teléfono celular o computadora, por medio de nuestra plataforma.",
               "Tanto temarios de estudio como exámenes se presentan en línea.",
               "NO HAY EXAMEN FINAL, ya que somos un sistema de evaluación continua.",
               "Todos los exámenes son de opción múltiple y en caso de no aprobar, el sistema te permitirá repetir el examen las veces que sean necesarias (que aplica durante la semana de tu materia) hasta obtener una calificación aprobatoria.",
               "*EN RELACION CON COSTOS*"
               + "\n• INSCRIPCIÓN $0 "
               + "\n• SEMANALIDAD $250 pesos (Incluye temario y examen). "
               + "\n• CERTIFICACIÓN $4000 pesos una vez terminado el curso.",
               "Los tiempos de expedición del certificado van de 80 a 120 días hábiles con base en calendario de SEP",
               "En un momento te doy detalle de cómo se llevan a cabo los pagos dentro de este programa, así como la próxima fecha de inicio",
               "Pero primero que nada te comento que tendrás facilidades en caso de que así lo desees para poder financiar tu pago de certificación poco a poco)."]

         case e.HighSchoolSpeechStep.RESPAGOSPEQUEÑOS:
            return ["Muy bien, siendo así te comento que podrás hacer los pagos ya sea de manera semanal, quincenal o mensual en abonos pequeños; una vez terminado tu curso.",
               "No hay un tiempo límite, ni un costo extra ni mucho menos para el pago de la certificación en esta modalidad. ",
               "Lo único que es importante considerar es que *El trámite ingresara a expedición una vez juntada la cantidad de los $4000*"];

         case e.HighSchoolSpeechStep.RESUNAEXHIBICION:
            return ["Bien, te platico acerca de cómo se llevan a cabo los pagos durante tu programa, así como próxima fecha de inicio."];

         case e.HighSchoolSpeechStep.SEGUNDOBLOQUE:
            let dates = util.getDates();
            console.log(dates);
            return ["Para poder hacer tus pagos te brindaremos nuestra cuenta institucional: "
               + "\nNúmero de cuenta: 0113817911"
               + "\nClabe Interbancaria: 012180001138179118"
               + "\nRazón Social: Instituto Privado IPEI S.C.",
               "En caso de que no tengas sucursal BBVA cerca de tu localidad, te brindaremos el viernes una referencia de pago fija para que puedas pagar por medio de OXXO.",
               "Los pagos deberán realizarse durante el fin de semana y una vez realizado el pago es importante enviar foto de tu comprobante para ingresarlo al sistema y así será el procedimiento durante las 10 semanas que durará tu curso.",
               "Es decir que en este caso podrías iniciar con tu preparatoria este mismo " + dates.startDate + " y tu primer pago lo estarías realizando hasta el " + dates.paidDate,
               "De esa manera estarías terminando con tu preparatoria el " + dates.endDate + " y así empezar el proceso para la certificación.",
               "En un momento te brindo los requisitos de inscripción."];

         case e.HighSchoolSpeechStep.RESINICIA:
            return ["Bien, con mucho gusto te brindo requisitos de inscripción.",
               "•	Ser mayor de 17 años (sin límite de edad) ",
               //"•	*CERTIFICADO DE SECUNDARIA CON MAS DE DOS AÑOS DE HABERSE EXPEDIDO* ",
               "*ES REQUISITO INDISPENSABLE EL HABER TERMINADO EN EL 2018 O AÑOS ANTERIORES*",
               "•	Contar con *WhatsApp* y con la siguiente documentación:",
               "1- Acta de nacimiento original certificada no mayor a 3 meses (digital o escaneada en formato PDF)",
               "2- Certificado de secundaria original a color (escaneado en formato PDF 100% legible)",
               "3- CURP (formato de internet en PDF)",
               "A partir de tu fecha de inicio que en este caso sería el " + util.getDates().startDate + ", tendrás 1 MES POR TEMA DE CONTINGENCIA para enviar tus documentos al sigueinte correo: " 
               + "documentos@prepaipei.mx"];

         case e.HighSchoolSpeechStep.RESNOINICIA:
            return ["A continuación te transferire con un asesor para brindarte mas informacion sobre próximas fechas de inicio. Favor de esperar..."];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.HighSchoolSpeechStep.PRIMERBLOQUE:
            return "*¿A ti por ejemplo se acomoda más realizar el pago de certificación en una sola exhibición o en pequeños pagos?*";

         case e.HighSchoolSpeechStep.SEGUNDOBLOQUE:
            return "*¿Puedes iniciar con tu preparatoria este mismo 2 de Noviembre?*";

         case e.HighSchoolSpeechStep.RESINICIA:
            return "A continuación te transferire con un asesor para iniciar la captura de tus datos. Favor de esperar...";
      }
   }
}