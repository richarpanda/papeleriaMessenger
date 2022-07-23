// ==================================================================================
// Enumeradores para control de conversación
// ==================================================================================

const Default = {
   SALUDO: 'saludo',
   EMPEZAR: 'Empezar',
   ASESOR: 'asesor',
   PREGUNTAS: 'preguntas'
}

const faqMessages = {
   TEL: 'telefono'
}

const repliesPayloads = {
   PRODUCTOSENCONTRADOS: 'productosencontrados',
   PRODUCTOSNOENCONTRADOS: 'productosnoencontrados',
   SIPRODUCTOS: 'siproductos',
   NOPRODUCTOS: 'noproductos',
   AGREGARCARRITO: 'agregaralcarrito',
   VERCARRITO: 'vercarrito',
}

const questionsPayloads = {
  
}

const MediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO:'audio',
  FILE: 'file',
  LOCATION: 'location',
  TEMPLATE: 'template',
  FALLBACK: 'fallback',
  LIKE_HEART: 'like_heart',
  MEDIA_SHARE: 'media_share'
}

const MediaAttachments = {
   COSTOSIMAGE: '1742252832591877', // '330871928215871',
   WHATSAPPIMG: '399677301440101', //'2506972382935616',
   UBICACIONIMG: '656007981633489', //'1071826129918124',
   SOBREIPEIMG: '689325692006009', //'1200782596960258',

   DERECPDF: '752472178635289',
   PSICOPDF: '381639626530616',
   ADMINPDF: '341485380440332'
}

module.exports = {
   Default: Default,
   FaqMessages: faqMessages,
   RepliesPayloads: repliesPayloads,
   QuestionsPayloads: questionsPayloads,
   MediaTypes: MediaTypes,
   MediaAttachments: MediaAttachments
}