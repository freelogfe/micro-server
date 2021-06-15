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
exports.HomeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const egg_1 = require("egg");
var JSZip = require("jszip");
const mime = require("mime");
var request = require("request");
var path = require("path");
var fse = require("fs-extra");
var fs = require("fs");
let HomeController = class HomeController {
    async home() {
        const ctx = this.ctx;
        const { widgetName } = ctx.params;
        const { reset } = ctx.query;
        const { presentableId, entityNid, subDependId } = ctx.query; // entityNid --- parentNid  subDependId --- subResourceIdOrName
        const savePath = path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}`);
        if (fs.existsSync(savePath) && !reset) {
            let data;
            try {
                data = fse
                    .readFileSync(path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}/index.html`))
                    .toString();
                // 等待操作结果返回，然后打印结果
            }
            catch (e) {
                console.warn("读取入口文件发生错误");
            }
            ctx.body = data;
            return;
        }
        let url = `/v2/auths/presentables/${presentableId}/fileStream?parentNid=${entityNid}&subResourceIdOrName=${subDependId}`;
        if (!entityNid) {
            url = `/v2/auths/presentables/${presentableId}/fileStream`;
        }
        // const filePath = path.join(ctx.app.baseDir, `/widgets`);
        // let stream = fs.createWriteStream(path.join(filePath, 'a.zip'));
        // request(`${this.app.config.gatewayUrl}${url}`).pipe(stream)
        request({
            method: "GET",
            url: `${this.app.config.gatewayUrl}${url}`,
            encoding: null,
            headers: {
                cookie: ctx.request.header.cookie
            }
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error(error, response);
                // handle error
                return;
            }
            JSZip.loadAsync(body).then(function (zip) {
                saveZipFiles(savePath, zip.files).then(function () {
                    let data;
                    try {
                        data = fse
                            .readFileSync(path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}/index.html`))
                            .toString();
                        // 等待操作结果返回，然后打印结果
                    }
                    catch (e) {
                        console.error("读取文件发生错误");
                    }
                    ctx.body = data;
                    return;
                });
            });
        });
    }
    async static() {
        const ctx = this.ctx;
        const { widgetName } = ctx.params;
        const route = ctx.url.split("?")[0].split(widgetName)[1];
        let data, type; // 6049d014328c0400397791e7
        try {
            let pa = path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}${route}`); // `/widgets/${resourceId}/${route}`)
            type = mime.getType(pa);
            data = fse.readFileSync(pa);
            // 等待操作结果返回，然后打印结果
        }
        catch (e) {
            console.warn("读取文件发生错误ss");
        }
        ctx.set("content-type", type);
        ctx.body = data;
    }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", egg_1.Application)
], HomeController.prototype, "app", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], HomeController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Get('/v2/widgets/:widgetName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "home", null);
__decorate([
    decorator_1.Get('/v2/widgets/:widgetName/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "static", null);
HomeController = __decorate([
    decorator_1.Provide(),
    decorator_1.Controller('/')
], HomeController);
exports.HomeController = HomeController;
function saveZipFiles(savePath, files) {
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, {
            recursive: true,
        });
    }
    else {
        fs.rmSync(savePath, { force: true, recursive: true });
    }
    return new Promise((resolve) => {
        // 获取解压后的文件
        try {
            // for (const filename of Object.keys(files))
            Object.keys(files).forEach((filename, index) => {
                if (!files[filename])
                    return;
                const dest = path.join(savePath, `/${filename}`);
                // 如果该文件为目录需先创建文件夹  && !isDirSync(dest)
                if (files[filename] && files[filename].dir) {
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, {
                            recursive: true,
                        });
                    }
                }
                else {
                    // if (filename.indexOf("index.html") > -1) {
                    // }
                    // 把每个文件buffer写到硬盘中
                    //   files[filename]._data && console.log(filename, files[filename]._data.compressedContent, savePath, dest)
                    //   files[filename]._data && fs.writeFileSync(dest,files[filename]._data.compressedContent);
                    files[filename].async("nodebuffer").then((content) => {
                        fs.writeFileSync(dest, content);
                        if (Object.keys(files).length === index + 1) {
                            resolve();
                        }
                    });
                }
            });
        }
        catch (error) {
            console.error("save zip files encountered error!", error.message);
            resolve();
            return error;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9hcHAvbWljcm8tc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvaG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBNEU7QUFDNUUsNkJBQTJDO0FBQzNDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFN0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBS3ZCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFRekIsS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ3BCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzVCLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQywrREFBK0Q7UUFDNUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUM7WUFD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