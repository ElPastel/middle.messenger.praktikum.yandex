import Button from "../../components/button/btn";
import Error from "../../components/error/error";
import Layout from "../layout/layout";

const button = new Button({
    classAttr: 'btn__secondary',
    route: '',
    value: 'Back to homepage',
    linkColor: 'secondary'
});

const error404 = new Error({
    classAttr: 'error container flex-center',
    button: button,
    errorNumber: 404,
	errorText: 'Page not found',
});

const layout = new Layout({
    classAttr: 'container flex-center',
    content: error404,
})

const errorPage404 = layout;

export default errorPage404;
