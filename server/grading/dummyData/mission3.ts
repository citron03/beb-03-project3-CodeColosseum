export const code3 = `function solution(cards) {
    const check = Array.from({ length: cards.length }, (v, i) => 0);
    let result = 0;
    function solution(n, num, p) {
      if (n === 3) {
        result = checkPrimeNumber(num) ? result + 1 : result;
        return;
      }
  
      for (let i = p; i < cards.length; i++) {
        if (check[i] === 0) {
          check[i] = 1;
          solution(n + 1, num + cards[i], i + 1);
          check[i] = 0;
        }
      }
    }
    solution(0, 0, 0);
    return result;
  }
  
  function checkPrimeNumber(num) {
    let i = 2;
    while (i <= Math.sqrt(num)) {
      if (num % i === 0) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  exports.solution = solution;
  `;

export const testCase3 = [
  { input: [[1, 2, 3, 4]], output: 1 },
  { input: [[2, 3, 4, 8, 13]], output: 3 },
  { input: [[2, 4, 6, 8, 14, 27]], output: 5 },
  { input: [[3, 5, 11, 29, 38, 41, 43]], output: 8 },
  { input: [[4, 6, 9, 13, 21, 28, 32, 37, 48]], output: 27 },
  { input: [[2, 7, 9, 11, 17, 23, 29, 31, 35, 39, 43]], output: 52 },
  { input: [[3, 5, 7, 11, 19, 22, 27, 29, 33, 39, 41, 49]], output: 74 },
];
