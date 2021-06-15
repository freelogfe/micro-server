"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const egg_1 = require("egg");
let urlMiddleware = class urlMiddleware {
    resolve() {
        return async (ctx, next) => {
            if (ctx.request.header.origin) {
                ctx.baseUrl =
                    ctx.request.header.origin.indexOf('.testfreelog.com') > -1
                        ? 'api.testfreelog.com'
                        : 'api.freelog.com';
            }
            ctx.publicPath =
                this.app.config.env === 'local'
                    ? 'http://localhost:3000'
                    : 'https://frcdn.oss-cn-shenzhen.aliyuncs.com/runtime';
            await next();
        };
    }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", egg_1.Application)
], urlMiddleware.prototype, "app", void 0);
urlMiddleware = __decorate([
    decorator_1.Provide()
], urlMiddleware);
exports.urlMiddleware = urlMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IkQ6L2FwcC9taWNyby1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibWlkZGxld2FyZS91cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBRW5ELDZCQUEyQztBQUczQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBR3hCLE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFO1lBQ2xELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUM3QixHQUFHLENBQUMsT0FBTztvQkFDVCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN4RCxDQUFDLENBQUMscUJBQXFCO3dCQUN2QixDQUFDLENBQUMsaUJBQWlCLENBQUM7YUFDekI7WUFDRCxHQUFHLENBQUMsVUFBVTtnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssT0FBTztvQkFDN0IsQ0FBQyxDQUFDLHVCQUF1QjtvQkFDekIsQ0FBQyxDQUFDLG9EQUFvRCxDQUFDO1lBQzNELE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWhCQztJQURDLGVBQUcsRUFBRTs4QkFDRCxpQkFBVzswQ0FBQztBQUZOLGFBQWE7SUFEekIsbUJBQU8sRUFBRTtHQUNHLGFBQWEsQ0FrQnpCO0FBbEJZLHNDQUFhIn0=