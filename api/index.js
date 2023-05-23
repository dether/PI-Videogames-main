//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js'); // Importamos el servidor desde el archivo app.js
const { conn } = require('./src/db.js'); // Importamos la conexión a la base de datos desde el archivo db.js

/* Sincronizamos todos los modelos a la vez.
Sincronizamos todos los modelos de la base de datos. 
La opción force:true indica que se deben eliminar y recrear 
las tablas en la base de datos cada vez que se sincronice. 
Esto puede ser útil durante el desarrollo, pero en producción se debe utilizar con precaución.*/
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // Imprimimos un mensaje en la consola indicando que el servidor está escuchando en el puerto 3001
  });
});
