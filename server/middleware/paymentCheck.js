const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


const calDateDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays > 0;
};

checkPaymentExpiration = (req, res, next) => {
  console.log(req.body)
  //Username
  User.findOne({
    where: {
      id: req.body.userId,
    },
  }).then((user) => {
    if (user) {
      let ispayment = false
      if ("planStartDate" in user.subscription) {
        ispayment = calDateDifference(user.subscription.planStartDate, user.subscription.planEndDate)
        if (ispayment) {
          return;
        } else {
          res.status(500).send({message: "Your payment expired!"})
        }
      } else {
        if(ispayment) {
          res.status(500).send({message: "Subscribe your payment!"})
        }
      }
      return;
    }

  });
  next();
};

const paymentCheck = {
  checkPaymentExpiration: checkPaymentExpiration,
};

module.exports = paymentCheck;