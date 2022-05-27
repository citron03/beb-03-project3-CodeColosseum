const parseDate = (input) => {
    const date = new Date(input);
    const str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
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
    for(let i = 10; i < 23; i++){
        hours.push(i);
    }
    return hours;
}


export {parseDate, getMinutes, getHours};