export = HttpProxy;
declare class HttpProxy {
    constructor(ctx: any);
    ctx: any;
    app: any;
    config: {
        timeout: number;
        withCredentials: boolean;
        charsetHeaders: string;
        ignoreHeaders: {
            'strict-transport-security': boolean;
            'x-powered-by': boolean;
            'x-readtime': boolean;
            connection: boolean;
            date: boolean;
            'keep-alive': boolean;
            'proxy-authenticate': boolean;
            'proxy-authorization': boolean;
            te: boolean;
            trailer: boolean;
            'transfer-encoding': boolean;
            upgrade: boolean;
        };
    };
    logger: any;
    ip: any;
    /**
     * send http proxy base on {@link HttpClient}.
     *
     * @param {String} host - target host.
     * @param {Object} [options] - options for request.
     * @param {Boolean} [options.withCredentials] - if true, will send cookie when cors
     * @param {Function} [options.rewrite] - rewrite target url obj
     */
    curl(host: string, options?: {
        withCredentials?: boolean;
        rewrite?: Function;
    }): Promise<void>;
}
