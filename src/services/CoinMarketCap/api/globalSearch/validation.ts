import { isNumber, isObject, isString } from '../common/validation';
import { ResponseBodyValidationError } from '../../CoinMarketCapError';

function validateTokenSearchSuggestion(tokenSearchSuggestion: unknown): void {
    if (isObject(tokenSearchSuggestion)) {
        if ('id' in tokenSearchSuggestion && isNumber(tokenSearchSuggestion.id)) {
            if ('name' in tokenSearchSuggestion && isString(tokenSearchSuggestion.name)) {
                if ('symbol' in tokenSearchSuggestion && isString(tokenSearchSuggestion.symbol)) {
                    return; // Validation succeeded.
                } else {
                    throw new ResponseBodyValidationError('`tokenSearchSuggestion.symbol` is not a string');
                }
            } else {
                throw new ResponseBodyValidationError('`tokenSearchSuggestion.name` is not a string');
            }
        } else {
            throw new ResponseBodyValidationError('`tokenSearchSuggestion.id` is not a number');
        }
    } else {
        throw new ResponseBodyValidationError('`tokenSearchSuggestion` is not an object');
    }
}

function validateTokenSearchSuggestions(tokenSearchSuggestions: unknown): void {
    if (isObject(tokenSearchSuggestions)) {
        if ('tokens' in tokenSearchSuggestions && Array.isArray(tokenSearchSuggestions.tokens)) {
            for (const tokenSearchSuggestion of tokenSearchSuggestions.tokens) {
                validateTokenSearchSuggestion(tokenSearchSuggestion);
            }
        } else {
            throw new ResponseBodyValidationError('`tokenSearchSuggestions.tokens` is not an array');
        }
    } else {
        throw new ResponseBodyValidationError('`tokenSearchSuggestions` is not an object');
    }
}

export function validateResponseBody(responseBody: unknown): void {
    if (isObject(responseBody)) {
        if ('data' in responseBody && isObject(responseBody.data)) {
            if ('suggestions' in responseBody.data && Array.isArray(responseBody.data.suggestions)) {
                if (responseBody.data.suggestions.length) {
                    const tokenSuggestions = responseBody.data.suggestions.find(suggestions => {
                        return isObject(suggestions) && 'type' in suggestions && suggestions.type === 'token';
                    });

                    if (tokenSuggestions) {
                        validateTokenSearchSuggestions(tokenSuggestions);
                    }
                }
            } else {
                throw new ResponseBodyValidationError('`responseBody.data.suggestions` is not an array');
            }
        } else {
            throw new ResponseBodyValidationError('`responseBody.data` is not an object');
        }
    } else {
        throw new ResponseBodyValidationError('`responseBody` is not an object');
    }
}
