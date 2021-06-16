import { injectable } from "inversify";

@injectable()
export class Messages {
    constructor() {

    }

    greetings(profileName?: string, words?: string) {
        return `Olá ${profileName}, sou Leon, o assistente virtual do Douglas dentro da plataforma da LinkedIn.
        Vi que sua mensagem contém as seguintes palavras: [ ${words}]. Agradecemos o contato, porém no momento, Douglas não está procurando por novos desafios.
        Mas fique tranquilo(a)(e), irei avisá-lo de sua solicitação. Obrigado por oferecê-lo uma oportunidade!
        Até mais,
        Leon e Douglas.

        Se quiser saber mais sobre o projeto e esse bot, acesse: https://douglasmarques.io/true`;
    }

}
