import { App, Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Application, Context } from 'egg';
var JSZip = require("jszip");
const mime = require("mime");

var request = require("request");
var path = require("path");
var fse = require("fs-extra");
var fs = require("fs");


@Provide()
@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/v2/widgets/:widgetName')
  async home() {
    const ctx = this.ctx
    const { widgetName } = ctx.params;
    const { reset } = ctx.query;
    const { presentableId, entityNid, subDependId } = ctx.query; // entityNid --- parentNid  subDependId --- subResourceIdOrName
    const savePath = path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}`);
    if (fs.existsSync(savePath) && !reset) {
      let data;
      try {
        data = fse
          .readFileSync(
            path.join(ctx.app.baseDir, `/app/public/widgets/${widgetName}/index.html`)
          )
          .toString();
        // 等待操作结果返回，然后打印结果
      } catch (e) {
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
    request(
      {
        method: "GET",
        url: `${this.app.config.gatewayUrl}${url}`,
        encoding: null, // <- this one is important !
        headers: {
          cookie: ctx.request.header.cookie
        }
      },
      function (error, response, body) {
        if (error || response.statusCode !== 200) {
          console.error(error, response)
          // handle error
          return;
        }
        JSZip.loadAsync(body).then(function (zip) {
          saveZipFiles(savePath, zip.files).then(function () {
            let data;
            try {
              data = fse
                .readFileSync(
                  path.join(
                    ctx.app.baseDir,
                    `/app/public/widgets/${widgetName}/index.html`
                  )
                )
                .toString();
              // 等待操作结果返回，然后打印结果
            } catch (e) {
              console.error("读取文件发生错误");
            }
            ctx.body = data;
            return;
          });
        });
      }
    );
  }

  
  @Get('/v2/widgets/:widgetName/*')
  async static() {
    const ctx = this.ctx
    const { widgetName } = ctx.params;
    const route = ctx.url.split("?")[0].split(widgetName)[1];
    let data, type; // 6049d014328c0400397791e7
    try {
      let pa = path.join(
        ctx.app.baseDir,
        `/app/public/widgets/${widgetName}${route}`
      ); // `/widgets/${resourceId}/${route}`)
      type = mime.getType(pa);
      data = fse.readFileSync(pa);
      // 等待操作结果返回，然后打印结果
    } catch (e) {
      console.warn("读取文件发生错误ss");
    } 
    ctx.set("content-type", type);
    ctx.body = data;
  }
}
function saveZipFiles(savePath, files) {
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, {
      recursive: true,
    });
  } else {
    fs.rmSync(savePath, { force: true, recursive: true });
  }
  return new Promise<void>((resolve) => {
    // 获取解压后的文件
    try {
      // for (const filename of Object.keys(files))
      Object.keys(files).forEach((filename, index) => {
        if (!files[filename]) return;
        const dest = path.join(savePath, `/${filename}`);
        // 如果该文件为目录需先创建文件夹  && !isDirSync(dest)
        if (files[filename] && files[filename].dir) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, {
              recursive: true,
            });
          }
        } else {
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
    } catch (error) {
      console.error("save zip files encountered error!", error.message);
      resolve();
      return error;
    }
  });
}