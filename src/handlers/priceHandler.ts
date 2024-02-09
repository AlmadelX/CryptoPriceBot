import { CommandContext, Context } from 'grammy';

export default async function priceHandler(ctx: CommandContext<Context>): Promise<void> {
    ctx.reply('price');
}
