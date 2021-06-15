import { Container } from 'inversify';
import { LinkedinClient } from '../model/client';
import { Core } from '../model';
import { Invites } from '../model/invites';
import { Log } from '../utils/log';

let container = new Container();

export default function IoC() {

    container.bind<LinkedinClient>(LinkedinClient).to(LinkedinClient).inSingletonScope();
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Invites>(Invites).to(Invites).inSingletonScope();
    container.bind<Log>(Log).to(Log).inSingletonScope();

    return container;
}
