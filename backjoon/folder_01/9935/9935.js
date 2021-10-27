let input = require('fs').readFileSync('testcase.txt').toString().split('\n');
let [str, bomb] = input;

let len = bomb.length;
let stack = []

for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
    if (str[i] === bomb[len - 1]) {
        let test = true;
        for (let j = 1; j < len; j++) {
            if (stack[stack.length - 1 - j] !== bomb[len - 1 - j]) {
                test = false;
            }
        }
        if (test) {
            for (let j = 0; j < len; j++) {
                stack.pop();
            }
        }
    }
}
const result = stack.join('');
console.log(result === '' ? 'FRULA' : result);