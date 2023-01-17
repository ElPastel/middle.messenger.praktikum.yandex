import btnTmpl from '../components/button/btn';

export const createButton = function (route, value) {
    const htmlTpl = document.createElement('div');
    const props = {
        route: route,
        value: value,
    }
    htmlTpl.innerHTML = btnTmpl(props);   
    root.append(htmlTpl);
}