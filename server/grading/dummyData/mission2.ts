export const code2 = `function solution(board, operation) {
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
  }
  `;

export const testCase2 = [
  {
    input: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
      ],
      "UUUDD",
    ],
    output: "OUT",
  },
  {
    input: [
      [
        [0, 0, 0, 1],
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      "RRDLLD",
    ],
    output: 4,
  },
  {
    input: [
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      "DDRRRUDUDUD",
    ],
    output: 0,
  },
  {
    input: [
      [
        [0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 1, 0],
        [1, 1, 0, 0, 0],
      ],
      "DDRUULDD",
    ],
    output: 7,
  },
];
