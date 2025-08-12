const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const todosPath = path.join(__dirname, 'todos.json');
const todoScript = path.join(__dirname, 'todo.js');

function runCli(inputs) {
  return new Promise(resolve => {
    const proc = spawn('node', [todoScript]);
    let output = '';
    proc.stdout.on('data', data => output += data.toString());
    proc.stdin.write(inputs);
    setTimeout(() => {
      proc.kill();
      resolve(output);
    }, 500);
  });
}

beforeEach(() => {
  fs.writeFileSync(todosPath, '[]');
});

test('添加待办事项', async () => {
  const output = await runCli('2\n测试待办1\n0\n');
  expect(output).toContain('添加成功');
  const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'));
  expect(todos).toEqual(['测试待办1']);
});

test('查看待办事项', async () => {
  fs.writeFileSync(todosPath, JSON.stringify(['测试待办1', '测试待办2']));
  const output = await runCli('1\n0\n');
  expect(output).toContain('1. 测试待办1');
  expect(output).toContain('2. 测试待办2');
});

test('删除待办事项', async () => {
  fs.writeFileSync(todosPath, JSON.stringify(['测试待办1', '测试待办2']));
  const output = await runCli('3\n1\n0\n');
  expect(output).toContain('删除成功');
  const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'));
  expect(todos).toEqual(['测试待办2']);
});