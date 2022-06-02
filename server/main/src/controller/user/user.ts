import { caver, fromDb } from "../../config";
import { ccToken, log } from "../../contract";
import models from "../../models";
import { getWithdrawableAmount, makeReturnByTxResult, TokenTransferLogFor } from "../../utils";

const get = async (req: any, res: any) => {
  // 요청을 받아서 디비에 정보 있는지 확인하고 있으면 200 '유저있다' 와 유저데이터 응답주고 없으면 200 '유저업다' 응답.
  try {
    const account = req.params.account;
    const user = await models.User.findOne({ account });
    if (user) {
      const nftReward = await getWithdrawableAmount(user.id);
      const ccTokenBalance = await ccToken.getBalance(account);
      res.status(200).send({
        message: "user found!",
        data: {
          _id: user.id,
          account: user.account,
          nickName: user.nickName,
          image: user.image,
          mineral: user.mineral,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          nftReward,
          ccToken: ccTokenBalance,
        },
      });
    } else {
      res.status(200).send({ message: "user not found!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const post = async (req: any, res: any) => {
  // account 가 담긴 body 를 포함하는 요청을 받아서 유저를 생성
  // 이 요청이 온다는 것은 이미 account 로 유저를 조회하지 못했다는것을 의미함. 따라서 account 는 유니크하다고 믿고 시작.
  try {
    const account = req.body.account;
    const nickName = account.substring(account.length - 4, account.length); // 닉네임의 초기값은 account 의 마지막 4글자이다.
    const newUser = new models.User({
      account,
      nickName,
    });
    await newUser.save();
  /////////////
    // Baobab Test Token 300개 지급하고 로그 저장하기
    const from = fromDb.account.CoCo;
    const amount = '300';
    let resultAt;
    // 전송!
    const result = await caver.kas.kip7.transfer(fromDb.CCToken.address, from, account, amount)
      .then((r:any) => {
        r.from = from
        r.feePayer = from
        resultAt = new Date();
        return r
      })
      .catch((e:any) => {
        console.log(e);
        resultAt = new Date();
        return e
      });
    // tx리턴객체만들기
    const txResult = makeReturnByTxResult(result, account, amount, resultAt);
    // 로그 생성!
    const transferFor:TokenTransferLogFor = {
      collection: 'User',
      id: newUser.id,
    }
    const txLog = await log.createTokenTransferLog(txResult,9,transferFor)
      .catch((e:any) => {
        return e
      });
    console.log(txLog);
  //////////////
    res.status(201).send({ message: "user created!", data: newUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

const patch = async (req: any, res: any) => {
  // 유저 정보 수정 (하나의 정보만 수정하는 요청) , 유저 account 로 이미 유저 확인이 된 상태이고 유저의 확인도 얻은 상태로 요청이 들어 왔음을 알고 처리.
  try {
    const account = req.params.account;
    const body = req.body;
    // 어떤 걸 수정하는 요청인지 확인하고 처리
    if (body.nickName) {
      // 닉네임 유니크한지 확인 (변경점이 있는지는 프론트에서 확인하였음)
      const userCheck = await models.User.exists({ nickName: body.nickName });
      if (userCheck) {
        return res.status(400).send({ message: "nickName is not unique!" });
      }
      // 수정
      const updatedUser = await models.User.findOneAndUpdate(
        { account },
        { nickName: body.nickName },
        { new: true }
      );
      res.status(200).send({ message: "nickName updated!", data: updatedUser });
    } else if (body.image) {
      res.status(400).send({
        message: "Sorry, Request to update image is not available yet!",
      });
    } else {
      res.status(400).send({ message: "There is no data to update in body!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export = { get, post, patch };
