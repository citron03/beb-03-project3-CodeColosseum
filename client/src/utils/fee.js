const calFeerate = (value) => {
    return Math.pow(0.9985362, value-2000) + 1;
}

const calFee = (value) => {
    return value * calFeerate(value) / 100;
}

const calAmount = (value) => {
    return value - calFee(value);
}

export {calFeerate, calFee, calAmount};