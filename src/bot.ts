import { Bot } from 'grammy';

import text from '../assets/text.json';

async function setupBot(token: string): Promise<Bot> {
    const bot = new Bot(token);

    await bot.api.setMyCommands([
        { command: 'help', description: text['command:help:description'] },
        {
            command: 'price',
            description: text['command:price:description'],
        },
    ]);

    bot.command('start', ctx => ctx.reply('Welcome!'));
    bot.on('message', ctx => ctx.reply('Pong'));

    return bot;
}

export default async function runBot(token: string): Promise<void> {
    const bot = await setupBot(token);

    console.log('Bot started');
    bot.start().then(() => console.log('Bot finished'));
}
