let input = require('fs').readFileSync('testcase.txt').toString().split('\n');
let [str, bomb] = input;

/*
수도코드

빈 스택이 하나 필요하다. 나중에 이 스택을 문자열로 바꾸어(join()메서드 사용할 것이다) 출력할 것이다.
첫 번째 문자열 str를 한 문자씩 for문으로 순회하면서

1. 일단 스택에 push한다. 
2. 방금 받은 마지막 문자가 폭탄 문자의 마지막 문자(bomb[bomb.lenth - 1])라면 아래의 작업을 수행한다.
    2-1. 폭탄이 설치됐는지 확인할 flag를 초기값 true로 설정한다.
    2-2. 폭탄의 길이만큼 한 문자씩 뒤로 가면서 폭탄과 스택의 문자를 비교한다. 뒤에서 앞으로 가는 방향이 된다.
        중간에 하나라도 일치하지 않으면 폭탄이 아니므로 flag=false로 설정한다.
    2-3. 2-2의 결과 폭탄이 맞다면(flag=true) 폭탄의 길이만큼 스택에서 pop()한다.
        폭탄이 아니라면 아무 것도 수행하지 않는다.
3. 2의 결과 stack에는 폭탄이 아닌 (폭탄을 만들지 못한) 문자들이 들어있게 된다.
    Array.prototype.join() 메서드로 스택을 문자열로 바꾼다.
    문자열이 빈 문자이면 'FRULA'를 아니라면 문자열을 그대로 내보낸다.
*/

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