// ==================================================================================
// Obtiene mensajes de prepa en linea
// ==================================================================================
const util = require("../../misc/utils");
const e = require("../../misc/enums");

module.exports = {
   getMessages: function (payload) {
      switch (payload) {
         case e.QuestionsPack.PREPALINEA:
            return ["Con mucho gusto te platico de nuestro sistema en LINEA",
               "La prepa en línea en 2 meses es un modelo de estudios con VALIDEZ OFICIAL que te permite estudiar en los horarios que mejor se adapten a tu ritmo de vida."];

         case e.QuestionsPack.COMOFUNCIONA:
            return ["Tiene una duración exacta de 10 semanas (1 materia y 1 examen por semana) y la puedes cursar COMPLETA desde tu teléfono celular o computadora, por medio de nuestra plataforma.",
               "Tanto temarios de estudio como exámenes se presentan en línea.",
               "NO HAY EXAMEN FINAL, ya que somos un sistema de evaluación continua.",
               "Todos los exámenes son de opción múltiple y en caso de no aprobar, el sistema te permitirá repetir sin límite y sin costo extra."];

         case e.QuestionsPack.CONOCERCOSTOS:
            return ["EN RELACION CON COSTOS:"
               + "\n• INSCRIPCIÓN $0 "
               + "\n• SEMANALIDAD $250 pesos (Incluye temario y examen). "
               + "\n• CERTIFICACIÓN $4000 pesos una vez terminado el curso."];

         case e.QuestionsPack.SOBRECERTIFICADO:
            return ["Los tiempos de expedición del certificado van de 80 a 120 días hábiles con base en calendario de SEP",
               "Tendrás facilidades, en caso de que así lo desees, para poder financiar tu pago de certificación en pequeños pagos al finalizar tu programa"];

         case e.QuestionsPack.FORMASPAGO:
            return ["Bien, te platico acerca de cómo se llevaran a cabo los pagos durante tu programa, así como próxima fecha de inicio:",
               "Para poder hacer tus pagos te brindaremos nuestra cuenta institucional: "
               + "\nNúmero de cuenta: 0113817911"
               + "\nClabe Interbancaria: 012180001138179118",
               "En caso de que no tengas sucursal BBVA cerca de tu localidad, te brindaremos el viernes una referencia de pago fija para que puedas pagar por medio de OXXO.",
               "Los pagos deberán realizarse durante el fin de semana y una vez realizado el pago es importante enviar foto de tu comprobante para ingresarlo al sistema"
               + "y así será el procedimiento durante las 10 semanas que durará tu curso."];

         case e.QuestionsPack.FECHASINGRESO:
            let dates = util.getDates();
            return ["En este caso podrías iniciar con tu preparatoria este mismo " + dates.startDate + " y tu primer pago lo estarías realizando hasta el " + dates.paidDate,
               "De esa manera estarías terminando con tu preparatoria el " + dates.endDate + " y asi empezar el proceso para la certificación."];

         case e.QuestionsPack.REQUISITOSINSCRIPCION:
            let initDate = util.getDates();
            return ["Bien, con mucho gusto te brindo requisitos de inscripción.",
               "Te comento que se requiere ser mayor de 17 años (sin límite de edad) (o haber terminado la secundaria ya hace más de 2 años) y contar con la siguiente documentacion:",
               "1.- Acta de nacimiento copia certificada no mayor a 3 meses (digital o escaneada en formato PDF). ",
               "2.- Certificado de secundaria original a color (escaneado en formato PDF 100% legible).",
               "A partir de tu fecha de inicio que en este caso sería el " + initDate.startDate + ", tendrás 1 MES POR TEMA DE CONTINGENCIA para enviar tus documentos por medio de WhatsApp o en línea."];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.QuestionsPack.PREPALINEA:
            return "¿Te gustaría conocer mas sobre el sistema o tienes alguna otra duda?";

         case e.QuestionsPack.COMOFUNCIONA:
            return "A continuación te puedo platicar sobre los costos... ¿o tienes alguna otra duda?";

         case e.QuestionsPack.CONOCERCOSTOS:
            return "A continuación te puedo platicar sobre el certificado... ¿o tienes alguna otra duda?";

         case e.QuestionsPack.SOBRECERTIFICADO:
            return "¿Tienes alguna duda hasta aquí o te parece bien si continuamos con las formas de pago?";

         case e.QuestionsPack.FORMASPAGO:
            return "¿Tienes alguna duda hasta aquí o te parece bien si continuamos con las fechas de ingreso?";

         case e.QuestionsPack.FECHASINGRESO:
            return "¿Te gustaría conocer los requisitos de inscripción o tienes alguna otra duda?";

         case e.QuestionsPack.REQUISITOSINSCRIPCION:
            return "¿Te parece si te transfiero con un asesor para iniciar la captura tus datos, o tienes alguna otra duda?";
      }
   }
}