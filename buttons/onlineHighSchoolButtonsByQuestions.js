// ==================================================================================
// Obtiene preguntas de la modalidad prepa en linea.
// ==================================================================================
const e = require('../misc/enums');

module.exports = {
   getQuestion: function (questionPack) {
      switch (questionPack) {
         case e.QuestionsPack.PREPALINEA:
            return [
               {
                  content_type: "text",
                  title: "Conocer mas",
                  payload: "comoFunciona"
               }, {
                  content_type: "text",
                  title: "Conocer Costos",
                  payload: "conocerCostos"
               },
               {
                  content_type: "text",
                  title: "Sobre el certificado",
                  payload: "sobreCertificado"
               },
               {
                  content_type: "text",
                  title: "Formas de pago",
                  payload: "formasPago"
               },
               {
                  content_type: "text",
                  title: "Fechas de ingreso",
                  payload: "fechasIngreso"
               },
               {
                  content_type: "text",
                  title: "Requisitos",
                  payload: "requisitosInscripcion"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.QuestionsPack.COMOFUNCIONA:
            return [{
               content_type: "text",
               title: "Conocer Costos",
               payload: "conocerCostos"
            },
            {
               content_type: "text",
               title: "Sobre el certificado",
               payload: "sobreCertificado"
            },
            {
               content_type: "text",
               title: "Formas de pago",
               payload: "formasPago"
            },
            {
               content_type: "text",
               title: "Fechas de ingreso",
               payload: "fechasIngreso"
            },
            {
               content_type: "text",
               title: "Requisitos",
               payload: "requisitosInscripcion"
            },
            {
               content_type: "text",
               title: "Hablar con un asesor",
               payload: "asesor"
            }];
         case e.QuestionsPack.CONOCERCOSTOS:
            return [
               {
                  content_type: "text",
                  title: "Sobre el certificado",
                  payload: "sobreCertificado"
               },
               {
                  content_type: "text",
                  title: "Formas de pago",
                  payload: "formasPago"
               },
               {
                  content_type: "text",
                  title: "Fechas de ingreso",
                  payload: "fechasIngreso"
               },
               {
                  content_type: "text",
                  title: "Requisitos",
                  payload: "requisitosInscripcion"
               },
               {
                  content_type: "text",
                  title: "Como funciona",
                  payload: "comoFunciona"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.QuestionsPack.SOBRECERTIFICADO:
            return [
               {
                  content_type: "text",
                  title: "Formas de pago",
                  payload: "formasPago"
               },
               {
                  content_type: "text",
                  title: "Fechas de ingreso",
                  payload: "fechasIngreso"
               },
               {
                  content_type: "text",
                  title: "Requisitos",
                  payload: "requisitosInscripcion"
               },
               {
                  content_type: "text",
                  title: "Como funciona",
                  payload: "comoFunciona"
               },
               {
                  content_type: "text",
                  title: "Sobre el certificado",
                  payload: "sobreCertificado"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.QuestionsPack.FORMASPAGO:
            return [
               {
                  content_type: "text",
                  title: "Fechas de ingreso",
                  payload: "fechasIngreso"
               },
               {
                  content_type: "text",
                  title: "Requisitos",
                  payload: "requisitosInscripcion"
               },
               {
                  content_type: "text",
                  title: "Como funciona",
                  payload: "comoFunciona"
               },
               {
                  content_type: "text",
                  title: "Sobre el certificado",
                  payload: "sobreCertificado"
               },
               {
                  content_type: "text",
                  title: "Formas de pago",
                  payload: "formasPago"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.QuestionsPack.FECHASINGRESO:
            return [
               {
                  content_type: "text",
                  title: "Requisitos",
                  payload: "requisitosInscripcion"
               },
               {
                  content_type: "text",
                  title: "Como funciona",
                  payload: "comoFunciona"
               },
               {
                  content_type: "text",
                  title: "Sobre el certificado",
                  payload: "sobreCertificado"
               },
               {
                  content_type: "text",
                  title: "Formas de pago",
                  payload: "formasPago"
               },
               {
                  content_type: "text",
                  title: "Fechas de ingreso",
                  payload: "fechasIngreso"
               },
               {
                  content_type: "text",
                  title: "Hablar con un asesor",
                  payload: "asesor"
               }];
         case e.QuestionsPack.REQUISITOSINSCRIPCION:
            return [{
               content_type: "text",
               title: "Hablar con un asesor",
               payload: "asesor"
            }, {
               content_type: "text",
               title: "Como funciona",
               payload: "comoFunciona"
            }, {
               content_type: "text",
               title: "Conocer Costos",
               payload: "conocerCostos"
            },
            {
               content_type: "text",
               title: "Sobre el certificado",
               payload: "sobreCertificado"
            },
            {
               content_type: "text",
               title: "Formas de pago",
               payload: "formasPago"
            },
            {
               content_type: "text",
               title: "Fechas de ingreso",
               payload: "fechasIngreso"
            }
            ];
      }
   }
}