// ==================================================================================
// Obtiene mensajes de prepa en linea
// ==================================================================================
const util = require("../../misc/utils");
const e = require('../../misc/enums');

module.exports = {
   getMessages: function (payload) {
      switch (payload) {
         case e.Messages.PREPA:
            return [
               "Somos un sistema de prepa abierta que trabajamos a través de evaluación contínua; "
               + "contamos con un modelo de estudios con VALIDEZ OFICIAL que te permite estudiar en los horarios que mejor se adapten a tu ritmo de vida."
            ];

         case e.Messages.COSTOS:
         case e.Messages.VALIDEZ:
         case e.Messages.UBICACION:
         case e.Messages.TEL:
            return ["Te comparto una imagen con la informacion que solicitas: "];

         case e.Messages.EXPEDICION:
            return ["Desde el momento en que terminas de hacer tu última parcialidad de pago por concepto de"
               + "certificación, en ese momento se comienza con el trámite de certificación ",
               "y conforme a los días hábiles de la SEP, que son de 80 a 120 días laborales"
            ];

         case e.Messages.SOLOPAGO:
            return ["No es posible, ya que el sistema sólo detecta un ticket por examen de $250.00, ya que al momento "
               + "de ingresar un ticket que no corresponda a la cuenta o al monto, no se liberará tu calificación."
            ];

         case e.Messages.DOCUMENTACION:
            return ["La requisitos de documentación son los siguientes: ",
               "1. Los documentos deberán ser completamente legibles, a color, sin tachaduras o enmendaduras, digital o en formato PDF.",
               "2. Acta de nacimiento digital o escaneada, menor a 3 meses de expedición. (si es en tamaño oficio, solicitar una reducción a tamaño carta)",
               "Adjunto el link para descargar ACTA DE NACIMIENTO: https://www.gob.mx/ActaNacimiento/",
               "3. CURP digital o escaneado, formato nuevo.",
               "Adjunto el link para descargar CURP: https://www.gob.mx/curp/",
               "4. Certificado de secundaria, escaneado de manera horizontal con márgenes completos sin manchas, no maltratado, " + "escaneado del original por ambos lados (parte delantera y trasera)",
               "5. *RECUERDA TIENES UN MES PARA ENVIARLA APARTIR DE TU FECHA DE INICIO*",
               "ATENCIÓN ÁREA DE DOCUMENTACIÓN IPEI: - WHATS APP: +52 1 55 4889 2529",
            ];

         case e.Messages.PAIS:
            return [
               "Claro que sí, nos dará mucho gusto recibirte en IPEI. Por lo pronto, necesitamos que nos presentes "
               + "una carta de revalidación de estudios; este trámite lo podrás efectuar en las oficinas de la SEP más "
               + "cercana a tu domicilio."
            ];

         case e.Messages.PERFIL:
            return [
               "Si te parece bien vamos a proseguir con solo un par de procedimientos para poder asignarte un perfil en plataforma, "
               + "que será desde donde estudiaras tu prepa en línea.",
               "Primero de favor vamos a llenar solicitud de admisión, misma que si puedes llenarla desde tu propio celular. ",
               "Te tomara solo un par de minutos:",
               "*SOLICITUD DE ADMISION*",
               "https://prepaipei.mx/solicitud-de-admision/"
            ];

         //case e.Messages.VALIDEZ:
            // return [
            //    "Con mucho gusto te informamos que el certificado SÍ cuenta con validez oficial.",
            //    "Por el tipo de programa que operamos en IPEI, no contamos con una incorporación directa, ya que "
            //    + "las C.C.T o RVOE solo la tienen escuelas que trabajan en sistemas escolarizados o semi escolarizados "
            //    + "a 2 o 3 años, o bien sistemas como el Instituto Nacional de Educación Abierta evaluado por el "
            //    + "CENEVAL, el cual se cursa en un año en promedio, o bien, el COLBACH que es por examen único. ",
            //    "De modo que nosotros por nuestra forma de trabajo la cual se lleva a cabo en 2 meses y medio con solo "
            //    + "10 materias del tronco común en sistemas en línea *sin examen final*. "
            // ];

         case e.Messages.SEP:     
            return [
               "Nosotros no contamos con una incorporación directa, ya que las C.C.T o RVOE solo la tienen escuelas que trabajan en sistemas escolarizados " 
               + "o semi escolarizados a 2 o 3 años, o bien sistemas como el Instituto Nacional de Educación Abierta evaluado por el CENEVAL el cual se cursa en un año en promedio, "
               + "o bien el COLBACH que es por examen único.",
               "De modo que nosotros por nuestra forma de trabajo la cual se lleva a cabo en 2 meses con solo 10 materias del tronco común en sistemas en línea sin examen final  ",
               "Debemos trabajar de manera obligatoria a través de convenios con escuelas incorporadas para así poder brindar certificados con validez oficial "
               + "que es precisamente como lo hacemos. ",
               "De modo que cursan los alumnos su prepa en 2 meses con nosotros, pero brindamos certificados con validez oficial de estudios dentro de plataforma "
               + "de la Subsecretaria de Educación Media Superior por parte de la SEP como si el alumno cursara durante 2 años el nivel bachillerato."
            ];

         case e.Messages.REVALIDACION:
            return [
               "Te comunico que es necesario cursar con nosotros las 10 semanas y aprobar las asignaturas para "
               + "poder lograr así tu certificado en IPEI, ya que no contamos con revalidación de materias",
               "Por lo tanto, esta manera que te sugiero es la más efectiva para que ya obtengas tu certificado."
            ];

         case e.Messages.CERTIFICADOUNI:
            return [
               "Así es, el certificado de preparatoria tiene validez oficial en toda la República."
            ];

         case e.Messages.UNIINSCRIPCION:
            return [
               "Bien, con mucho gusto le brindo requisitos de admisión",
               "• Original de Certificado de Bachillerato (Legalizado).",
               "• Original de Acta de Nacimiento (Actualizada).",
               "• 3 copias CURP (Actualizado, impreso de la página RENAPO)",
               "• 3 copias por ambos lados de Certificado de Bachillerato.",
               "• 3 copias de Acta de Nacimiento. (Por ambos lados si el acta tiene notas marginales)",
               "• 3 copias por ambos lados INE/IFE.",
               "Estos documentos se necesitarán en físico en el momento de realizar la incorporación a SEP",
               "Por el momento podrías mandar los documentos en formato PDF directo en plataforma o contactando a tu coordinador universitario IPEI.",
               "En caso de que este en espera de certificado de preparatoria oficial, requerirá de una constancia de terminación de estudios que le avale.",
            ];

         case e.Messages.REQUISITOS:
            return [
               "Te comento que se requiere ser mayor de 17 años (sin límite de edad) o haber terminado la"
               + "secundaria ya hace más de 2 años, contar con *Whats app* y tener la siguiente documentación:",
               "1.- Acta de nacimiento, copia certificada no mayor a 3 meses (digital o escaneada en formato PDF)",
               "2.- Certificado de secundaria original a color (escaneado en formato PDF 100% legible)",
               "3.- CURP (formato de internet en PDF)",
               "DE IGUAL MANERA TE INVITO A LEER TU REGLAMENTO Y CONOCER NUESTRA PAGINA",
               "https://sep.prepaipei.mx/"
            ];

         case e.Messages.CARRERAS:
            return [
               "• Administración de Empresas",
               "• Derecho",
               "• Psicología",
            ];

         case e.Messages.HORARIOS:
            return ["Nuestros horarios de atención son: ",
               "*lunes a viernes* de 10:00am – 14:00pm y 16:00pm – 18:00pm",
            ];

         case e.Messages.COMPRA:
            return ["Que lamentable recibir ese tipo de comentarios, trabajaremos fuertemente para evitar parecer un sistema que realice tramites apócrifos "
               + "o de esa manera en la que usted lo solicita, y bueno, desafortunadamente no tenemos manera de apoyarle con lo que usted busca, ya que nosotros trabajamos "
               + "bajo un régimen estricto de estudios, en el cual, se requiere de un dictamen de terminación de estudios para poder obtener promedio final y así se pueda "
               + "llevar a cabo la expedición de un certificado con validez oficial de estudios dentro de los calendarios de expedición con base a la Secretaria de Educación Pública SEP.",
               "No somos la opción que busca, pero de cualquier manera por mi parte fue un placer atenderle y que tenga una excelente tarde."];

         case e.Messages.SECUNDARIA:
            return ["Aun no se que contestar cuando me pregunten por 'secundaria'"];

         case e.Messages.FRAUDE:
            return ["Aun no se que contestar cuando me pregunten por 'fraude'"];

         case e.Messages.FECHASINIPREP:
            let dates = util.getDates();
            return ["Podrías iniciar con tu preparatoria este mismo " + dates.startDate + " y tu primer pago lo estarías realizando hasta el " + dates.paidDate,
               "De esa manera estarías terminando con tu preparatoria el " + dates.endDate + " y asi empezar el proceso para la certificación."]

         case e.Messages.FECHASINIUNI:
            return ["Podrías iniciar con tu universidad este mismo " + dates.startDate + " y tu primer pago lo estarías realizando hasta el " + dates.paidDate,
               "De esa manera estarías terminando con tu preparatoria el " + dates.endDate + " y asi empezar el proceso para la certificación."]

         case e.Messages.EXTRA:
            return ["Si, el exámen estará disponible de Martes a Domingo y solo podras presentarlo durante la semana de tu materia correspondiente.",
               "En caso de no realizarlo dentro del tiempo estipulado, quedará reprobado.",
               "En caso de no pagar, el alumno no podrá liberar su calificación y quedará como N.P, en caso de querer recuperar la materia perdida, "
               + "debera presentarla a fin de curso con un costo por extraordinario de $500.00"];
      }
   },

   getNextQuestion: function (payload) {
      switch (payload) {
         case e.Messages.PREPA:
         case e.Messages.COSTOS:
         case e.Messages.EXPEDICION:
         case e.Messages.SOLOPAGO:
         case e.Messages.DOCUMENTACION:
         case e.Messages.PAIS:
         case e.Messages.PERFIL:
         case e.Messages.VALIDEZ:
         case e.Messages.SEP:
         case e.Messages.REVALIDACION:
         case e.Messages.CERTIFICADOUNI:
         case e.Messages.UNIINSCRIPCION:
         case e.Messages.REQUISITOS:
         case e.Messages.CARRERAS:
         case e.Messages.UBICACION:
         case e.Messages.HORARIOS:
         case e.Messages.COMPRA:
         case e.Messages.SECUNDARIA:
         case e.Messages.FRAUDE:
         case e.Messages.FECHASINIPREP:
         case e.Messages.FECHASINIUNI:
         case e.Messages.EXTRA:
         case e.Messages.TEL:
            return "Espero haber resuelto tu duda."
               + "\nTambien puedo brindarte información sobre nuestros sistemas.";
      }
   }
}