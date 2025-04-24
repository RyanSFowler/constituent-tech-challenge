import { Parser } from 'json2csv';
import { Constituent } from '../models/Constituent';

export const toCsv = (data: Constituent[]): string  =>{
  const parser = new Parser();
  return parser.parse(data);
}
