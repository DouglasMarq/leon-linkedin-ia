import { injectable } from "inversify";
import Debug, { Debugger } from "debug";

@injectable()
export default class Log {
    public readonly log: Debugger;
    constructor() {
        this.log = Debug(`linkedinbot:debug`);
    }
}
