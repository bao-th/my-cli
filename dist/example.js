"use strict";

// init
const inquirer = require('inquirer'); // 


const path = require('path');

const fs = require('fs');

const ejs = require('ejs');
/**
 * 实现与询问用户信息的功能需要引入 inquirer.js
 */


inquirer.prompt([{
  type: 'input',
  //type： input, number, confirm, list, checkbox ... 
  name: 'name',
  // key 名
  message: 'Your name',
  // 提示信息
  default: 'my-node-cli' // 默认值

}]).then(answers => {
  // 打印互用输入结果
  console.log(answers); // {name: ""}

  /**
   * 这里借助 ejs 模版引擎将用户输入的数据渲染到模版文件上
   */
  // 模版文件目录

  const destUrl = path.join(__dirname, '../templates'); // 生成文件目录
  // process.cwd() 对应控制台所在目录

  const cwdUrl = process.cwd(); // 从模版目录中读取文件

  fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      // 使用 ejs 渲染对应的模版文件
      // renderFile（模版文件地址，传入渲染数据）
      ejs.renderFile(path.join(destUrl, file), answers).then(data => {
        // 生成 ejs 处理后的模版文件
        fs.writeFileSync(path.join(cwdUrl, file), data);
      });
    });
  });
});