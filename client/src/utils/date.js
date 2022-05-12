const parseDate = (input) => {
    const date = new Date(input);
    const str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return str;
}

export {parseDate};