import {useState, useCallback} from 'react';

const getAccount = async (setAccount) => {
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable()
            setAccount(accounts[0]);
        }
    } else {
        // 없음
        alert("No Kaikas!")
    }
}

export const useAccount = () => {

    const [account, setAccount] = useState("");

    const handleLogout = useCallback(() => {
        setAccount("");
    }, []);

    const handleLogin = useCallback(() => {
        getAccount(setAccount);
    }, []);

    return [account, handleLogin, handleLogout];
}