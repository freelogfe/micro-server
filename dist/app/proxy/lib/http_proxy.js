'use strict';
const { URL } = require('url');
const FormStream = require('formstream');
const ContentType = require('content-type');
const address = require('address');
const assert = require('assert');
const config = require('../config/config.default');
class HttpProxy {
    constructor(ctx) {
        this.ctx = ctx;
        this.app = ctx.app;
        this.config = config.httpProxy;
        this.logger = this.ctx.getLogger('httpProxyLogger');
        this.ip = address.ip();
    }
    /**
     * send http proxy base on {@link HttpClient}.
     *
     * @param {String} host - target host.
     * @param {Object} [options] - options for request.
     * @param {Boolean} [options.withCredentials] - if true, will send cookie when cors
     * @param {Function} [options.rewrite] - rewrite target url obj
     */
    async curl(host, options) {
        const { ctx } = this;
        const defaultOptions = {
            timeout: this.config.timeout,
            agent: this.config.agent,
            streaming: true,
            followRedirect: false,
            beforeResponse: undefined,
        };
        options = {
            method: ctx.method,
            ...defaultOptions,
            ...options,
        };
        if (options.withCredentials === undefined)
            options.withCredentials = true; // this.config.withCredentials;
        let urlObj = new URL(ctx.href.replace(':7001', ''));
        console.log(host);
        // console.log(urlObj, host)
        urlObj.host = host;
        console.log(urlObj, host);
        if (options.rewrite) {
            urlObj = options.rewrite(urlObj);
            assert(urlObj, 'options.rewrite must return urlObj');
        }
        // filter header
        const reqHeaders = {};
        for (const key of Object.keys(ctx.header)) {
            if (this.config.ignoreHeaders[key])
                continue;
            reqHeaders[key.toLowerCase()] = ctx.header[key];
        }
        // X-Forwarded-For
        const forwarded = ctx.get('x-forwarded-for');
        reqHeaders['x-forwarded-for'] = forwarded ? `${forwarded}, ${this.ip}` : this.ip;
        options.headers = {
            ...reqHeaders,
            ...options.headers || {},
            host: urlObj.host,
        };
        // don't send cookie when cors without withCredentials
        if (urlObj.host !== ctx.host && !options.withCredentials) {
            delete options.headers.cookie;
        }
        if (ctx.method === 'POST' || ctx.method === 'PUT') {
            const { rawBody, body: requestBody, files } = ctx.request;
            // file upload
            if (ctx.is('multipart') || ctx.is('application/octet-stream')) {
                // file mode -> restore to formstream
                if (files) {
                    const form = new FormStream();
                    for (const fieldName of Object.keys(requestBody)) {
                        form.field(fieldName, requestBody[fieldName]);
                    }
                    for (const file of files) {
                        form.file(file.fieldname, file.filepath, file.filename);
                    }
                    const formHeaders = form.headers();
                    for (const key of Object.keys(formHeaders)) {
                        options.headers[key.toLowerCase()] = formHeaders[key];
                    }
                    options.stream = form;
                }
                else {
                    // stream mode
                    options.stream = ctx.req;
                }
                // charset compatibility, some Java will use `GBK` to decode field
                const contentTypeStr = ctx.get('content-type');
                /* istanbul ignore else */
                if (contentTypeStr) {
                    const contentType = ContentType.parse(contentTypeStr);
                    const inputCharset = ctx.query[this.config.charsetHeaders];
                    if (!contentType.parameters.charset && inputCharset) {
                        contentType.parameters.charset = inputCharset;
                        options.headers['content-type'] = ContentType.format(contentType);
                    }
                }
            }
            else if (requestBody && rawBody) {
                // bodyParser(json: application/json, form: application/x-www-form-urlencoded)
                // urllib default use querystring to stringify form data which don't support nested object
                // will use qs instead of querystring to support nested object by set nestedQuerystring to true.
                options.nestedQuerystring = true;
                options.data = requestBody;
                // urllib wll auto set
                delete options.headers['content-length'];
            }
            else {
                // recommended: if you use `proxyRequest()` at middleware and before `bodyParser` and `multipart` then it will run this.
                options.stream = ctx.req;
            }
        }
        // send request
        const targetUrl = urlObj.toString();
        console.log(1111, urlObj, targetUrl);
        let proxyResult;
        try {
            proxyResult = await ctx.curl(targetUrl, options);
            this.logger.info(`forward:success, status:${proxyResult.status}, targetUrl:${targetUrl}`);
        }
        catch (err) {
            this.logger.warn(`forward:fail, status:${err.status}, targetUrl:${targetUrl}`);
            throw err;
        }
        if (options.beforeResponse)
            proxyResult = await options.beforeResponse(proxyResult);
        const { headers, status, data, res } = proxyResult;
        for (const key of Object.keys(headers)) {
            if (this.config.ignoreHeaders[key])
                continue;
            ctx.set(key, headers[key]);
        }
        ctx.status = status;
        // avoid egg middleware post-handler to override headers, such as x-frame-options
        if (data) {
            let body = data;
            if (!Buffer.isBuffer(body) && typeof body !== 'string') {
                // body: json
                body = JSON.stringify(body);
                ctx.length = Buffer.byteLength(body);
            }
            ctx.respond = false;
            ctx.res.flushHeaders();
            ctx.res.end(body);
        }
        else {
            ctx.respond = false;
            ctx.res.flushHeaders();
            res.pipe(ctx.res);
        }
    }
}
module.exports = HttpProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9wcm94eS5qcyIsInNvdXJjZVJvb3QiOiJEOi9hcHAvbWljcm8tc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9wcm94eS9saWIvaHR0cF9wcm94eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNsRCxNQUFNLFNBQVM7SUFDYixZQUFZLEdBQUc7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTztRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sY0FBYyxHQUFHO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDNUIs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