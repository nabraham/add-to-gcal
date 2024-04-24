import { Parser } from "./parser.type.js";

var parsers: Parser[] = [{
    name: 'default',
    description: 'Date(<input>)',
    group: (s: string) => {
        let date = new Date(s);
        return date.toString() !== 'Invalid Date' ? date : undefined;
    },
    format: (groups: any) => {
        return groups;
    }
}];

export { parsers };