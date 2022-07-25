// ==================================================================================
// Utilidades de la aplicación
// ==================================================================================

const e = require('../misc/enums');
const apiHandler = require('../facebookAPIHandler');
const responseButtons = require('../buttons/responseButtons');
const init = require('../buttons/initButtons');
const replies = require('../messages/replies');
const { RepliesPayloads } = require('../misc/enums');

const sleep = () => {
   return new Promise(function (resolve) {
      setTimeout(resolve, 750);
   });
};

module.exports = {
   // Envia un lote de mensajes seguidos
   sendMessages: async function (messagesArr, sender_psid) {
      console.log(messagesArr);
      for await (let msg of messagesArr) {
         let response = null;
         response = { "text": msg }

         await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

         await sleep();

         await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, response))
            .then(res => console.log(res));
      }
   },

   // Envia el siguiente lote de preguntas con respuesta rapída
   sendNextQuestions: async function (sender_psid, payload, message) {
      let buttons;

      switch (payload) {
         case e.RepliesPayloads.PRODUCTOSNOENCONTRADOS:
            buttons = init.getAsesorButton();
            break;
         case e.RepliesPayloads.CARRITO:
         case e.RepliesPayloads.VERCARRITO:
            buttons = init.getCarritoButtons();
            break;
         default:
            buttons = init.getInitialButtons();
            break;
      }

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(
         apiHandler.createAPIRequest('message',
            sender_psid,
            apiHandler.getQuickReplyTemplate(message, buttons)))
         .then(res => console.log(res));
   },

   // Envia el siguiente lote de preguntas con botón
   sendNextButtonQuestions: async function (sender_psid, dataConfig, message) {
      let buttons = dataConfig;
      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getButtonTemplate(message, buttons)))
         .then(res => console.log(res));
   },

   // Envia el siguiente lote con plantilla generica
   sendNextGenericResponse: async function (sender_psid, message = null) {
      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getGenericTemplate()))
         .then(res => console.log(res));
   },

   // Envia el siguiente lote de preguntas multimedia
   sendNextMediaQuestions: async function (sender_psid, attachmentId, mediaType) {
      await apiHandler.callSendAPI(apiHandler.createAPIRequest('typing_on', sender_psid));

      await sleep();

      await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getMediaTemplate(attachmentId, mediaType)))
         .then(res => console.log(res));
   },

   // Obtiene el horario de atencion
   getOfficeHours: function () {
      const day = new Date(new Date().toUTCString()).getDay();
      const hour = module.exports.convertUtcToLocalTime(
         new Date(new Date().toUTCString()).getHours());

      let message = true;

      if (day != 0) {
         if (hour >= 14 && hour <= 16) { // Horario de comida.
            message = "Nuestros asesores se encuentran en horario de comida, su mensaje sera atendido en cuanto regresen.";
         }
         else if (hour < 10) { // Horario antes de incio de horarios de atención.
            message = "Nuestros asesores aun no entran en horario de atencion, su mensaje sera antendido a partir de las 10 am."
         }
         else if (hour > 18 && day != 6) { // Lunes a Viernes fuera de horario de atención.
            message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia de mañana a partir de las 10 am.";
         }
         else if (hour > 16 && day == 6) { // Sábado fuera de horario de atención.
            message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia Lunes a partir de las 10 am.";
         }
      }
      else // Domingo
         message = "Nuestros asesores ya no se encuentran en horario de atención, su mensaje sera atendido el dia Lunes a partir de las 10 am.";

      return message;
   },

   // Convierte a horario local
   convertUtcToLocalTime: function (time) {
      let localTIme;

      if (time == 0) localTIme = 19;
      else if (time == 1) localTIme = 20;
      else if (time == 2) localTIme = 21;
      else if (time == 3) localTIme = 22;
      else if (time == 4) localTIme = 23;
      else if (time == 5) localTIme = 0;
      else localTIme = time - 5;

      return localTIme;
   },

   // Genera una orden de compra
   createOrder: async function (sender_psid, productId) {
      this.executeNonQuery(`INSERT INTO [dbo].[Orders] ([nInventoryId],[dOrderDate],[nUserId]) VALUES (${productId},GETDATE(),'${sender_psid}')`);
   },

   // Agrega direccion a la orden
   addOrderAddress: async function (sender_psid, address) {
      this.executeNonQuery(`
         INSERT INTO [dbo].[OrderDetail] ([nOrderId],[sAddressId])
         SELECT nOrderId, '${address}' FROM [dbo].[Orders] WHERE nUserId = '${sender_psid}' AND CAST(dOrderDate AS DATE) = CAST(GETDATE() AS DATE)`);
   },

   // Regresa los productos agregados al carrito
   searchOrder: async function (recievedPayload, sender_psid) {
      console.log(123);
      var Connection = require('tedious').Connection;
      var Request = require('tedious').Request;

      var config = {
         server: 'tokyoserver.database.windows.net',
         authentication: {
            type: 'default',
            options: {
               userName: 'tokyoAdmin',
               password: 't0ky04Dm1nP4SS;'
            }
         },
         options: {
            port: 1433,
            database: 'tokyoDB'
         }
      };

      const connection = new Connection(config);

      connection.connect((err) => {
         if (err) {
            console.log('Connection Failed');
            throw err;
         }
         
         let query = 
            `SELECT nOrderId, inv.sConcept
            FROM [dbo].[Orders] ord
            INNER JOIN [dbo].[Inventory] inv ON ord.nInventoryId = inv.nInventoryId
            WHERE nUserId = '${sender_psid}' AND CAST(dOrderDate AS DATE) = CAST(GETDATE() AS DATE)`
         ;

         let resultArr = [];
         let element = null;

         const request = new Request(query, (err, rowCount) => {
            if (err) {
               throw err;
            }
            connection.close();
         });

         request.on('row', (columns) => {
            columns.forEach((column) => {
               console.log(column.metadata.colName + ":" + column.value);
               if (column.metadata.colName === 'sConcept') {
                  resultArr.push(column.value);
               }
            });
         });

         request.on('doneInProc', async (rowCount, more) => {
            if (resultArr.length > 0) {
               console.log(recievedPayload);
               console.log(resultArr);
               await this.sendMessages(replies.getMessages(recievedPayload), sender_psid);
               await this.sendMessages(resultArr, sender_psid);
               await this.sendNextQuestions(sender_psid, recievedPayload, replies.getNextQuestion(recievedPayload));
            }
            else {
               await this.sendMessages(replies.getMessages(RepliesPayloads.PEDIDOVACIO), sender_psid);
               await this.sendNextQuestions(sender_psid,e.Default.EMPEZAR, replies.getNextQuestion(e.Default.EMPEZAR));
            }

         });

         connection.execSql(request);
      });     
   },

   // Busca un producto
   searchProduct: async function (message, recievedPayload, sender_psid) {
      var Connection = require('tedious').Connection;
      var Request = require('tedious').Request;

      var config = {
         server: 'tokyoserver.database.windows.net',
         authentication: {
            type: 'default',
            options: {
               userName: 'tokyoAdmin',
               password: 't0ky04Dm1nP4SS;'
            }
         },
         options: {
            port: 1433,
            database: 'tokyoDB'
         }
      };

      const connection = new Connection(config);

      connection.connect((err) => {
         if (err) {
            console.log('Connection Failed');
            throw err;
         }
         
         let query = "SELECT * FROM [dbo].[Inventory] WHERE sConcept LIKE '%" + message + "%'";
         let resultArr = [];
         let element = null;

         const request = new Request(query, (err, rowCount) => {
            if (err) {
               throw err;
            }
            connection.close();
         });

         request.on('row', (columns) => {
            columns.forEach((column) => {
               console.log(column.metadata.colName + ":" + column.value);
               if (column.value !== null) {
                  if (column.metadata.colName === 'nInventoryId') {
                     element = {
                        title: null,
                        image_url: "https://cdn.glitch.global/d53d8ec1-7812-45fc-b6b4-ed973732bbdd/286714343_127795616590000_8616241801724929432_n.jpg?v=1658726864309",
                        subtitle: null,
                        buttons: [{
                           type: "postback",
                           title: "Agregar al carrito",
                           payload: 'carrito_' + column.value
                        }]
                     };
                  }
                  else {
                     if (column.metadata.colName === 'sConcept') {
                        element.title = column.value;
                     }
                     if (column.metadata.colName === 'nPrice') {
                        element.subtitle = "$" + column.value;
                     }
                  }
               }
            });

            resultArr.push(element);
         });

         request.on('doneInProc', async (rowCount, more) => {
            await this.sendMessages(replies.getMessages(recievedPayload), sender_psid);
            let finalArr = chunkArray(resultArr);
            
            for (let i = 0; i < finalArr.length; i ++)
              await apiHandler.callSendAPI(apiHandler.createAPIRequest('message', sender_psid, apiHandler.getGenericTemplate(finalArr[i])));
         
            if (finalArr.length > 0)
               await this.sendNextQuestions(sender_psid, recievedPayload, replies.getNextQuestion(recievedPayload));
            else
               await this.sendNextQuestions(sender_psid, RepliesPayloads.PRODUCTOSNOENCONTRADOS, replies.getNextQuestion(RepliesPayloads.PRODUCTOSNOENCONTRADOS));
         });
        
        function chunkArray(array) {
           let resultArr = [];
           const chunkSize = 5;
           for (let i = 0; i < array.length; i += chunkSize) {
              const chunk = array.slice(i, i + chunkSize);
              resultArr.push(chunk);
           }

           return resultArr;
        }

         connection.execSql(request);
      });     
   },

   executeNonQuery: async function (queryStmt) {
      var Connection = require('tedious').Connection;
      var Request = require('tedious').Request;

      var config = {
         server: 'tokyoserver.database.windows.net',
         authentication: {
            type: 'default',
            options: {
               userName: 'tokyoAdmin',
               password: 't0ky04Dm1nP4SS;'
            }
         },
         options: {
            port: 1433,
            database: 'tokyoDB'
         }
      };

      const connection = new Connection(config);

      connection.connect((err) => {
         if (err) {
            console.log('Connection Failed');
            throw err;
         }

         const request = new Request(queryStmt, (err, rowCount) => {
            if (err) {
               throw err;
            }
            connection.close();
         });

         request.on('doneInProc', async (rowCount, more) => {
            console.log('Query executed with no errors');
         });

         connection.execSql(request);
      });
   },
}