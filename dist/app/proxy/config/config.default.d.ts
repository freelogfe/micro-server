export namespace httpProxy {
    const timeout: number;
    const withCredentials: boolean;
    const charsetHeaders: string;
    const ignoreHeaders: {
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
}
export namespace customLogger {
    namespace httpProxyLogger {
        const file: string;
    }
}
