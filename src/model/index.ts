import { inject, injectable } from 'inversify';
import { LinkedinClient } from './client';
import { Invites } from './invites';
import { format } from 'date-fns';

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
    @inject(Invites) private readonly invite: Invites) {
        this.invitesMap = undefined;
    }

    async setup(timer: number = 10) {
        setInterval(async() => {
            console.log(new Date() + "-- Verificando por Convite");
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
            if(user.message !== null) {
                console.log(`${new Date()} -- Aceitando convite e enviando mensagem para: `, user);
                this.invite.acceptInviteAndSendMessage(user.invitationId, user.invitationSharedSecret, user.id, user.name);
            } else {
                console.log(`${new Date()} -- Aceitando convite para: `, user);
                this.invite.acceptInvite(user.invitationId, user.invitationSharedSecret);
            }
        }, timer * 1000);
    }

    async getInvites() {
        return this.invitesMap;
    }
}
