declare const _default: (options: {
    useSandBox: boolean;
}, tokenServiceInitialData: {
    clientId: string;
    clientSecret: string;
    nid: string;
    getAccessTokenFunction: Function;
    getRefreshTokenFunction: Function;
    setTokensFunction: Function;
}) => import("axios").AxiosInstance;
export default _default;
