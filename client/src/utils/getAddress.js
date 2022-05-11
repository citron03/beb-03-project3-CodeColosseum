const getAddress = async () => {
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable()
            localStorage.setItem("isLogin", JSON.stringify(true));
            return accounts[0];
        }
    } else {
        // 없음
        alert("No Kaikas!");
        return "";
    }
}

export default getAddress;