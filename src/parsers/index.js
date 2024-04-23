import { parsers as ebay } from "./ebay";
import { parsers as default_parsers } from "./default";

var parsers = [
    ...ebay,
    ...default_parsers
];

export { parsers };