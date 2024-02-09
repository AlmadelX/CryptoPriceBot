import { CommandContext, Context } from 'grammy';
import type { Message } from 'grammy/types';

import getPriceOf from '../services/CoinMarketCap';

export default async function priceHandler(ctx: CommandContext<Context>): Promise<Message.TextMessage> {
    const query = ctx.match;
    const price = await getPriceOf(query);

    return ctx.reply(price);
}
