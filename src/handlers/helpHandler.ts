import { CommandContext, Context } from 'grammy';

import text from '../../assets/text.json';

export default async function helpHandler(ctx: CommandContext<Context>): Promise<void> {
    ctx.reply(text['command:help:reply'], { parse_mode: 'MarkdownV2' });
}
