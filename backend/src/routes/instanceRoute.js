const express = require("express");
const instanceRouter = express.Router();
const { InstanceModel } = require("../models/ec2instanceSchema");
const { S3Model } = require("../models/s3Schema");
const { KeypairModel } = require("../models/keypairSchema");
const { UserinputModel } = require("../models/userinputScema");

// make a connection
// mongoose.connect("mongodb://localhost:27017/awsdb");

// get reference to database
// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));

const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-northeast-2" });
// Todo. global 하게 설정하는 법

const ec2 = new AWS.EC2();
// const rds = new AWS.RDS();

var s3 = new AWS.S3();

// var elb = new AWS.ELB();

instanceRouter.get("/ec2instances", function (req, res) {
  let ec2Data = [];
  const params = {
    DryRun: false,
  };

  ec2.describeInstances(params, function (err, data) {
    if (err) {
      console.log("Error", err.stack);
    } else {
      console.log(data.Reservations);
      // console.log(data['Reservations'][0]);

      for (instance of data.Reservations) {
        let tmpIns = instance["Instances"][0];

        instance_info = {
          Region: tmpIns["Placement"]["AvailabilityZone"],
          VpcId: tmpIns["VpcId"],
          Name: tmpIns["Tags"][0]["Value"],
          InstanceId: tmpIns["InstanceId"],
          InstanceType: tmpIns["InstanceType"],
          PrivateIpAddress: tmpIns["PrivateIpAddress"],
          PrivateDnsName: tmpIns["PrivateDnsName"],
          PublicIpAddress: tmpIns["PublicIpAddress"],
          PublicDnsName: tmpIns["PublicDnsName"],
          SecurityGroup: tmpIns["SecurityGroups"][0]["GroupName"],
          InstanceState: tmpIns["State"]["Name"],
        };

        console.log(instance_info);
        ec2Data.push(instance_info);
      } // for

      InstanceModel.deleteMany(function (err) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Multiple documents deleted to Collection");

          InstanceModel.insertMany(ec2Data, function (err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });
        }
      });

      InstanceModel.find({}).then(function (instanceModels) {
        res.send(instanceModels);
      });
    }
  });
});

instanceRouter.get("/keypairs", function (req, res) {
  let keypairData = [];
  const params = {
    DryRun: false,
    KeyNames: [
      "default-tika-key",
      "Key-Hybrix-Demo",
      "Key-IAMPAM",
      "Key-Jitsi-Demo",
      "key-testuser",
      "key-wanis",
      "MyEKSKeypair",
    ], // Todo. KeyNames 직접 입력 안하고 가져오는 법
  };
  ec2.describeKeyPairs(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } // an error occurred
    else {
      console.log(data.KeyPairs);
      keypairData = data.KeyPairs;

      KeypairModel.deleteMany(function (err) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Multiple documents deleted to Collection");

          KeypairModel.insertMany(keypairData, function (err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });
        }
      });

      KeypairModel.find({}).then(function (keypairModels) {
        res.send(keypairModels);
      });

      // res.send(data);
    } // successful response
  });
});

// Todo. document가 무엇인지에 따라 DocID에 서로 다른 data 를 넣어주어야 함.
// 각 요소들마다 따로 method 를 만들 것인지, id를 조건을 주어 처리할 것인지
instanceRouter.put("/userinput", function (req, res) {
  // req 받아오기 (해당 document 전체를 받아온다고 가정)
  let JoinDocIdInput = "test";
  let commentInput = "Hello1";
  let CheckDateInput = new Date();

  // let existUsrInputCnt = 0;

  // Todo. 실행순서 문제 해결해야함.

  // cnt equals 0 insert, cnt not 0 update
  // UserinputModel.countDocuments(
  //   {
  //     JoinDocId: JoinDocIdInput,
  //   },
  //   function (error, usrinputCnt) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       if (usrinputCnt == 0) {
  //         UserinputModel.insertMany([
  //           {
  //             JoinDocId: JoinDocIdInput,
  //             Comment: commentInput,
  //             CheckDate: CheckDateInput,
  //           },
  //         ]);
  //       } else {
  //         UserinputModel.updateMany();
  //       }
  //     }
  //   }
  // );

  UserinputModel.findOneAndUpdate(
    { JoinDocId: JoinDocIdInput },
    {
      $set: {
        JoinDocId: JoinDocIdInput,
        Comment: commentInput,
        CheckDate: CheckDateInput
      },
    },
    {
      upsert: true,
      returnDocument: true
    }
  ).then(function (userinputModels) {
    console.log(userinputModels);
  });

  // UserinputModel.find({}).then(function (userinputModels) {
  //   console.log(userinputModels);
  // });
});

instanceRouter.get("/s3", function (req, res) {
  let bucketData = [];
  const params = {};
  s3.listBuckets(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } // an error occurred
    else {
      console.log(data.Buckets);
      bucketData = data.Buckets;
      // res.send(data);

      // console.log("Connection Successful!");

      // documents array
      // bucketData

      S3Model.deleteMany(function (err) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Multiple documents deleted to Collection");

          // save mulipledocuments to the collection referenced by S3 Model
          S3Model.insertMany(bucketData, function (err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });
        }
      });

      S3Model.find({}).then(function (s3Models) {
        res.send(s3Models);
      });

      // for(output in s3Result) {
      //   console.log(JSON.stringify(output));
      // }
      // console.log(s3Result);
      // res.send(s3Result);
    } // successful response
  });

  // db.once("open", function () {

  // });
});

instanceRouter.get("/routetables", function (req, res) {
  console.log("routetables");
});

instanceRouter.get("/rds", function (req, res) {
  console.log("rds");
});

instanceRouter.get("/elb", function (req, res) {
  // const params = {
  //   LoadBalancerNames: [
  //     // 'acl-mckwon-portal',
  //     'ALB-iampam',
  //     // 'ELB-Seoul-Private',
  //     // 'ELB-Seoul-Public'
  //   ]
  //   // Todo. array 가져오는 방법 생각해보기
  // };
  // elb.describeLoadBalancers(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
});

module.exports = { instanceRouter };
