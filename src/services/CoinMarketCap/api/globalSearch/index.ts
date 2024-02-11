import axios from 'axios';

import { IResponseBody, ITokenSearchSuggestion, ITokenSearchSuggestions } from './interfaces';
import { GetResponseFromAPIError } from '../../CoinMarketCapError';
import { validateResponseBody } from './validation';

async function getResponseBody(keyword: string): Promise<IResponseBody> {
    const endpoint = 'https://api.coinmarketcap.com/gravity/v4/gravity/global-search';

    return axios
        .post(endpoint, {
            keyword,
            limit: 2,
            scene: 'community',
        })
        .then(response => response.data)
        .catch(error => {
            throw new GetResponseFromAPIError(endpoint, error);
        });
}

export async function getSearchSuggestions(keyword: string): Promise<ITokenSearchSuggestion[]> {
    const responseBody = await getResponseBody(keyword);
    validateResponseBody(responseBody);

    const suggestions = responseBody.data.suggestions;
    const tokenSearchSuggestions = suggestions.find(suggestions => suggestions.type === 'token') as
        | ITokenSearchSuggestions
        | undefined;

    return tokenSearchSuggestions?.tokens ?? [];
}
