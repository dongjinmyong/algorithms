
const problem = [
    [0, 3, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
]
function makeExpectedNumbers(arr, rowIndex, columnIndex) {
    let inColumnExpectedList = [];
    let inRowExpectedList = [];
    let inSquareExpectedList = [];
  
    // 세로 줄에서 후보 숫자 목록 만들기
    for (let digit = 1; digit < 10; digit++) {
      let row = arr[rowIndex];
      if (!row.includes(digit)) {
        inRowExpectedList = [...inRowExpectedList, digit];
      }
    }
  
    // 가로 줄에서 후보 숫자 목록 만들기
    for (let digit = 1; digit < 10; digit++) {
      // colmun 정하기
      let column = arr.reduce((accum, curr) => [...accum, curr[columnIndex]], []);
      // 후보 숫자 목록 만들기
      if (!column.includes(digit)) {
        inColumnExpectedList = [...inColumnExpectedList, digit];
      }
    }
  
    // 3 x 3 박스에서 후보 숫자 목록 만들기
    for (let digit = 1; digit < 10; digit++) {
      // 3 x 3 박스 범위 정하기
      let square = [];
      let rowStartIndex = rowIndex - rowIndex % 3;
      let columnStartIndex = columnIndex - columnIndex % 3;
      for (let i = rowStartIndex; i < rowStartIndex + 3; i++) {
        for (let j = columnStartIndex; j < columnStartIndex + 3; j++) {
          square = [...square, arr[i][j]];
        }
      }
      // 후보 숫자 목록 만들기
      if (!square.includes(digit)) {
        inSquareExpectedList = [...inSquareExpectedList, digit];
      }
    }

    let expectedList = [];
      for (let i of inRowExpectedList) {
        if (inColumnExpectedList.includes(i) && inSquareExpectedList.includes(i)) {
          expectedList = [...expectedList, i];
        }
      }
      return expectedList;
}

function findEmptyPoint(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] === 0) {
        return [i, j];
      }
    }
  }
}

// 479
function sudokou(arr) {
  //console.log(arr);
  let emptyPoint = findEmptyPoint(arr);
  if (emptyPoint === undefined) {
    console.log(arr);
    return true;
  }
  //console.log('[' + emptyItem.rowIndex + ', ' + emptyItem.columnIndex + ']');
  let expectedNumbers = makeExpectedNumbers(arr, emptyPoint[0], emptyPoint[1]);
  for (let expectedNumber of expectedNumbers) {
    arr[emptyPoint[0]][emptyPoint[1]] = expectedNumber;
    if (sudokou(arr) === true) {
      return true;
    }
  }
  arr[emptyPoint[0]][emptyPoint[1]] = 0;
  return false;
}

console.log(sudokou(problem));