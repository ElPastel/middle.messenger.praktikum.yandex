import { HttpTransport, queryStringify } from "./http";

const httpMock = new HttpTransport('https://jsonplaceholder.typicode.com/posts');
const data = {
    id: 99,
    login: 'myLogin'
};
const postData = {
    title: 'foo',
    body: 'bar',
    userId: 1,
};

interface IMock {
    id: number;
    title?: string;
    body?: string;
    userId?: number;
}

describe('HTTP', () => {

    test('queryStringify should return url query string from object', () => {
        const queryString = queryStringify(data);
        expect(queryString).toEqual('?id=99&login=myLogin');
    })

    test('get() should send GET request', async () => {
        const mockObj = await httpMock.get('/1') as unknown as IMock;
        expect(mockObj.id).toEqual(1);
    })

    test('post() should send POST request with data', async () => {
        // @ts-ignore
        const mockObj = await httpMock.post('/', postData) as unknown as IMock;
        expect(mockObj.id).toEqual(101);
    })
})

