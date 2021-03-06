/* 의사코드
1
12, 13
121, 123 | 131, 132
1213 | 1231  1232 || 1312 | 1321, 1323
12131 | 12132 || 12313 | 12321 ||| 13121 | 13123 || 13212 || 13231
121323
1213231
1231
*/
let unit = [1, 2, 3];
let code = '';
function barcode(n) {
    if (code.length === n) {
        console.log(code);
        return true;
    }
    for (let i of unit) {
        if (test(`${code}${i}`)) {
            code = `${code}${i}`;
            if (barcode(n)) {
                return true;
            }
        }
    }
    code = code.slice(0, -1);
    return false;
}

function test(str) {
    for (let i = 1; i <= parseInt(str.length / 2); i++) {
        for (let j = 0; j < str.length - i; j++) {
            if (str.slice(j, j + i) === str.slice(j + i, j + i + i)) {
                return false;
            }
        }
    }
    return true;
}

console.log(barcode(7));