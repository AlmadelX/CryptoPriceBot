// import {
//     CryptoCurrencyAmbiguousError,
//     CryptoCurrencyNotFoundError,
//     CryptoCurrencyPriceNotFoundError
// } from './CoinMarketCapError';
// import { ICryptoCurrency, ICryptoCurrencyQuote } from './interfaces';
// import { getCryptocurrenciesListFromAPI } from './api';

import { CryptoCurrencyNotFoundError, CryptoCurrencyPriceNotFoundError } from './CoinMarketCapError';
import { ICryptoCurrency, ICryptoCurrencyQuote } from './api/listing/interfaces';
import { getCryptocurrency } from './api/listing';
import { getSearchSuggestions } from './api/globalSearch';

function areNamesEqual(query: string, target: string): boolean {
    // Replace all space symbols with just a single space.
    const normalizedQuery = query.replace(/\s+/g, ' ').toLocaleLowerCase().trim();
    const normalizedTarget = target.toLocaleLowerCase();

    return normalizedQuery === normalizedTarget;
}

function areSymbolsEqual(query: string, target: string): boolean {
    const normalizedQuery = query.toLocaleUpperCase();

    return normalizedQuery === target;
}

async function getCryptocurrencyID(query: string): Promise<number> {
    const searchSuggestions = await getSearchSuggestions(query);
    if (!searchSuggestions.length) {
        throw new CryptoCurrencyNotFoundError();
    }

    const suggestion = searchSuggestions[0];
    if (!areNamesEqual(query, suggestion.name) && !areSymbolsEqual(query, suggestion.symbol)) {
        throw new CryptoCurrencyNotFoundError();
    }

    return suggestion.id;
}

async function getCryptocurrencyWithIDAndQuery(id: number, query: string): Promise<ICryptoCurrency> {
    const currency = await getCryptocurrency(id);
    if (!currency) {
        throw new CryptoCurrencyNotFoundError();
    }

    if (!areNamesEqual(query, currency.name) && !areSymbolsEqual(query, currency.symbol)) {
        throw new CryptoCurrencyNotFoundError();
    }

    return currency;
}

function getCurrencyQuoteByName(currency: ICryptoCurrency, query: string): ICryptoCurrencyQuote {
    const quote = currency.quotes.find(quote => quote.name === query);
    if (!quote) {
        throw new CryptoCurrencyPriceNotFoundError();
    }

    return quote;
}

function roundPrice(price: number) {
    let power = 2;
    while (price < 1.0) {
        price *= 10;
        ++power;
    }
    console.log(price);

    return Math.round(price * 100) / 10 ** power;
}

export default async function getNameAndPriceOfCryptocurrency(query: string): Promise<[string, number]> {
    const id = await getCryptocurrencyID(query);
    const currency = await getCryptocurrencyWithIDAndQuery(id, query);

    const quote = getCurrencyQuoteByName(currency, 'USD');
    const price = roundPrice(quote.price);

    return [currency.name, price];
}
