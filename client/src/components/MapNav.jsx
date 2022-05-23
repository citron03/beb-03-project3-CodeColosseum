import S from "./MapNav.styled";
import {useDispatch} from "react-redux";
import { mapPopUpControll } from "../redux/reducer/mapSlice";

const  MapNav = () => {
    const dispatch = useDispatch();
    return (
        <S.MapNav onClick={() => dispatch(mapPopUpControll())}>
            🗺️
        </S.MapNav>
    );
}

export default MapNav;