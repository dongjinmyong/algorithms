let input = require('fs').readFileSync('testcase.txt').toString().split('\n');

const eratos = new Array(9999).fill(true);
for (let i = 2; i * i < 10000; i++) {
  for (let j = 2*i; j < 10000; j += i) {
    eratos[j] = false;
  }
}

const bfs = (a, b) => {
  const queue = [];
  const visited = [];
  visited[a] = 0;
  queue.push(a);
  while(queue.length !== 0) {
    const tmp = queue.shift();
    if (tmp === b) {
      return visited[tmp];
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        let newTmp = tmp - Number(Math.floor(tmp / 10 ** (3 - i)).toString().slice(-1)) * 10 ** (3 - i) + j * 10 ** (3 - i);
        if (newTmp >= 1000 && eratos[newTmp] && typeof visited[newTmp] !== 'number') {
          visited[newTmp] = visited[tmp] + 1;
          queue.push(newTmp);
        }
      }
    }
  }
  return 'Impossible';
}

for (let i = 1; i <= T; i++) {
  let [curPwd, newPwd] = input[i].split(' ');
  curPwd = Number(curPwd);
  newPwd = Number(newPwd);
  console.log(bfs(curPwd, newPwd));
}