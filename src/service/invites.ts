import { inject, injectable } from "inversify";
import Messages from "../utils/messages";
import { Client } from "linkedin-private-api";
import WordBlacklist from "../utils/blacklist";

@injectable()
export default class Invites {
  private words: string[];

  constructor(@inject(Client) private readonly client: Client,
    @inject(Messages) private readonly messages: Messages,
    @inject(WordBlacklist) private readonly wordBL: WordBlacklist) {
    this.words = wordBL.wordBlacklist;
  }

  async acceptInvite(invitationId: string, invitationSharedSecret: string) {
    return this.client.request.post(`relationships/invitations/${invitationId}?action=accept`, {
      invitationId: invitationId,
      invitationSharedSecret: invitationSharedSecret,
      isGenericInvitation: false
    });
  }

  async acceptInviteAndSendMessage(invitationId: string,
    invitationSharedSecret: string,
    profileId: string,
    profileName: string,
    message: string | null = null) {
    let passedWords: string = "";
    if (message) message = message.toUpperCase();

    await this.acceptInvite(invitationId, invitationSharedSecret);

    if (!message) return;

    for (let i in this.words) {
      if (message.includes(this.words[i])) passedWords += `${this.words[i]} `;
    }

    const text = this.messages.greetings(profileName, passedWords);

    this.sendMessage(profileId, text);
  }

  private sendMessage(profileId: string, text: string) {
    setTimeout(async () => {
      return this.client.message.sendMessage({ profileId: profileId, text: text });
    }, 4000);
  }

  get getInvites() {
    return this.client.invitation.getReceivedInvitations().scrollNext();
  }
}
