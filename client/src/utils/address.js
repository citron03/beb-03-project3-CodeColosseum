import axios from "axios";

const getAccount = async () => {
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable();
            const checkUser = await axios(`/user/${accounts[0]}`);
            return checkUser;
        }
    } else {
        alert("No Kaikas!");
    }
}

const getAccountAddress = async () => {
    // window.klaytn.selectedAddress
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable();
            return accounts[0];
        }
    } else {
        alert("No Kaikas!");
    }
}

export {getAccount, getAccountAddress};