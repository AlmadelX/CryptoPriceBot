import { CryptoCurrencyNotFoundError, CryptoCurrencyPriceNotFoundError } from './CoinMarketCapError';
import { ICryptoCurrency, ICryptoCurrencyQuote } from './interfaces';
import { getCryptocurrenciesListFromAPI } from './api';

function getCurrencyBySymbol(currencies: ICryptoCurrency[], query: string): ICryptoCurrency | null {
    const normalizedQuery = query.trim().toLocaleUpperCase();

    const searchResult = currencies.find(currency => currency.symbol === normalizedQuery);

    return searchResult ?? null;
}

function getCurrencyByName(currencies: ICryptoCurrency[], query: string): ICryptoCurrency | null {
    // Replace all space symbols with just a single space.
    const normalizedQuery = query.toLocaleLowerCase().replace(/\s+/g, ' ').trim();

    const searchResult = currencies.find(currency => {
        const normalizedName = currency.name.toLocaleLowerCase();

        return normalizedName === normalizedQuery;
    });

    return searchResult ?? null;
}

function getCurrencyQuoteByName(currency: ICryptoCurrency, query: string): ICryptoCurrencyQuote | null {
    const searchResult = currency.quotes.find(quote => quote.name === query);

    return searchResult ?? null;
}

export default async function getPriceOfCryptocurrency(query: string): Promise<number> {
    const currenciesList = await getCryptocurrenciesListFromAPI();

    const currency = getCurrencyBySymbol(currenciesList, query) ?? getCurrencyByName(currenciesList, query);
    if (!currency) {
        throw new CryptoCurrencyNotFoundError();
    }

    const quote = getCurrencyQuoteByName(currency, 'USD');
    if (!quote) {
        throw new CryptoCurrencyPriceNotFoundError();
    }

    const price = Math.round(quote.price * 100) / 100;

    return price;
}
