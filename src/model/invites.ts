import { inject, injectable } from "inversify";
import { LinkedinClient } from "./client";
import { get } from 'config';

@injectable()
export class Invites {
    constructor(@inject(LinkedinClient) private readonly client: LinkedinClient) {

    }

    async acceptInvite(invitationId: string, invitationSharedSecret: string) {
        return await this.client.getInstance().request.post(`relationships/invitations/${invitationId}?action=accept`, {
            invitationId: invitationId,
            invitationSharedSecret: invitationSharedSecret,
            isGenericInvitation: false
        });
    }

    async acceptInviteAndSendMessage(invitationId: string, invitationSharedSecret: string, profileId: string, profileName: string, message: string = "") {
        if(message) message = message.toUpperCase();
        return await this.client.getInstance().request.post(`relationships/invitations/${invitationId}?action=accept`, {
            invitationId: invitationId,
            invitationSharedSecret: invitationSharedSecret,
            isGenericInvitation: false
        }).then(async (res) => {
            let words: string[] = get('words.whitelist');
            let passedWords: string = "";
            for(let i in words) {
                if(message.includes(words[i])) {
                    passedWords += `${words[i]} `;
                }
            }
            const text: string = `Olá ${profileName}, sou Leon, o assistente virtual de Douglas dentro da plataforma da LinkedIn. \n
            Vi que sua mensagem contém as seguintes palavras: [${passedWords}], no momento, Douglas não está procurando por novos desafios. \n
            Mas fique tranquilo(a)(e), irei avisa-lo de sua solicitação, obrigado por oferece-lo uma oportunidade! \n
            Até mais, \n
            Leon e Douglas.`;
            this.sendMessage(profileId, text);
        });
    }

    private sendMessage(profileId: string, text: string) {
        setTimeout(async () => {
            return await this.client.getInstance().message.sendMessage({profileId: profileId, text: text});
        }, 4000)
    }

    async getInvites(skip?: number, limit?: number) {
        return await this.client.getInstance().invitation.getReceivedInvitations().scrollNext();
    }
}
