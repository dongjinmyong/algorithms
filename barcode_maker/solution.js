function barcode(n) {
  let code = '';
  if (barcodeMaker(n)) {
    return code;
  }
  function barcodeMaker(n) {
    if (code.length === n) {
        return true;
    }
    for (let i of [1, 2, 3]) {
        if (test(`${code}${i}`)) {
            code = `${code}${i}`;
            if (barcodeMaker(n)) {
                return true;
            }
        }
    }
    code = code.slice(0, -1);
    return false;
  }
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

let output = barcode(20);
console.log(output);
