import { inject, injectable } from "inversify";
import { Core } from ".";

@injectable()
export class IA {
    /**
     *
     */
    constructor(@inject(Core) private readonly core: Core) {

    }
}
