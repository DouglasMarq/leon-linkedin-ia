import 'reflect-metadata';
import { Container } from 'inversify';

let container = new Container();

export default function IoC() {

    // container.bind<>().to().inSingletonScope();

    return container;
}
