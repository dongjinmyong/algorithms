// ''
// [1, 2, 3]
// '' -> 1 -> 12
// 1213121
function barcode(len) {
    function barcodeMaker(code) {
        if (code.length === len) {
            return code;
        }
        for(let i of [1, 2, 3]) {
            if (tester(`${code}${i}`)) {
                // code += i;
                const tmp = barcodeMaker(`${code}${i}`)
                if (tmp !== null) {
                    return tmp;
                }
            }
        }
        // code = code.slice(0, -1);
        return null;
    }
    return barcodeMaker('');
}

    // 12313
function tester(str) {
    for (let i = 1; i <= parseInt(str.length / 2); i++) {
        for (let j = 0; j < str.length - i; j++) {
            if (str.slice(j, j + i) === str.slice(j + i, j + i + i)) {
                return false;
            }
        }
    }
    return true;
}

console.log(barcode(21));