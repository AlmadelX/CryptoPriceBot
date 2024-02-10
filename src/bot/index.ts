import { Bot } from 'grammy';
import { run } from '@grammyjs/runner';

import fallbackHandler from './handlers/fallbackHandler';
import helpHandler from './handlers/helpHandler';
import priceHandler from './handlers/priceHandler';
import startHandler from './handlers/startHandler';

import text from '../../assets/text.json';

async function setupBot(token: string): Promise<Bot> {
    const bot = new Bot(token);

    await bot.api.setMyCommands([
        { command: 'help', description: text['command:help:description'] },
        {
            command: 'price',
            description: text['command:price:description'],
        },
    ]);

    bot.command('start', startHandler);
    bot.command('help', helpHandler);
    bot.command('price', priceHandler);

    bot.on('message', fallbackHandler);

    return bot;
}

export default async function runBot(token: string): Promise<void> {
    const bot = await setupBot(token);

    console.log('Bot started');
    run(bot);
}
