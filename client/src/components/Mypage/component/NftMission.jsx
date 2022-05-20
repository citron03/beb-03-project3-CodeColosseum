import S from "./NftMission.styled";

const NftMission = ({data}) => {
    return (
        <S.NftMission>
            <S.P>더미 데이터</S.P>
            <S.P>{data.name}</S.P>
        </S.NftMission>
    );
}

export default NftMission;