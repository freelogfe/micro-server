"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
let UserService = class UserService {
    async getUser(options) {
        return {
            uid: options.uid,
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }
};
UserService = __decorate([
    decorator_1.Provide()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9hcHAvbWljcm8tc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFJOUMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXFCO1FBQ2pDLE9BQU87WUFDTCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsS0FBSyxFQUFFLGlCQUFpQjtTQUN6QixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFUWSxXQUFXO0lBRHZCLG1CQUFPLEVBQUU7R0FDRyxXQUFXLENBU3ZCO0FBVFksa0NBQVcifQ==