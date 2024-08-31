const expressAsyncHandler = require("express-async-handler");

const userResponseModel = require("../model/userResponse");

const questions = require("../model/questions");

const saveUserTestResponse = expressAsyncHandler(async (req, res) => {
  console.log("req in the save dasta ;", req);
  if (!(req.body.userId && req.body.testId && req.body.testData)) {
    const savedData = await userResponseModel.create(req.body);
    res
      .status(200)
      .send({ message: "data saved succesfylly ........", data: savedData });
  } else {
    res.status(402).send({
      message: "precondition failed .......",
    });
  }
});

const saveObtainedMarks = expressAsyncHandler(async (req, res) => {
  if (req.body.userId && req.body.testId) {
    let marks = 45;
    let pipeline = [
      {
        $match: { testId: req.body.testId },
      },
      {
        $addFields: {
          answerList: {
            $cond: {
              if: {
                $or: [
                  "$option_A.isAnswer",
                  "$option_B.isAnswer",
                  "$option_C.isAnswer",
                  "$option_D.isAnswer",
                ],
              },
              then: {
                $map: {
                  input: ["$option_A", "$option_B", "$option_C", "$option_D"],
                  as: "opt",
                  in: {
                    $cond: {
                      if: { $eq: ["$$opt.isAnswer", "true"] },
                      then: "$$opt._id",
                      else: "null",
                    },
                  },
                },
              },
              else: null,
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ];
    let studentAnswer = await userResponseModel.findOne({
      $and: [{ userId: req.body.userId }, { testId: req.body.testId }],
    });
    let answerKey = await questions.aggregate(pipeline);
    console.log("in the answer key matching ", answerKey);
    console.log("student response", studentAnswer);
    let totalMarks = 0;

    answerKey.forEach((question) => {
      if (question.answerList) {
        let isTrueAns = question.answerList.find((value) => {
         return value == studentAnswer.ansMap.get(question._id);
        });
        if (isTrueAns) {
          totalMarks++;
        }
      }
    });
    console.log('total gained marks' , totalMarks);



    const savedMarks = await userResponseModel.findOneAndUpdate(
      { $and: [{ studentId: req.studentId }, { testId: req.testId }] },
      { $set: { obtainedMarks: totalMarks } },
      { returnDocument: "after" }
    );

    res
      .status(200)
      .send({ message: "marks saved succesfully ....", data: savedMarks });
  } else {
    res.status(402).send({ message: "pre condition failed.........." });
  }
});

module.exports = { saveUserTestResponse, saveObtainedMarks };
