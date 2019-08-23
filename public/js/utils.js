//import { convert } from 'unit-converter';
var uc          = require('unit-converter');
var convert     = uc.convert ;

console.log(convert('10s').to('ms'));