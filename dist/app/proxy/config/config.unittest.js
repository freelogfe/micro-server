'use strict';
/**
 * @eggjs/http-proxy unittest config
 *
 * @member Config#httpProxy
 */
exports.httpProxy = {
    // In unittest, request proxy to self app, make the app server has two http request
    // 1. test request, will close after server response
    // 2. proxy request, use urllib, default use http agent, will keep alive
    // End method in supertest will wait server close callback
    // The server will wait all request close, so test case will be slow
    // So in unit test, not use the http agent
    agent: null,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnVuaXR0ZXN0LmpzIiwic291cmNlUm9vdCI6IkQ6L2FwcC9taWNyby1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL3Byb3h5L2NvbmZpZy9jb25maWcudW5pdHRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWI7Ozs7R0FJRztBQUNILE9BQU8sQ0FBQyxTQUFTLEdBQUc7SUFDbEIsbUZBQW1GO0lBQ25GLG9EQUFvRDtJQUNwRCx3RUFBd0U7SUFDeEUsMERBQTBEO0lBQzFELG9FQUFvRTtJQUNwRSwwQ0FBMEM7SUFDMUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDIn0=