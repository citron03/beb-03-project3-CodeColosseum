import S from "./MissionSelector.styled";

const MissionSelector = ({setSelector}) => {
    // 1: 콜로세움,  2: 풀림(풀렸지만 NFT화는 안됨), 3:NFT로 만들어짐(NFT화가 되었지만 공개는 안함), 4:연습문제로 공개됨    

    const handleSelector = (e) => {
        setSelector((prev) => Object.assign({...prev}, {[e.target.value]: e.target.checked}));
    }

    return (
        <S.MissionSelector>
            <S.Div>
                <S.Label>미해결) 콜로세움 미션</S.Label>
                <S.Checkbox type="checkbox" name="1" value={1} onChange={handleSelector} defaultChecked/>
            </S.Div>
            <S.Div>
                <S.Label>해결) 콜로세움 미션</S.Label>
                <S.Checkbox type="checkbox" name="2" value={2} onChange={handleSelector} defaultChecked/>
            </S.Div>
            <S.Div>
                <S.Label>NFT 미션</S.Label>
                <S.Checkbox type="checkbox" name="3" value={3} onChange={handleSelector} defaultChecked/>
            </S.Div>
            <S.Div>
                <S.Label>연습문제</S.Label>
                <S.Checkbox type="checkbox" name="4" value={4} onChange={handleSelector} defaultChecked/>
            </S.Div>
        </S.MissionSelector>
    );
}

export default MissionSelector;