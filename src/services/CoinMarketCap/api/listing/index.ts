import axios from 'axios';

import { ICryptoCurrency, IResponseBody } from './interfaces';
import { GetResponseFromAPIError } from '../../CoinMarketCapError';
import { validateResponseBody } from './validation';

async function getResponseBody(id: number): Promise<IResponseBody> {
    const endpoint = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing';

    return axios
        .get(endpoint, { params: { ids: id } })
        .then(response => response.data)
        .catch(error => {
            throw new GetResponseFromAPIError(endpoint, error);
        });
}

export async function getCryptocurrency(id: number): Promise<ICryptoCurrency | null> {
    const responseBody = await getResponseBody(id);
    validateResponseBody(responseBody);

    const cryptocurrenciesList = responseBody.data.cryptoCurrencyList;
    const cryptocurrency = cryptocurrenciesList.find(cryptocurrency => cryptocurrency.id === id);

    return cryptocurrency ?? null;
}
