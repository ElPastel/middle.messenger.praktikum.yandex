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

function queryStringify(data: {[key: string]: any} = {}): string {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys: string[] = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HttpTransport {
    get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers = {}, data, method } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );
            Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));

            xhr.onload = () => resolve(xhr);

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HttpTransport;
