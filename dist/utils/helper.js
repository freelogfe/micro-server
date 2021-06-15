'use strict';
const is = require('is-type-of');
module.exports = {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    /**
     *
     * @param {array} target 被合并的目标数组
     * @param {array} src 合并的源数组
     * @param {string|object} key 合并的key值
     * @param {function} mergeFn 合并的规则函数
     * @return {array} 合并后的结果
     */
    mergeBy(target, src, key, mergeFn) {
        if (!key) {
            throw new Error('need key parameter for mergeBy function');
        }
        const srcMap = {};
        let srcKey = key;
        let targetKey;
        if (is.string(key)) {
            srcKey = targetKey = key;
        }
        else if (is.object(key)) { // key map
            srcKey = key.src;
            targetKey = key.target;
        }
        src.forEach(val => {
            srcMap[val[srcKey]] = val;
        });
        return target.map(val => {
            const srcVal = srcMap[val[targetKey]];
            if (srcVal) {
                if (is.function(mergeFn)) {
                    val = mergeFn(val, srcVal);
                }
                else if (is.string(mergeFn)) {
                    val[mergeFn] = srcVal;
                }
                else {
                    val = Object.assign(val, srcVal);
                }
            }
            return val;
        });
    },
    isSafeOrigin(origin) {
        return /^https?:\/\/(t\.)?[\w-]+\.(test)?freelog\.com$/.test(origin);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IkQ6L2FwcC9taWNyby1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsidXRpbHMvaGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQTtBQUNaLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUVoQyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsdUNBQXVDO0lBQ3ZDLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0I7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7U0FDM0Q7UUFFRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDakIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2hCLElBQUksU0FBUyxDQUFBO1FBRWIsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFBO1NBQ3pCO2FBQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBVTtZQUNyQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtZQUNoQixTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtTQUN2QjtRQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUMzQixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7WUFDckMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN4QixHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtpQkFDM0I7cUJBQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFBO2lCQUN0QjtxQkFBTTtvQkFDTCxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7aUJBQ2pDO2FBQ0Y7WUFFRCxPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFlBQVksQ0FBQyxNQUFNO1FBQ2pCLE9BQU8sZ0RBQWdELENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RFLENBQUM7Q0FDRixDQUFBIn0=