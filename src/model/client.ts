import { injectable } from "inversify";
import { Client } from 'linkedin-private-api';

@injectable()
export class LinkedinClient {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    getInstance() {
        return this.client;
    }
}
