enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    method?: METHODS;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<any>

function queryStringify(data: { [key: string]: any } = {}): string {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys: string[] = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}
const API_URL = 'https://ya-praktikum.tech/api/v2';

class HttpTransport {
    private readonly _apiUrl;

    constructor(apiUrl: string) {
        this._apiUrl = apiUrl;
    }

    public get: HTTPMethod = (url, options = {}) => {
        return this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET }, options.timeout);
    };

    public post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    public put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    public delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    private request = (url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers = {}, data, method } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, `${this._apiUrl}${url}`);

            Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));

            xhr.onreadystatechange = () => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            if (isGet && !data) {
                console.log('isGet');

                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data as XMLHttpRequestBodyInit);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default new HttpTransport(API_URL);
