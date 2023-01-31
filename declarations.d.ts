declare module '*.pug' {
    const _: Function
    export default _;
}

declare module 'uuid' {
    type v4 = () => string;
    export const v4: v4;
}
