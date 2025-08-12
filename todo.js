const fs = require('fs');
const path = require('path');
const readline = require('readline');

const todosPath = path.join(__dirname, 'todos.json');

function loadTodos() {
  if (!fs.existsSync(todosPath)) return [];
  return JSON.parse(fs.readFileSync(todosPath, 'utf8'));
}

function saveTodos(todos) {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n1. 查看待办');
  console.log('2. 添加待办');
  console.log('3. 删除待办');
  console.log('0. 退出');
  rl.question('请选择操作: ', handleMenu);
}

function handleMenu(choice) {
  const todos = loadTodos();
  switch (choice.trim()) {
    case '1':
      if (todos.length === 0) {
        console.log('暂无待办事项');
      } else {
        todos.forEach((todo, idx) => {
          console.log(`${idx + 1}. ${todo}`);
        });
      }
      showMenu();
      break;
    case '2':
      rl.question('输入待办内容: ', (item) => {
        todos.push(item);
        saveTodos(todos);
        console.log('添加成功');
        showMenu();
      });
      break;
    case '3':
      rl.question('输入要删除的编号: ', (num) => {
        const idx = parseInt(num) - 1;
        if (todos[idx]) {
          todos.splice(idx, 1);
          saveTodos(todos);
          console.log('删除成功');
        } else {
          console.log('编号无效');
        }
        showMenu();
      });
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('无效选择');
      showMenu();
  }
}

showMenu();