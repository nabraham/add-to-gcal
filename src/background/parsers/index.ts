import { parsers as ebay } from './ebay.js';
import { parsers as default_parsers } from './default.js';
import { Parser } from './parser.type.js';

const parsers: Parser[] = [...ebay, ...default_parsers];

export { parsers };
