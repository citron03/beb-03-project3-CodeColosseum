const getKorDate = (input) => {
    const time = new Date(input);
    const utc = curr.getTime() + (time.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const korDate = new Date(utc + (KR_TIME_DIFF));
    return korDate;
}

const parseDate = (input) => {
    const date = getKorDate(input);
    const str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    return str;
}

const parseDateOnlyHour = (input) => {
    const date = getKorDate(input);
    const str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    ${date.getHours()}시`;
    return str;
}


const getMinutes = () => {
    const minutes = [];
    for(let i = 20; i <= 60; i++){
        minutes.push(i);
    }
    return minutes;
}

const getHours = () => {
    const hours = [];
    for(let i = 0; i < 24; i++){
        hours.push(i);
    }
    return hours;
}


export {parseDate, getMinutes, getHours, parseDateOnlyHour};