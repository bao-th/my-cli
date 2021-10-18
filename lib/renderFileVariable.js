const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
// import symbol from 'log-symbols'; 
const symbol = require('log-symbols')// 显示✔，❌
const chalk = require('chalk')

function renderFileVariable(targetAir, title) {
    const fileName = `${targetAir}/package.json`;
    const sgiSrvUrlFile = `${targetAir}/build/sgiSrvUrl-dev.js`;
    if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName).toString();
        let json = JSON.parse(data);
        json.name = title;
        //修改项目文件夹中 package.json 文件
        fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
        console.log(symbol.success, chalk.green('Project initialization finished!'));
    }
    // 重写配置文件
    if (fs.existsSync(sgiSrvUrlFile)) {
        ejs.renderFile(sgiSrvUrlFile, title).then(data => {
            // 生成 ejs 处理后的模版文件
            fs.writeFileSync(sgiSrvUrlFile, data)
        })
    }
}
module.exports = {
    renderFileVariable
}