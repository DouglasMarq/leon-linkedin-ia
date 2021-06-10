import { Container } from 'inversify';
import { LinkedinClient } from '../model/client';
import { Core } from '../model';
import { Invites } from '../model/invites';

let container = new Container();

export default function IoC() {

    container.bind<LinkedinClient>(LinkedinClient).to(LinkedinClient).inSingletonScope();
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Invites>(Invites).to(Invites).inSingletonScope();

    return container;
}
