//import { sudokou } from './solution.js';
//import problem_01 from './problems/problem_01'

// 엘리먼트를 담은 변수들
const board = document.querySelector(".board");
const solve = document.querySelector('.solve');
const visualize = document.querySelector('.visualize');
const initialize = document.querySelector('.initialize');

// 문제
// const problem_01 = [
//   [0, 3, 0, 2, 6, 0, 7, 0, 1],
//   [6, 8, 0, 0, 7, 0, 0, 9, 0],
//   [1, 9, 0, 0, 0, 4, 5, 0, 0],
//   [8, 2, 0, 1, 0, 0, 0, 4, 0],
//   [0, 0, 4, 6, 0, 2, 9, 0, 0],
//   [0, 5, 0, 0, 0, 3, 0, 2, 8],
//   [0, 0, 9, 3, 0, 0, 0, 7, 4],
//   [0, 4, 0, 0, 5, 0, 0, 3, 6],
//   [7, 0, 3, 0, 1, 8, 0, 0, 0]
// ]
const problem_01 = [
  [0, 9, 0, 7, 5, 0, 0, 3, 0],
  [1, 0, 6, 0, 0, 0, 0, 0, 0],
  [8, 0, 0, 3, 0, 0, 4, 0, 2],
  [0, 2, 0, 0, 8, 0, 0, 4, 0],
  [0, 0, 0, 6, 0, 0, 8, 0, 0],
  [0, 6, 0, 0, 0, 1, 0, 0, 7],
  [0, 0, 0, 0, 9, 0, 0, 8, 0],
  [3, 0, 2, 0, 4, 0, 0, 0, 5],
  [0, 0, 0, 0, 0, 0, 1, 0, 0]
]
// 초기 문제를 보여준다.
showBoard(board, problem_01);

// 유틸 함수들 
function cloneProblem(arr) {
  let clone = [];
  for (let key of arr) {
    if (Array.isArray(key)) {
      clone = [...clone, cloneProblem(key)];
    } else {
      clone = [...clone, key]
    }
  }
  return clone;
}

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

function showBoard (board, pzl) {
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++) {
      board.children[i].children[j].textContent = pzl[i][j];
      if (pzl[i][j] === 0) {
        board.children[i].children[j].textContent = '';
        board.children[i].children[j].classList.add('todo');
      }
    }
  }
}

function getRandomInt(start, end) {
  let min = Math.ceil(start);
  let max = Math.floor(end);
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateElement(arr, i, j) {
  if (arr[i][j] != 0) {
    board.children[i].children[j].textContent = arr[i][j];
  } else {
    board.children[i].children[j].textContent = '';
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// 스도쿠 한 번에 푸는 알고리즘
function sudokou(arr) {
  if (sudokouSolve(arr)) {
    return arr;
  }
  function sudokouSolve(arr) {
    let emptyPoint;
    emptyPoint = findEmptyPoint(arr);
    if (emptyPoint === undefined) {
      return true;
    }
    let expectedNumbers = makeExpectedNumbers(arr, emptyPoint[0], emptyPoint[1]);
    for (let expectedNumber of expectedNumbers) {
      arr[emptyPoint[0]][emptyPoint[1]] = expectedNumber;
      if (sudokouSolve(arr) === true) {
        return true;
      }
    }
    arr[emptyPoint[0]][emptyPoint[1]] = 0;
    return false;
  }
}

// 클론 문제를 만들어, 답을 구하기
let clone_01_problem = cloneProblem(problem_01);
let solution = sudokou(clone_01_problem);
solve.addEventListener('click', () => showBoard(board, solution));
// 다른 클론 문제를 만들어, backtracking 과정을 보여주기
let clone_02_problem = cloneProblem(problem_01);
async function solving(arr, speed) {
  const backtrack = [];
  const visited = {};
  let i = 0, j = 0;
  while (i < arr.length) {
    while (j < arr[0].length) {
      if (arr[i][j] === 0) {
        backtrack.push([i, j]);
        visited[`${i}${j}`] = [];
      }
      
      if (backtrack.length > 0 && backtrack[backtrack.length - 1][0] === i && backtrack[backtrack.length - 1][1] === j) {
        
        let expectedNumbers = makeExpectedNumbers(arr, i, j);
        for (let m of visited[`${i}${j}`]) {
          if (expectedNumbers.includes(m)) {
            expectedNumbers.splice(expectedNumbers.indexOf(m), 1);
          }
        }
        if (expectedNumbers.length > 0){
          arr[i][j] = expectedNumbers[getRandomInt(0, expectedNumbers.length)];
          updateElement(arr, i, j);
          await sleep(speed);
          visited[`${i}${j}`].push(arr[i][j]);
          j++;
        } else {
          arr[i][j] = 0;
          updateElement(arr, i, j);
          await sleep(speed);
          backtrack.pop();
          delete visited[`${i}${j}`];
          i = backtrack[backtrack.length - 1][0];
          j = backtrack[backtrack.length - 1][1];
        }
      }
      else {
        j++
      }
    }
    i++;
    j = 0;
  }
  return arr;
}

visualize.addEventListener('click', () => solving(clone_02_problem, 0.1))
initialize.addEventListener('click', () => showBoard(board, problem_01))