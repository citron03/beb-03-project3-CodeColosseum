import S from "./Review.styled";

const Review = ({review, handleReview}) => {
    return (
        <S.Review>
            <S.H1>리뷰를 남겨주세요</S.H1>
            <S.TextArea placeholder="리뷰를 남겨주세요" onChange={(e) => handleReview(e)} value={review}/>
        </S.Review>
    );
}

export default Review;