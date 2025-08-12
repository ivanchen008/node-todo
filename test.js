const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const todosPath = path.join(__dirname, 'todos.json');
const todoScript = path.join(__dirname, 'todo.js');

// 测试前清空 todos.json
fs.writeFileSync(todosPath, '[]');

// 测试用例：添加、查看、删除
const steps = [
  { input: '2\n测试待办1\n', expect: ['添加成功'] },
  { input: '2\n测试待办2\n', expect: ['添加成功'] },
  { input: '1\n', expect: ['1. 测试待办1', '2. 测试待办2'] },
  { input: '3\n1\n', expect: ['删除成功'] },
  { input: '1\n', expect: ['1. 测试待办2'] },
  { input: '0\n', expect: [] }
];

function runStep(step, cb) {
  const proc = spawn('node', [todoScript]);
  let output = '';
  proc.stdout.on('data', data => output += data.toString());
  proc.stdin.write(step.input);
  setTimeout(() => {
    proc.kill();
    cb(output);
  }, 500);
}

(async () => {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    await new Promise(resolve => {
      console.log(`\n[步骤${i + 1}] 输入: ${JSON.stringify(step.input.trim())}`);
      runStep(step, output => {
        let allPassed = true;
        step.expect.forEach(e => {
          if (output.includes(e)) {
            console.log(`  ✓ 找到预期输出: ${e}`);
          } else {
            console.error(`  ✗ 未找到预期输出: ${e}`);
            allPassed = false;
          }
        });
        if (allPassed) {
          console.log('  本步骤通过');
        } else {
          console.error('  本步骤未通过');
        }
        resolve();
      });
    });
  }
  // 检查 todos.json 最终内容
  const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'));
  console.log('\n[最终检查]');
  if (todos.length === 1 && todos[0] === '测试待办2') {
    console.log('✓ 所有测试通过');
  } else {
    console.error('✗ 最终 todos.json 内容不符:', todos);
  }
})();