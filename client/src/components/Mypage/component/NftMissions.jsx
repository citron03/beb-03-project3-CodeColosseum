import S from "./NftMissions.styled";
import NftMission from "./NftMission";

const dummyData = [{
    name: "더미1",
},{
    name: "더미2",
},{
    name: "더미3",
},{
    name: "더미4",
},{
    name: "더미5",
}]

const NftMissions = () => {
    return (
        <S.NftMissions>
            <S.H2>내 NFT 미션들</S.H2>
            <S.NftDiv>
                {dummyData.length > 0 ? 
                    dummyData.map((el, idx) => <NftMission key={idx} data={el}/>)
                : null}
            </S.NftDiv>
        </S.NftMissions>
    );
}

export default NftMissions;