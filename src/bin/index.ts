import { Client } from 'linkedin-private-api';
import Core from '../service';
import getContainer from './container';

(async () => {
    await getContainer().get<Client>(Client).login.userPass({
        username: process.env.ACCOUNT!,
        password: Buffer.from(process.env.PASSWORD!, 'base64').toString()
    });
    getContainer().get<Core>(Core).setup();
})();
