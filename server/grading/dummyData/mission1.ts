export const code1 = `function solution(stuff, limit) {
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
  }

`;

export const testCase1 = [
  { input: [[70, 50, 80, 50], 100], output: 3 },
  { input: [[60, 80, 120, 135], 140], output: 3 },
  { input: [[42, 25, 60, 73, 103, 167], 187], output: 4 },
  {
    input: [
      [60, 73, 80, 87, 103, 109, 119, 123, 128, 129, 136, 146, 153, 168, 182],
      200,
    ],
    output: 11,
  },
];
