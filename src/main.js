const program = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer');

program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 打印执行结果
        console.log('name:', name, 'options:', options)

        // 询问客户项目中文名
        inquirer.prompt([
            {
                type: 'input', //type： input, number, confirm, list, checkbox ... 
                name: 'title', // key 名
                message: 'Project title', // 提示信息
                default: '运行平台' // 默认值
            }
        ]).then(answers => {
            // 在 create.js 中执行创建任务
            require('../lib/create.js')(name, options, answers.title)
        })
    })

program
    // 配置版本号信息
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

// bin/cli.js

// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options)
    })

// 配置 ui 命令
program
    .command('ui')
    .description('start add open sm-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option)
    })

program
    // 监听 --help 执行
    .on('--help', () => {
        // 使用 figlet 绘制 Logo
        console.log('\r\n' + figlet.textSync('softmaker', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }));
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`sm-cli <command> --help`)} for detailed usage of given command\r\n`)
    })



// 解析用户执行命令传入参数
program.parse(process.argv);