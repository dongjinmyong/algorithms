let input = require('fs').readFileSync('testcase.txt').toString().split('\n');
const [n, m] = input[0].split(' ');

const picture = [];
for (let i = 0; i < n; i++) {
  picture[i] = input[i + 1].split(' ');
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = picture => {
  let count = 0;
  biggestArea = 0;
  const queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (picture[i][j] === '1') {
        count++;
        queue.push([i, j]);
        picture[i][j] = '0';
        let area = 1;
        // 연결된 그림 조각 다 찾아내기
        while (queue.length) {
          let tmp = queue.shift();
          for (let i = 0; i < 4; i++) {
            let x = tmp[1] + dx[i];
            let y = tmp[0] + dy[i];
            if (x >= 0 && x < m && y >= 0 && y < n) {
              if (picture[y][x] === '1') {
                picture[y][x] = '0';
                area++;
                queue.push([y, x]);
              }
            }
          }
        }
        biggestArea = Math.max(biggestArea, area);
      }
    }
  }
  return [count, biggestArea];
}

const result = bfs(picture);
console.log(result[0]);
console.log(result[1]);