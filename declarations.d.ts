declare module '*.pug' {
    const _: (props: any) => string;
    export default _;
}

declare module '*.hbs' {
    const _: Function
    export default _;
}

declare module 'uuid' {
    type v4 = () => string;
    export const v4: v4;
}

// declare module 'pug' {
//     type Pug = {
//         [key: string]: any;
//         render: ((template: string, props: Record<string, any>) => string)
//     }
//     const Templator: Pug
//     export default Templator;
// }
