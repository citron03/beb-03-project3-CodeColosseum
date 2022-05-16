const parseDate = (input) => {
    const date = new Date(input);
    const str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    return str;
}

export {parseDate};