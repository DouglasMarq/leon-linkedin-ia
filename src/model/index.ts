import { inject, injectable } from 'inversify';
import Invites from './invites';
import { format } from 'date-fns';
import Cron from "node-cron";
import { Invite } from '../constants/interfaces';
import Log from '../utils/log';

@injectable()
export default class Core {
    private readonly _cron;

    constructor(@inject(Invites) private readonly invite: Invites,
    @inject(Log) private readonly console: Log) {
        this._cron = Cron;
    }

    async setup() {
        this._cron.schedule(`* * * * *`, async () => {
            this.console.log(`Starting Invite verification`);
            let user: Invite = (await this.invite.getInvites).map((item: any) => {
                return {
                    id: item.profile.profileId,
                    name: `${item.profile.firstName} ${item.profile.lastName}`,
                    sentDate: format(new Date(item.sentTime), "dd/MM/yyyy"),
                    message: item.message || null,
                    invitationId: item.mailboxItemId.split(":")[item.mailboxItemId.split(":").length-1],
                    invitationSharedSecret: item.sharedSecret,
                }
            })[0];

            if(user && user.message) this.invite.acceptInviteAndSendMessage(user.invitationId, user.invitationSharedSecret, user.id, user.name, user.message);
            else if (user && !user.message) this.invite.acceptInvite(user.invitationId, user.invitationSharedSecret);

            this.console.log(`Finished Invite verification`);
        });
    }
}
