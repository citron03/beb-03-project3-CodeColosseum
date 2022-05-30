import type { Output, Inputs, TestCases } from '../src/utils';

// 코플릿 알고리즘 1짐나르기, 3보드게임, 7블랙잭

interface dummyMission {
    title: string;
    description?: string;
    paragraph: string;
    inputs: Inputs;
    output: Output;
    refCode: string;
    testCases: TestCases;
}

type dummyMissions = dummyMission[]

const missions : dummyMissions = [
    {
        title: "짐 나르기",
        paragraph: `김코딩과 박해커는 사무실 이사를 위해 짐을 미리 싸 둔 뒤, 짐을 넣을 박스를 사왔다. 박스를 사오고 보니 각 이사짐의 무게는 들쭉날쭉한 반면, 박스는 너무 작아서 한번에 최대 2개의 짐 밖에 넣을 수 없었고 무게 제한도 있었다.
        예를 들어, 짐의 무게가 [70kg, 50kg, 80kg, 50kg]이고 박스의 무게 제한이 100kg이라면 2번째 짐과 4번째 짐은 같이 넣을 수 있지만 1번째 짐과 3번째 짐의 무게의 합은 150kg이므로 박스의 무게 제한을 초과하여 같이 넣을 수 없다.
        박스를 최대한 적게 사용하여 모든 짐을 옮기려고 합니다.
        짐의 무게를 담은 배열 stuff와 박스의 무게 제한 limit가 매개변수로 주어질 때, 모든 짐을 옮기기 위해 필요한 박스 개수의 최소값을 return 하도록 movingStuff 함수를 작성하세요.
        
        주의사항
        - 옮겨야 할 짐의 개수는 1개 이상 50,000개 이하입니다.
        - 박스의 무게 제한은 항상 짐의 무게 중 최대값보다 크게 주어지므로 짐을 나르지 못하는 경우는 없습니다.`,
        inputs: [
            {name: 'stuff', type: "array", description: `Number 타입의 40 이상 240 이하의 자연수를 담은 배열`, ex: [70, 50, 80, 50]}, // 배열의 구체적인 모습까지 타입스크립트처럼 코드에 담는 방법은? (시간남으로면 테스트 해보기)
            {name: 'limited', type: "number", description: `Number 타입의 40 이상 240 이하의 자연수`},
        ],
        output: {type: "number", description: `모든 짐을 옮기기 위해 필요한 박스 개수의 최솟값을 숫자로 반환합니다.`},
        refCode: `function movingStuff(stuff, limit) {
            let twoStuff = 0;
            // 짐을 무게순으로 오름차순 정렬
            let sortedStuff = stuff.sort((a, b) => a - b);
            // 가장 가벼운 짐의 인덱스
            let leftIdx = 0;
            // 가장 무거운 짐의 인덱스
            let rightIdx = sortedStuff.length - 1;
            while(leftIdx < rightIdx) {
                // 가장 가벼운 짐과 무거운 짐의 합이 limit 보다 작거나 같으면 2개를 한번에 나를 수 있다
                if(sortedStuff[leftIdx] + sortedStuff[rightIdx] <= limit) {
                // 다음 짐을 확인하기 위해 가장 가벼운 짐과 무거운 짐을 가리키는 인덱스를 옮겨주고
                // 한번에 2개 옮길 수 있는 개수를 +1 해준다   
                    leftIdx++;
                    rightIdx--;
                    twoStuff++;
                } else {
                    // 위 조건에 맞지 않는 경우는 한번에 한 개만 나를 수 있는 경우이기 때문에
                    // 가장 무거운 짐의 인덱스만 옮겨준다
                        rightIdx--;
                }
            }
            // 전체 짐의 개수에서 한번에 2개를 나를 수 있는 경우를 빼 주면 총 필요한 박스의 개수를 구할 수 있다
            return stuff.length - twoStuff;
          }`,
        testCases: [
            { inputs: [[70, 50, 80, 50], 100], output: 3, isExample: true },
            { inputs: [[60, 80, 120, 135], 140], output: 3, isExample: true },
            { inputs: [[42, 25, 60, 73, 103, 167], 187], output: 4 },
            { inputs: [[60, 73, 80, 87, 103, 109, 119, 123, 128, 129, 136, 146, 153, 168, 182], 200], output: 11 },
          ]
    },
    {
        title: "보드 게임",
        paragraph: `N * N의 크기를 가진 보드판 위에서 게임을 하려고 합니다. 게임의 룰은 다음과 같습니다.

        1. 좌표 왼쪽 상단(0, 0)에 말을 놓는다.
        2. 말은 상, 하, 좌, 우로 이동할 수 있고, 플레이어가 조작할 수 있다.
        3. 조작의 기회는 딱 한 번 주어진다.
        4. 조작할 때 U, D, L, R은 각각 상, 하, 좌, 우를 의미하며 한 줄에 띄어쓰기 없이 써야 한다.
            예시: UDDLLRRDRR, RRRRR
        5. 한 번 움직일 때마다 한 칸씩 움직이게 되며, 그 칸 안의 요소인 숫자를 획득할 수 있다.
        6. 방문한 곳을 또 방문해도 숫자를 획득할 수 있다.
        7. 보드 밖을 나간 말은 OUT 처리가 된다.
        8. 칸 안의 숫자는 0 또는 1이다.
            단, 좌표 왼쪽 상단(0, 0)은 항상 0이다.
        9. 획득한 숫자를 합산하여 숫자가 제일 큰 사람이 이기게 된다.
        
        보드판이 담긴 board와 조작하려고 하는 문자열 operation이 주어질 때, 말이 해당 칸을 지나가면서 획득한 숫자의 합을 구하는 함수를 작성하세요.

        주의사항
        - 만약, 말이 보드 밖으로 나갔다면 즉시 OUT 을 반환합니다.`,
        inputs: [
            {name: 'board', type: "array",
            description: `- number 타입의 2차원 배열
            - 2 <= board.length <= 1,000`, ex: [ [0, 0, 1], [1, 0, 1], [1, 1, 1] ] },
            {name: 'operation', type: "string",
            description: `- string 타입의 대문자 영어가 쓰여진 문자열
            - 1 <= operation.length <= board.length * 2
            - U, L, D, R 이외의 문자열은 없습니다.`},
        ],
        output: {type: "number", description: `board와 operation이 입력값의 예시 ([ [0, 0, 1], [1, 0, 1], [1, 1, 1] ], DDR)일 때, (0, 0) -> (1, 0) -> (2, 0) -> (2, 1) 순서로 이동하게 되고, 각 0, 1, 1, 1을 얻어 3을 반환합니다.`},
        refCode: `// LOOK UP TABLE을 사용한다면 조건문을 추상화시킬 수 있습니다.
        function boardGame(board, operation) {
          // TODO: 여기에 코드를 작성하세요.
          const DIR = {
            'U': [-1, 0],
            'D': [1, 0],
            'L': [0, -1],
            'R': [0, 1]
          }
          const LEN = board.length;
          const isValid = (y, x) => 0 <= y && y < LEN && 0 <= x && x < LEN;
        
          let Y = 0;
          let X = 0;
          let score = 0;
          for (let i = 0; i < operation.length; i++) {
            const [dY, dX] = DIR[operation[i]];
            Y += dY;
            X += dX;
            if (isValid(Y, X) === false) return 'OUT';
            score += board[Y][X];
          }
          return score;
        };`,
        testCases: [
            {
              inputs: [
                [
                  [0, 0, 1],
                  [1, 1, 1],
                  [1, 0, 0],
                ],
                "UUUDD",
              ],
              output: "OUT",
              isExample: true,
            },
            {
              inputs: [
                [
                  [0, 0, 0, 1],
                  [1, 1, 1, 0],
                  [1, 1, 0, 0],
                  [0, 0, 0, 0],
                ],
                "RRDLLD",
              ],
              output: 4,
              isExample: true,
            },
            {
              inputs: [
                [
                  [0, 0, 0, 0, 0],
                  [0, 0, 1, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 1, 0],
                  [0, 0, 0, 0, 0],
                ],
                "DDRRRUDUDUD",
              ],
              output: 0
            },
            {
              inputs: [
                [
                  [0, 1, 0, 0, 0],
                  [1, 1, 1, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 1, 0, 1, 0],
                  [1, 1, 0, 0, 0],
                ],
                "DDRUULDD",
              ],
              output: 7
            },
        ]
    },
    {
        title: "블랙잭은 지겨워",
        paragraph: `평범한 블랙잭 게임에서 수시로 패배하자 흥미가 떨어진 김코딩은 박타짜에게 게임룰을 변형하여 새로운 카드 놀이를 해 볼 것을 제안합니다.
        새로운 룰은 다음과 같습니다.
        
        1. 숫자로 이루어진 카드를 여러 장 받습니다.
        2. 3장씩 카드를 고르고, 3장에 적힌 숫자들의 합이 소수인지 확인합니다.
        3. 받아든 카드로 만들 수 있는 소수의 개수가 많은 사람이 이기게 됩니다.

        예로, [1, 2, 3, 4]라는 카드를 받았을 때 만들 수 있는 숫자는 6, 7, 8, 9이고, 소수는 7 하나이기 때문에 가지고 있는 소수의 개수는 1개입니다.
        [2, 3, 4, 8, 13]라는 카드를 받았을 때 만들 수 있는 숫자는 9, 13, 18, 14, 19, 23, 15, 20, 24, 25이고, 소수는 13, 19, 23 총 3개이기 때문에 가지고 있는 소수의 개수는 3개입니다.
        
        게임을 진행하기 전에 소수에 대해 아무런 지식이 없는 박타짜는 게임을 며칠 미룬 뒤, 게임의 룰을 따르는 함수를 만들기로 했습니다.
        소수에 약한 박타짜를 도와 여러 장의 카드 중 세 장씩 조합해 소수가 되는 경우의 수를 리턴하는 함수를 완성해 주세요.
        
        주의사항
        - cards 에는 중복된 숫자의 카드는 들어있지 않습니다.
        - 각 카드에 적힌 수는 1이상 1,000이하의 자연수입니다.`,
        inputs: [
            {name: 'cards', type: "array",
            description: `3개 이상 50개 이하의 카드가 숫자로 들어 있는 배열` },
        ],
        output: {type: "number", description: `Number 타입을 리턴해야 합니다.`},
        refCode: `function boringBlackjack(cards) {
            let count = 0;
          
              // 1. cards 에서 카드 3장 뽑기
              let length = cards.length;
              // 카드 뽑는 방식은 첫 카드를 cards 의 0번 index 부터 고정해 놓고 1씩 뒤로 옮겨간다
              for (let i = 0; i < length; i++) {
              // 두 번째 카드의 인덱스는 첫 카드 + 1에서 시작해야 하고
                for (let j = i + 1; j < length; j++) {
              // 세 번째 카드의 인덱스는 두 번째 카드 + 1에서 시작해야 한다 
                  for (let k = j + 1; k < length; k++) {
                    const number = cards[i] + cards[j] + cards[k];
                    // 세 카드의 합이 소수이면 경우의 수 + 1
                    if (isPrime(number)) count++;
                  }
                }
              }
            
              //2. 소수 판별
              function isPrime(number) {
              // 2부터 비교하기 시작해서 나누어 떨어지는 수가 있으면 소수가 아니다
              // for 문 조건을 number/2 로 해도 되는 이유는 i > number/2 가 되면 몫이 절대 0이 될수 없기 때문에
              // number/2 까지만 비교해 보아도 소수 판별이 가능하다
                for (let i = 2; i < number/2; i++) {
                  if (number % i === 0) return false;
                }
                return true;
              }
            
              return count;
          }`,
        testCases: [
            { inputs: [[1, 2, 3, 4]], output: 1, isExample: true },
            { inputs: [[2, 3, 4, 8, 13]], output: 3, isExample: true },
            { inputs: [[2, 4, 6, 8, 14, 27]], output: 5 },
            { inputs: [[3, 5, 11, 29, 38, 41, 43]], output: 8 },
            { inputs: [[4, 6, 9, 13, 21, 28, 32, 37, 48]], output: 27 },
            { inputs: [[2, 7, 9, 11, 17, 23, 29, 31, 35, 39, 43]], output: 52 },
            { inputs: [[3, 5, 7, 11, 19, 22, 27, 29, 33, 39, 41, 49]], output: 74 },
          ]
    },
]

export default missions;
