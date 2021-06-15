import { get } from 'config';
import { Core } from '../model';
import { LinkedinClient } from '../model/client';
import Container from './container';

(async () => {
    let container = Container();
    await container.get<LinkedinClient>(LinkedinClient).instance.login.userPass({
        username: get('data.account'),
        password: get('data.password')
    });
    container.get<Core>(Core).setup();
})();
