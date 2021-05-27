"use strict";

const Controller = require("egg").Controller;
var JSZip = require("jszip");
const mime = require("mime");

var request = require("request");
var path = require("path");
var fse = require("fs-extra");

var fs = require("fs");

class WidgetController extends Controller {
  async home(ctx) {
    const { widgetName } = ctx.params;
    const { reset } = ctx.query;
    const { presentableId, entityNid, subDependId } = ctx.query; // entityNid --- parentNid  subDependId --- subResourceIdOrName
    const savePath = path.join(ctx.app.baseDir, `/widgets/${widgetName}`);
    // console.log('savepath:' + savePath)
    if (fs.existsSync(savePath) && !reset) {
      let data;
      try {
        data = fse
          .readFileSync(
            path.join(ctx.app.baseDir, `/widgets/${widgetName}/index.html`)
          )
          .toString();
        // 等待操作结果返回，然后打印结果
      } catch (e) {
        console.log("读取入口文件发生错误");
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
    // console.log(ctx)
    // console.log('url:' + '${ctx.config.gatewayUrl}${url}')
    // request(`${ctx.config.gatewayUrl}${url}`).pipe(stream)
    request(
      {
        method: "GET",
        url: `${ctx.config.gatewayUrl}${url}`,
        encoding: null, // <- this one is important !
        headers: {
          cookie: ctx.request.header.cookie
        }
      },
      function (error, response, body) {
        // console.log('headers:' + response.headers)
        if (error || response.statusCode !== 200) {
          console.log(error, response)
          // console.log('error:' + error)
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
                    `/widgets/${widgetName}/index.html`
                  )
                )
                .toString();
              // console.log(data)
              // 等待操作结果返回，然后打印结果
            } catch (e) {
              console.log("读取文件发生错误");
            }
            ctx.body = data;
            return;
          });
        });
      }
    );
  }

  async staticFile(ctx) {
    const { widgetName } = ctx.params;
    const route = ctx.url.split("?")[0].split(widgetName)[1];
    let data, type; // 6049d014328c0400397791e7
    try {
      let pa = path.join(
        ctx.app.baseDir,
        `/widgets/${widgetName}${route}`
      ); // `/widgets/${resourceId}/${route}`)
      type = mime.getType(pa);
      data = fse.readFileSync(pa);
      // 等待操作结果返回，然后打印结果
    } catch (e) {
      console.log("读取文件发生错误ss");
    }
    if (ctx.url.indexOf('element-icons') > -1) {
      console.log(type)
    }
    // ctx.set("content-type", type);
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
  return new Promise((resolve) => {
    // 获取解压后的文件
    try {
      // for (const filename of Object.keys(files))
      Object.keys(files).forEach((filename, index) => {
        if (!files[filename]) return;
        // console.log(filename)
        const dest = path.join(savePath, `/${filename}`);
        // 如果该文件为目录需先创建文件夹  && !isDirSync(dest)
        // console.log(dest, files[filename].dir)
        if (files[filename] && files[filename].dir) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, {
              recursive: true,
            });
          }
        } else {
          // if (filename.indexOf("index.html") > -1) {
          //   console.log(
          //     files[filename],
          //     files[filename]._data.compressedContent
          //   );
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
module.exports = WidgetController;
