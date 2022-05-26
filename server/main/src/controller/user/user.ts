import models from "../../models";
import { getWithdrawableAmount } from "../../utils";

const get = async (req: any, res: any) => {
  // 요청을 받아서 디비에 정보 있는지 확인하고 있으면 200 '유저있다' 와 유저데이터 응답주고 없으면 200 '유저업다' 응답.
  try {
    const account = req.params.account;
    const user = await models.User.findOne({ account });
    const nftReward = await getWithdrawableAmount(user.id);
    if (user) {
      res.status(200).send({
        message: "user found!",
        data: {
          account: user.account,
          nickName: user.nickName,
          image: user.image,
          mineral: user.mineral,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          nftReward,
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
