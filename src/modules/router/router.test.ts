import Block, { T } from "../block/block";
import { Router } from "./router";

class SomePage extends Block<T>{
    render(): string | DocumentFragment {
        return new DocumentFragment();
    }
}

class OtherPage extends Block<T>{
    render(): string | DocumentFragment {
        return new DocumentFragment();
    }
}

document.body.innerHTML = '<div class="main"></div>'
const router = new Router('.main');

describe('Router', () => {
    test('use() should return Router instance', () => {
        const result = router.use('/test', SomePage, {});
        expect(result).toEqual(router);
    })

    test('transition to page change history', () => {
        window.history.pushState({}, 'Page', '/');
        window.history.pushState({}, 'OtherPage', '/otherpage');

        expect(window.history.length).toBe(3);
    })

    test('go() should go to page with given path', () => {
        router.use('/', SomePage, {}).use('/otherpage', OtherPage, {}).start();
        router.go('/')
        expect(window.location.pathname).toEqual('/');
    })
})
