import { inject, injectable } from 'inversify';
import { LinkedinClient } from './client';
import { Invites } from './invites';
import { format } from 'date-fns';
import { Log } from '../utils/log';

@injectable()
export class Core {
    private invitesMap: {
        id: string,
        name: string,
        sentDate: string,
        message: any,
        invitationId: string,
        invitationSharedSecret: string,
    }[] | undefined;

    constructor(@inject(LinkedinClient) public readonly client: LinkedinClient,
    @inject(Invites) private readonly invite: Invites,
    @inject(Log) private readonly console: Log) {
        this.invitesMap = undefined;
    }

    async setup(timer: number = 7) {
        setInterval(async() => {
            this.console.log("Verificando por Convite");
            this.invitesMap = (await this.invite.getInvites()).map((item) => {
                return {
                    id: item.profile.profileId,
                    name: `${item.profile.firstName} ${item.profile.lastName}`,
                    sentDate: format(new Date(item.sentTime), "dd/MM/yyyy"),
                    //@ts-ignore
                    message: item.message || null,
                    invitationId: item.mailboxItemId.split(":")[item.mailboxItemId.split(":").length-1],
                    invitationSharedSecret: item.sharedSecret,
                }
            });
            let user = this.invitesMap[0];
            if(user && user.message !== null) {
                this.console.log(`Aceitando convite e enviando mensagem para: ${user}`);
                this.invite.acceptInviteAndSendMessage(user.invitationId, user.invitationSharedSecret, user.id, user.name);
            } else if (user && user.message === null) {
                this.invite.acceptInvite(user.invitationId, user.invitationSharedSecret)
            }
            this.console.log("Acabou a iteração");
        }, timer * 1000);
    }

    get invites() {
        return this.invitesMap;
    }
}
