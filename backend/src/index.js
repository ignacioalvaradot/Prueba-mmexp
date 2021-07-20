require('dotenv').config();

//Iniciar un servidor
const app = require('./app');
require('./database');

//Espera a funcionalidades asincronas
async function main(){
    await app.listen(app.get('port'));
    console.log('servidor en puerto', app.get('port'));
}

main();
