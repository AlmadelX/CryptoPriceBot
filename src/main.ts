// import 'dotenv/config';

import getPriceOfCryptocurrency from './services/CoinMarketCap';

// import runBot from './bot';

// const token = process.env.BOT_TOKEN;

// if (token) {
//     runBot(token);
// } else {
//     console.log('Error: BOT_TOKEN is not specified!');
//     process.exit(1);
// }

getPriceOfCryptocurrency('rndr')
    .then(price => console.log(price))
    .catch(error => console.log(error));
