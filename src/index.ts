import {UrlParser} from './url-parser';

console.log('testing good job');
const url: string = '/inbox;a=1/33;b=2/(messages/44//help:messages/123)(123:message/4344)?qparam1=2&qparam2=3#main-module';
console.log(`url is: ${url}`);
const parser : UrlParser = new UrlParser();
parser.parser(url);