let input = require('fs').readFileSync('testcase_04.txt').toString().split('\n');
const [n, m] = input[0].split(' ');

const maze = [];
const mark = [];

for (let i = 0; i < n; i++) {
  maze[i] = [];
  mark[i] = [];
  const tmp = input[i + 1].split('');
  for (let j = 0; j < m; j++) {
    maze[i][j] = +tmp[j];
    mark[i][j] = 0;
  }
}
console.log(maze)

const dx = [1, 0, -1, 0]; // step for direction x
const dy = [0, 1, 0, -1]; // step for direction y

const bfs = () => {
  const queue = [];
  queue.push([0, 0]); // codinate of the start point
  mark[0][0] = 1;
  
  while(queue.length) {
    const v = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nextV = [v[0] + dy[i], v[1] + dx[i]];
      if (nextV[0] >= 0 && nextV[0] < n && nextV[1] >= 0 && nextV[1] < m) {
        if (nextV[0] === n - 1 && nextV[1] === m - 1) {
          return mark[v[0]][v[1]] + 1;
        }
        if (maze[nextV[0]][nextV[1]] && !mark[nextV[0]][nextV[1]]) {
          queue.push(nextV);
          mark[nextV[0]][nextV[1]] = mark[v[0]][v[1]] + 1;
        }
      }
    }
  }
}

console.log(bfs());