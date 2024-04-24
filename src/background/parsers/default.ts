import { Parser } from './parser.type.js';

const parsers: Parser[] = [
    {
        name: 'default',
        description: 'Date(<input>)',
        group: (s: string) => {
            const date = new Date(s);
            return date.toString() !== 'Invalid Date' ? date : undefined;
        },
        format: (groups: any) => {
            return groups;
        },
    },
];

export { parsers };
