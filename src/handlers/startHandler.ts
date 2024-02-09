import { CommandContext, Context } from 'grammy';

import text from '../../assets/text.json';

export default async function startHandler(ctx: CommandContext<Context>): Promise<void> {
    ctx.reply(text['command:start:reply'], { parse_mode: 'MarkdownV2' });
}
