import { isNumber, isObject, isString } from '../common/validation';
import { ResponseBodyValidationError } from '../../CoinMarketCapError';

function validateQuote(quote: unknown): void {
    if (isObject(quote)) {
        if ('name' in quote && isString(quote.name)) {
            if ('price' in quote && isNumber(quote.price)) {
                return; // Validation succeeded.
            } else {
                throw new ResponseBodyValidationError('`quote.price` is not a number');
            }
        } else {
            throw new ResponseBodyValidationError('`quote.name` is not a string');
        }
    } else {
        throw new ResponseBodyValidationError('`quote` is not an object');
    }
}

function validateCryptocurrency(cryptocurrency: unknown): void {
    if (isObject(cryptocurrency)) {
        if ('id' in cryptocurrency && isNumber(cryptocurrency.id)) {
            if ('name' in cryptocurrency && isString(cryptocurrency.name)) {
                if ('symbol' in cryptocurrency && isString(cryptocurrency.symbol)) {
                    if ('quotes' in cryptocurrency && Array.isArray(cryptocurrency.quotes)) {
                        if (cryptocurrency.quotes.length) {
                            validateQuote(cryptocurrency.quotes[0]);
                        }
                    } else {
                        throw new ResponseBodyValidationError('`cryptocurrency.quotes` is not an array');
                    }
                } else {
                    throw new ResponseBodyValidationError('`cryptocurrency.symbol` is not a string');
                }
            } else {
                throw new ResponseBodyValidationError('`cryptocurrency.name` is not a string');
            }
        } else {
            throw new ResponseBodyValidationError('`cryptocurrency.id` is not a number');
        }
    } else {
        throw new ResponseBodyValidationError('`cryptocurrency` is not an object');
    }
}

export function validateResponseBody(responseBody: unknown): void {
    if (isObject(responseBody)) {
        if ('data' in responseBody && isObject(responseBody.data)) {
            if ('cryptoCurrencyList' in responseBody.data && Array.isArray(responseBody.data.cryptoCurrencyList)) {
                if (responseBody.data.cryptoCurrencyList.length) {
                    validateCryptocurrency(responseBody.data.cryptoCurrencyList[0]);
                }
            } else {
                throw new ResponseBodyValidationError('`responseBody.data.cryptoCurrencyList` is not an array');
            }
        } else {
            throw new ResponseBodyValidationError('`responseBody.data` is not an object');
        }
    } else {
        throw new ResponseBodyValidationError('`responseBody` is not an object');
    }
}
