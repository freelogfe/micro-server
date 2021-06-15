'use strict';
/**
 * @eggjs/http-proxy default config
 *
 * @member Config#httpProxy
 * @property {Number} timeout - proxy timeout, ms
 * @property {Boolean} withCredentials - whether send cookie when cors
 * @property {Object} ignoreHeaders - ignore request/response headers
 */
exports.httpProxy = {
    timeout: 10 * 1000,
    withCredentials: false,
    charsetHeaders: '_input_charset',
    ignoreHeaders: {
        'strict-transport-security': true,
        'x-powered-by': true,
        'x-readtime': true,
        connection: true,
        date: true,
        'keep-alive': true,
        'proxy-authenticate': true,
        'proxy-authorization': true,
        te: true,
        trailer: true,
        'transfer-encoding': true,
        upgrade: true,
    },
};
exports.customLogger = {
    httpProxyLogger: {
        file: 'http-proxy.log',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiRDovYXBwL21pY3JvLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvcHJveHkvY29uZmlnL2NvbmZpZy5kZWZhdWx0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViOzs7Ozs7O0dBT0c7QUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHO0lBQ2xCLE9BQU8sRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUVsQixlQUFlLEVBQUUsS0FBSztJQUV0QixjQUFjLEVBQUUsZ0JBQWdCO0lBRWhDLGFBQWEsRUFBRTtRQUNiLDJCQUEyQixFQUFFLElBQUk7UUFDakMsY0FBYyxFQUFFLElBQUk7UUFDcEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLElBQUk7UUFDVixZQUFZLEVBQUUsSUFBSTtRQUNsQixvQkFBb0IsRUFBRSxJQUFJO1FBQzFCLHFCQUFxQixFQUFFLElBQUk7UUFDM0IsRUFBRSxFQUFFLElBQUk7UUFDUixPQUFPLEVBQUUsSUFBSTtRQUNiLG1CQUFtQixFQUFFLElBQUk7UUFDekIsT0FBTyxFQUFFLElBQUk7S0FDZDtDQUNGLENBQUM7QUFFRixPQUFPLENBQUMsWUFBWSxHQUFHO0lBQ3JCLGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxnQkFBZ0I7S0FDdkI7Q0FDRixDQUFDIn0=