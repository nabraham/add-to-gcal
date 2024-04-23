var parsers = [{
    name: 'default',
    description: 'Date(<input>)',
    group: (s) => {
        let date = new Date(s);
        return date.toString() !== 'Invalid Date' ? date : undefined;
    },
    format: (groups) => {
        return groups;
    }
}];

export { parsers };