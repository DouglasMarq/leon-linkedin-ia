import { inject, injectable } from "inversify";
import { LinkedinClient } from "./client";
import { get } from 'config';
import { Messages } from "../utils/messages";
import { Log } from "../utils/log";

@injectable()
export class Invites {
    private words: string[] = get('words.whitelist');
    constructor(@inject(LinkedinClient) private readonly client: LinkedinClient,
    @inject(Messages) private readonly messages: Messages,
    @inject(Log) private readonly console: Log) {

    }

    async acceptInvite(invitationId: string, invitationSharedSecret: string) {
        this.console.log("Aceitando convite", true);
        return await this.client.instance.request.post(`relationships/invitations/${invitationId}?action=accept`, {
            invitationId: invitationId,
            invitationSharedSecret: invitationSharedSecret,
            isGenericInvitation: false
        });
    }

    async acceptInviteAndSendMessage(invitationId: string, invitationSharedSecret: string, profileId: string, profileName: string, message?: string | null) {
        if(message) message = message.toUpperCase();
        //re-pensar
        else if (!message) message = null
        return await this.client.instance.request.post(`relationships/invitations/${invitationId}?action=accept`, {
            invitationId: invitationId,
            invitationSharedSecret: invitationSharedSecret,
            isGenericInvitation: false
        }).then(() => {
            if(!message) return;

            let passedWords: string = "";
            for(let i in this.words) {
                if(message.includes(this.words[i])) {
                    passedWords += `${this.words[i]} `;
                }
            }
            const text = this.messages.greetings(profileName, passedWords);
            this.sendMessage(profileId, text);
        });
    }

    private sendMessage(profileId: string, text: string) {
        setTimeout(async () => {
            return await this.client.instance.message.sendMessage({profileId: profileId, text: text});
        }, 3000)
    }

    get getInvites() {
        return this.client.instance.invitation.getReceivedInvitations().scrollNext();
    }
}
