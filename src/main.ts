// import 'dotenv/config';

import { getCryptocurrency } from './services/CoinMarketCap/api/listing';

// import runBot from './bot';

// const token = process.env.BOT_TOKEN;

// if (token) {
//     runBot(token);
// } else {
//     console.log('Error: BOT_TOKEN is not specified!');
//     process.exit(1);
// }

getCryptocurrency(2).then(result => console.log(result));
