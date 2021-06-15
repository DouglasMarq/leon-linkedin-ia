import { injectable } from "inversify";
import { Client } from 'linkedin-private-api';

@injectable()
export class LinkedinClient {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public get instance() { return this.client }
}
