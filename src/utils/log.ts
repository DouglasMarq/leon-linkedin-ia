import { injectable } from "inversify";

@injectable()
export class Log {
    constructor() {

    }

    log(text: string = "", lines: boolean = false) {
        if(lines) this.lines();
        console.log(`${new Date()} -- ${text}`);
        if(lines) this.lines();
    }

    debug(text: string = "", lines: boolean = false) {
        if(lines) this.lines();
        console.debug(`${new Date()} -- ${text}`);
        if(lines) this.lines();
    }

    error(text: string = "", lines: boolean = false) {
        if(lines) this.lines();
        console.error(`${new Date()} -- ${text}`);
        if(lines) this.lines();
    }

    warn(text: string = "", lines: boolean = false) {
        if(lines) this.lines();
        console.warn(`${new Date()} -- ${text}`);
        if(lines) this.lines();
    }

    exception(text: string = "", lines: boolean = false) {
        if(lines) this.lines();
        console.exception(`${new Date()} -- ${text}`);
        if(lines) this.lines();
    }

    private lines() {
        console.log('---------------------');
    }
}
