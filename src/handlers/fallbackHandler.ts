import { Context, Filter } from 'grammy';

import text from '../../assets/text.json';

export default function fallbackHandler(ctx: Filter<Context, 'message'>) {
    return ctx.reply(text['command:fallback:reply']);
}
