import S from "./MapNav.styled";
import {useDispatch} from "react-redux";
import { mapPopUpControll } from "../redux/reducer/mapSlice";
import { ImMap2 } from 'react-icons/im';

const  MapNav = () => {
    const dispatch = useDispatch();
    return (
        <S.MapNav onClick={() => dispatch(mapPopUpControll())}>
            <ImMap2/>
        </S.MapNav>
    );
}

export default MapNav;