import { inject, injectable } from 'inversify';
import { LinkedinClient } from './client';
import { Invites } from './invites';
import { format } from 'date-fns';
import { Log } from '../utils/log';

interface invite {
    id: string,
    name: string,
    sentDate: string,
    message: any,
    invitationId: string,
    invitationSharedSecret: string,
};

@injectable()
export class Core {
    private _invites: invite | undefined;


    constructor(@inject(LinkedinClient) public readonly client: LinkedinClient,
    @inject(Invites) private readonly invite: Invites,
    @inject(Log) private readonly console: Log) {
        this._invites = undefined;
    }

    async setup(timer: number = 4) {
        setInterval(async() => {
            this.console.log("Verificando por Convite");
            this.setInvite = (await this.invite.getInvites).map((item) => {
                return {
                    id: item.profile.profileId,
                    name: `${item.profile.firstName} ${item.profile.lastName}`,
                    sentDate: format(new Date(item.sentTime), "dd/MM/yyyy"),
                    //@ts-ignore
                    message: item.message || null,
                    invitationId: item.mailboxItemId.split(":")[item.mailboxItemId.split(":").length-1],
                    invitationSharedSecret: item.sharedSecret,
                }
            })[0];
            let user: any = this.getInvite;
            if(user && user.message !== null) {
                this.console.log(`Aceitando convite e enviando mensagem para: ${user}`);
                this.invite.acceptInviteAndSendMessage(user.invitationId, user.invitationSharedSecret, user.id, user.name, user.message);
            } else if (user && user.message === null) {
                this.invite.acceptInvite(user.invitationId, user.invitationSharedSecret)
            }
            this.console.log("Acabou a iteração");
        }, timer * 1000);
    }

    get getInvite() {
        return this._invites;
    }

    private set setInvite(invite: invite) {
        this._invites = invite;
    }
}
