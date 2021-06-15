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
        console.log(urlObj, host);
        urlObj.host = host;
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
        console.log(urlObj, targetUrl);
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