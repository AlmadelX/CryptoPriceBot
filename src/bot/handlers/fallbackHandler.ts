import { Context, Filter } from 'grammy';
import type { Message } from 'grammy/types';

import text from '../../../assets/text.json';

export default function fallbackHandler(ctx: Filter<Context, 'message'>): Promise<Message.TextMessage> {
    return ctx.reply(text['command:fallback:reply']);
}
