import { Bot } from 'grammy';

export default function runBot(token: string) {
    const bot = new Bot(token);

    bot.command('start', ctx => ctx.reply('Welcome!'));
    bot.on('message', ctx => ctx.reply('Pong'));

    console.log('Bot started!');
    bot.start().then(() => console.log('Bot finished!'));
}
