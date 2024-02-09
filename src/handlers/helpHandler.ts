import { CommandContext, Context } from 'grammy';
import type { Message } from 'grammy/types';

import text from '../../assets/text.json';

export default async function helpHandler(ctx: CommandContext<Context>): Promise<Message.TextMessage> {
    return ctx.reply(text['command:help:reply'], { parse_mode: 'MarkdownV2' });
}
