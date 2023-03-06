import Block, { T } from "../block/block";

class SomePage extends Block<T>{
    render(): string | DocumentFragment {
        const content =  new DocumentFragment();
        const paragraph = document.createElement('p');
        paragraph.textContent = 'page content';
        content.appendChild(paragraph);

        return content;
    }
}

const blockMock = new SomePage({ classAttr: 'content' }, 'main');

describe('Block', () => {
    test('should return element with given tagname', () => {
        expect(blockMock.element.tagName).toEqual('MAIN');
    })

    test('should return element with given content', () => {
        expect(blockMock.element.innerHTML).toEqual('<p>page content</p>');
    })

    test('should sets new element attributes', () => {
        expect(blockMock.element.getAttribute('class')).toEqual('content');
    })

    test('setProps() should sets new element props ', () => {
        blockMock.setProps({idAttr: 'paragraph'});
        expect(blockMock.element.getAttribute('id')).toEqual('paragraph');
    })

})
