const readline = require('readline');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todos.db');

// 初始化表
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, done INTEGER DEFAULT 0)');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n1. 查看待办');
  console.log('2. 添加待办');
  console.log('3. 删除待办');
  console.log('4. 标记完成/未完成');
  console.log('0. 退出');
  rl.question('请选择操作: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      db.all('SELECT * FROM todos', [], (err, rows) => {
        if (rows.length === 0) {
          console.log(chalk.gray('暂无待办事项'));
        } else {
          rows.forEach(row => {
            const status = row.done ? chalk.green('[已完成]') : chalk.red('[未完成]');
            console.log(`${chalk.yellow(row.id)}. ${chalk.cyan(row.content)} ${status}`);
          });
        }
        showMenu();
      });
      break;
    case '2':
      rl.question('输入待办内容: ', (item) => {
        db.run('INSERT INTO todos (content) VALUES (?)', [item], function (err) {
          if (!err) {
            console.log(chalk.green('添加成功'));
          } else {
            console.log(chalk.red('添加失败'));
          }
          showMenu();
        });
      });
      break;
    case '3':
      rl.question('输入要删除的编号: ', (num) => {
        const id = parseInt(num);
        db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
          if (this.changes) {
            console.log(chalk.green('删除成功'));
          } else {
            console.log(chalk.red('编号无效'));
          }
          showMenu();
        });
      });
      break;
    case '0':
      rl.close();
      db.close();
      break;
    case '4':
      rl.question('输入要切换状态的编号: ', (num) => {
        const id = parseInt(num);
        db.get('SELECT done FROM todos WHERE id = ?', [id], (err, row) => {
          if (!row) {
            console.log(chalk.red('编号无效'));
            showMenu();
            return;
          }
          const newDone = row.done ? 0 : 1;
          db.run('UPDATE todos SET done = ? WHERE id = ?', [newDone, id], function (err) {
            if (!err) {
              console.log(chalk.green('状态已切换'));
            } else {
              console.log(chalk.red('切换失败'));
            }
            showMenu();
          });
        });
      });
      break;
    default:
      console.log(chalk.red('无效选择'));
      showMenu();
  }
}

showMenu();