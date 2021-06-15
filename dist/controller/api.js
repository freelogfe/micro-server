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
exports.APIController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const egg_1 = require("egg");
const user_1 = require("../service/user");
let APIController = class APIController {
    async v1() {
        console.log('api', this.app.config.gatewayUrl);
        await this.ctx.proxyRequest(this.app.config.gatewayUrl);
    }
    async v2() {
        await this.ctx.proxyRequest(this.app.config.gatewayUrl);
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], APIController.prototype, "ctx", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", egg_1.Application)
], APIController.prototype, "app", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_1.UserService)
], APIController.prototype, "userService", void 0);
__decorate([
    decorator_1.All('/v1/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], APIController.prototype, "v1", null);
__decorate([
    decorator_1.All('/v2/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], APIController.prototype, "v2", null);
APIController = __decorate([
    decorator_1.Provide(),
    decorator_1.Controller('/')
], APIController);
exports.APIController = APIController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IkQ6L2FwcC9taWNyby1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRFO0FBQzVFLDZCQUEyQztBQUMzQywwQ0FBOEM7QUFJOUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVN4QixLQUFLLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFFO1FBQ04sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0YsQ0FBQTtBQWZDO0lBREMsa0JBQU0sRUFBRTs7MENBQ0k7QUFFYjtJQURDLGVBQUcsRUFBRTs4QkFDRCxpQkFBVzswQ0FBQztBQUVqQjtJQURDLGtCQUFNLEVBQUU7OEJBQ0ksa0JBQVc7a0RBQUM7QUFHekI7SUFEQyxlQUFHLENBQUMsT0FBTyxDQUFDOzs7O3VDQUlaO0FBRUQ7SUFEQyxlQUFHLENBQUMsT0FBTyxDQUFDOzs7O3VDQUdaO0FBaEJVLGFBQWE7SUFGekIsbUJBQU8sRUFBRTtJQUNULHNCQUFVLENBQUMsR0FBRyxDQUFDO0dBQ0gsYUFBYSxDQWlCekI7QUFqQlksc0NBQWEifQ==