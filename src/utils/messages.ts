import { injectable } from "inversify";

@injectable()
export class Messages {
    constructor() {

    }

    greetings(profileName?: string, words?: string) {
        return `Olá ${profileName}, sou Leon, o assistente virtual de Douglas dentro da plataforma da LinkedIn. \n
        Vi que sua mensagem contém as seguintes palavras: [${words}], no momento, Douglas não está procurando por novos desafios. \n
        Mas fique tranquilo(a)(e), irei avisa-lo de sua solicitação, obrigado por oferece-lo uma oportunidade! \n
        Até mais, \n
        Leon e Douglas.`;
    }

}
