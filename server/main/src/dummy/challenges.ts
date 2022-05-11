const Challenges = [
    {
        missionTitle: "짐 나르기",
        answerCode: `function solution(stuff, limit) {
            stuff.sort((a, b) => a - b);
            let start = 0;
            let end = stuff.length - 1;
            let count = 0;
        
            while (start <= end) {
            if (start === end) {
                count += 1;
                break;
            }
        
            if (stuff[start] + stuff[end] <= limit) {
                count += 1;
                start += 1;
                end -= 1;
            } else {
                count += 1;
                end -= 1;
            }
            }
        
            return count;
        }`,
    },
    {
        missionTitle: "보드 게임",
        answerCode: `function solution(board, operation) {
            const dir = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
            let player = [0, 0];
          
            let score = 0;
            for (let move of operation) {
              const nextPosX = player[0] + dir[move][0];
              const nextPosY = player[1] + dir[move][1];
              if (
                nextPosX < 0 ||
                nextPosX >= board.length ||
                nextPosY < 0 ||
                nextPosY >= board.length
              ) {
                return "OUT";
              }
              score += board[nextPosX][nextPosY];
              player = [nextPosX, nextPosY];
            }
            return score;
          }`,
    },
    {
        missionTitle: "블랙잭은 지겨워",
        answerCode: `function solution(cards) {
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
          }`,
    },
]

export = Challenges