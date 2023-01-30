import Button from "../../components/button/btn";
import Error from "../../components/error/error";
import Layout from "../layout/layout";


const button = new Button({
    class: 'btn__secondary',
    route: '',
    value: 'Back to homepage',
    linkColor: 'secondary'
});

const error500 = new Error({
    class: ['error', 'container','flex-center'],
    button: button,
    errorNumber: 500,
	errorText: 'Oops! something went wrong.',
});

const layout = new Layout({
    class: ['container','flex-center'],
    content: error500,
})

const errorPage500 = layout;

export default errorPage500;
