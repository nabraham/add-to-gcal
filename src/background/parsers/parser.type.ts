interface Parser {
    name: string,
    description: string,
    group: (s: string) => any,
    format: (v: any) => Date 
}

export { Parser };
