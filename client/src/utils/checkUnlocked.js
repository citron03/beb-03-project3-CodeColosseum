const checkUnlocked = async () => {
	// 지갑이 연결되어있다면 true, 아니라면 false를 리턴합니다.
	return await window.klaytn._kaikas.isUnlocked();
}

export default checkUnlocked;