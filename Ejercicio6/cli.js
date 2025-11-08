// cli.js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { suma, resta, multiplicacion, division } from './math.js';

yargs(hideBin(process.argv))
  .command('saludar', 'Saludo personalizado', {
    nombre: { demandOption: true, alias: 'n', type: 'string' }
  }, (argv) => {
    console.log(`Hola ${argv.nombre}!`);
  })
  .command('despedir', 'Despedida personalizada', {
    nombre: { demandOption: true, alias: 'n', type: 'string' }
  }, (argv) => {
    console.log(`Adiós ${argv.nombre}!`);
  })
  .command('calcular', 'Realiza operaciones matemáticas', {
    operacion: { demandOption: true, alias: 'o', choices: ['suma', 'resta', 'multiplicacion', 'division'] },
    n1: { demandOption: true, type: 'number' },
    n2: { demandOption: true, type: 'number' }
  }, (argv) => {
    let resultado;
    switch (argv.operacion) {
      case 'suma': resultado = suma(argv.n1, argv.n2); break;
      case 'resta': resultado = resta(argv.n1, argv.n2); break;
      case 'multiplicacion': resultado = multiplicacion(argv.n1, argv.n2); break;
      case 'division': resultado = division(argv.n1, argv.n2); break;
    }
    console.log(`Resultado: ${resultado}`);
  })
  .command('leer-json', 'Lee un archivo JSON', {
    archivo: { demandOption: true, alias: 'a', type: 'string' }
  }, (argv) => {
    try {
      const data = fs.readFileSync(argv.archivo, 'utf8');
      console.log("Contenido del JSON:", JSON.parse(data));
    } catch (err) {
      console.error(`Error al leer el archivo: ${err.message}`);
    }
  })
  .help()
  .argv;
