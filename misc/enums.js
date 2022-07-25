// ==================================================================================
// Enumeradores para control de conversación.
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
   CARRITO: 'carrito',
   SIPRODUCTOS: 'siproductos',
   NOPRODUCTOS: 'noproductos',
   AGREGARCARRITO: 'agregaralcarrito',
   VERCARRITO: 'vercarrito',
   FINALIZARPEDIDO: 'finalizarpedido',
   PEDIDOVACIO: 'pedidovacio'
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

module.exports = {
   Default: Default,
   FaqMessages: faqMessages,
   RepliesPayloads: repliesPayloads,
   MediaTypes: MediaTypes
}