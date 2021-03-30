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
    const { subDependId } = ctx.params;
    const { reset } = ctx.query;
    console.log(subDependId, 234234)
    // console.log('reset:' + reset)
    const savePath = path.join(ctx.app.baseDir, `/widgets/${subDependId}`);
    // console.log('savepath:' + savePath)
    if (fs.existsSync(savePath) && !reset) {
      let data;
      try {
        data = fse
          .readFileSync(
            path.join(ctx.app.baseDir, `/widgets/${subDependId}/index.html`)
          )
          .toString();
        // 等待操作结果返回，然后打印结果
      } catch (e) {
        console.log("读取文件发生错误");
      }
      ctx.body = data;
      return;
    }
    const { presentableId, entityNid } = ctx.query; // entityNid --- parentNid  subDependId --- subResourceIdOrName
    let url = `/v2/auths/presentables/${presentableId}/fileStream?parentNid=${entityNid}&subResourceIdOrName=${subDependId}`;
    if(!entityNid){
      url = `/v2/auths/presentables/${presentableId}/fileStream`;
    }
    // console.log('url:' + url)
    request(
      {
        method: "GET",
        url: `http://api.testfreelog.com${url}`,
        encoding: null, // <- this one is important !
      },
      function (error, response, body) {
        // console.log('headers:' + response.headers)
        if (error || response.statusCode !== 200) {
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
                    `/widgets/${subDependId}/index.html`
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
    const { subDependId } = ctx.params;
    const route = ctx.url.split("?")[0].split("static")[1];
    let data, type; // 6049d014328c0400397791e7
    try {
      let pa = path.join(
        ctx.app.baseDir,
        `/widgets/${subDependId}/static/${route}`
      ); // `/widgets/${subDependId}/${route}`)
      type = mime.getType(pa);
      data = fse.readFileSync(pa);
      // 等待操作结果返回，然后打印结果
    } catch (e) {
      console.log("读取文件发生错误ss");
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
