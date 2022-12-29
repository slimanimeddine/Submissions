import { diagnonses } from "../data/diagnonses";

import { Diagnose } from "../types";

const getEntries = ():Diagnose[] => {
    return diagnonses;
};

export default {
    getEntries
};