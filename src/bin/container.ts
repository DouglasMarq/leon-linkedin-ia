import { Container } from 'inversify';
import { Client } from 'linkedin-private-api';
import Core from '../service';
import Invites from '../service/invites';
import WordBlacklist from '../utils/blacklist';
import Log from '../utils/log';
import Messages from '../utils/messages';

let container: Container;

export default function getContainer() {
    if (!container) bindContainers();

    return container;
}

function bindContainers() {
    container = new Container();

    container.bind<Client>(Client).toConstantValue(new Client());
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Invites>(Invites).to(Invites).inSingletonScope();
    container.bind<Log>(Log).to(Log).inSingletonScope();
    container.bind<Messages>(Messages).to(Messages).inSingletonScope();
    container.bind<WordBlacklist>(WordBlacklist).to(WordBlacklist).inSingletonScope();

    return container;
}
