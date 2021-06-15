'use strict';
const HTTPPROXY = Symbol('context#httpProxy');
module.exports = {
    /**
     * send http proxy request
     *
     * @function Context#curl
     * @param {String|Object} url - request url address.
     * @param {Object} [options] - options for request.
     * @return {Object} see {@link ContextHttpClient#curl}
     */
    async proxyRequest(url, options) {
        /* istanbul ignore else */
        if (!this[HTTPPROXY]) {
            this[HTTPPROXY] = new this.app.HttpProxy(this);
        }
        return this[HTTPPROXY].curl(url, options);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJEOi9hcHAvbWljcm8tc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9leHRlbmQvY29udGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUU5QyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2Y7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU87UUFDN0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFDIn0=