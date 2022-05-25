import { MissionColosseum, Inputs, Output, TestCases } from "../utils"
import modeals from "../models"
import axios from "axios"
import { ENV } from "../config"

interface Mission {
    _id: string;
    title: string
    paragraph: string
    creator: string
    colosseum: MissionColosseum
    inputs: Inputs
    output: Output
    refCode: string
    testCases: TestCases
}

/*
미션객체를 인자로 주면 업로드하고 uri 를 리턴
*/
export default async ( missionDoc:Mission ):Promise<string> => {
    try {
        // 업로드할 메타데이터 만들기
        const creator = await modeals.User.findById(missionDoc.creator);
        const data = {
            "metadata": {
                title: missionDoc.title,
                paragraph: missionDoc.paragraph,
                creator: creator.account,
                inputs: missionDoc.inputs,
                output: missionDoc.output,
                refCode: missionDoc.refCode,
                testCases: missionDoc.testCases,
                limitSeconds: missionDoc.colosseum.limitSeconds,
                winner: missionDoc.colosseum.winner,
                losers: missionDoc.colosseum.losers,
                stakedTokens: missionDoc.colosseum.stakedTokens
            },
            "filename": `${missionDoc._id}.json`
        };
        
        // 업로드 요청 날리고 uri 리턴하기
        const { ACCESSKEYID, SECRET_ACCESSKEY, CHAIN_ID } = ENV;
        if (!ACCESSKEYID || !SECRET_ACCESSKEY || !CHAIN_ID) {throw new Error("ACCESSKEYID or SECRET_ACCESSKEY or CHAIN_ID is not defined")};
        
        const result = await axios.post("https://metadata-api.klaytnapi.com/v1/metadata", data, {
            auth: {
              username: ACCESSKEYID,
              password: SECRET_ACCESSKEY
            },
            headers: {
                "x-chain-id": CHAIN_ID,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.data.uri)
        .catch(err => { throw err });

        return result;
    } 
    catch (error) {
        throw error;
    }
}