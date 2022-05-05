// ==================================================================================
// Enumeradores para control de conversación
// ==================================================================================

const Modality = {
   HISHSCHOOL: 'highSchool',
   COLLEGE: 'college',
   FAQ: 'faq'
}
const Default = {
   SALUDO: 'saludo',
   EMPEZAR: 'Empezar',
   ASESOR: 'asesor',
   PREGUNTAS: 'preguntas'
}

const Messages = {
   PREPA: 'prepa',
   COSTOS: 'costos',
   PAGO: 'pago',
   EXPEDICION: 'expedicion',
   SOLOPAGO: 'solopago',
   DOCUMENTACION: 'documentacion',
   PAIS: 'pais',
   PERFIL: 'perfil',
   VALIDEZ: 'validez',
   SEP: 'sep',
   REVALIDACION: 'revalidacion',
   CERTIFICADOUNI: 'certificadoUni',
   UNIINSCRIPCION: 'uniInscripcion',
   REQUISITOS: 'requisitos',
   CARRERAS: 'carreras',
   UBICACION: 'ubicacion',
   HORARIOS: 'horarios',
   COMPRA: 'compra',
   SECUNDARIA: 'secundaria',
   FRAUDE: 'fraude',
   FECHASINIPREP: 'fechasIniPrep',
   FECHASINIUNI: 'fechasIniUni',
   EXTRA: 'extra',
   TEL: 'telefono'
}

const HighSchoolSpeechStep = {
   PRIMERBLOQUE: 'prepalinea',
   RESPAGOSPEQUEÑOS: 'resPagosPequeños',
   RESUNAEXHIBICION: 'resUnaExhibicion',
   SEGUNDOBLOQUE: 'segundoBloque',
   RESINICIA: 'resInicia',
   RESNOINICIA: 'resNoInicia'
}

const CollegeSpeechStep = {
   CARRERAS: 'carreras',
   DERECHO: 'derecho',
   PSICOLOGIA: 'psicologia',
   ADMINISTRACION: 'administracion'
}

const QuestionsPack = {
   PREPALINEA: 'prepalinea',
   COMOFUNCIONA: 'comoFunciona',
   CONOCERCOSTOS: 'conocerCostos',
   SOBRECERTIFICADO: 'sobreCertificado',
   FORMASPAGO: 'formasPago',
   FECHASINGRESO: 'fechasIngreso',
   REQUISITOSINSCRIPCION: 'requisitosInscripcion',
   UNILINEA: 'unilinea'
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
   Modality: Modality,
   Default: Default,
   Messages: Messages,
   HighSchoolSpeechStep: HighSchoolSpeechStep,
   CollegeSpeechStep: CollegeSpeechStep,
   QuestionsPack: QuestionsPack,
   MediaTypes: MediaTypes,
   MediaAttachments: MediaAttachments
}