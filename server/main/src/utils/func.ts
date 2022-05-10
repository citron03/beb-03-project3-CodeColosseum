const randomIntFromInterval = function(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 인자로 받은 컬랙션에서 랜덤한 _id 반환하는 함수
const getRandomId = function(collection:any):Promise<string> {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err:any, docs:any) => {
            if (err) {return reject(err)};

            const user = docs[randomIntFromInterval(0, docs.length-1)];
            return resolve(user._id);
        })
    })
}

export = {randomIntFromInterval, getRandomId};