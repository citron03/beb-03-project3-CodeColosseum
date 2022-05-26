export const getStar = (score) => {
    let leftScore = score;
    const starScore = [];
    // 0은 꽉찬 별 1은 반이 찬 별, 2는 빈 별
    for(let i = 0; i < 5; i++) {
        if(leftScore >= 1){
            starScore.push(0);
        } else if (leftScore >= 0.5) {
            starScore.push(1);
        } else {
            starScore.push(2);
        }
        leftScore -= 1;
    }
    return starScore;
}