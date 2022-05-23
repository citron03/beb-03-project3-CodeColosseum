import S from "./MapNav.styled";
import {useDispatch} from "react-redux";
import { mapPopUpControll } from "../redux/reducer/mapSlice";
import { SiOpenstreetmap } from 'react-icons/si';

const  MapNav = () => {
    const dispatch = useDispatch();
    return (
        <S.MapNav onClick={() => dispatch(mapPopUpControll())}>
            <SiOpenstreetmap/>
        </S.MapNav>
    );
}

export default MapNav;