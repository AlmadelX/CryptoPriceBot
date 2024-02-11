import { CommandContext, Context } from 'grammy';
import type { Message } from 'grammy/types';

import {
    CryptoCurrencyNotFoundError,
    CryptoCurrencyPriceNotFoundError,
} from '../../services/CoinMarketCap/CoinMarketCapError';
import getPriceOfCryptocurrency from '../../services/CoinMarketCap';

import text from '../../../assets/text.json';

export default async function priceHandler(ctx: CommandContext<Context>): Promise<Message.TextMessage> {
    const query = ctx.match.trim();

    if (query === '') {
        return ctx.reply(text['command:price:empty-query']);
    }

    return getPriceOfCryptocurrency(query)
        .then(price => ctx.reply(`$${price}`))
        .catch(error => {
            if (error instanceof CryptoCurrencyNotFoundError || error instanceof CryptoCurrencyPriceNotFoundError) {
                return ctx.reply(text['command:price:not-found']);
            }

            console.log(error.message);

            return ctx.reply(text['command:price:internal-error']);
        });
}
