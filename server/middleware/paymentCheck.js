const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const calDateDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  console.log("differenceInTime", differenceInTime);
  console.log("differenceInDays", differenceInDays);

  return differenceInDays > 0;
};

checkPaymentExpiration = (req, res, next) => {
  //Username
  User.findOne({
    where: {
      id: req.body.userId,
    },
  }).then((user) => {
    if (user) {
      let ispayment = false;
      if ("planStartDate" in user.subscription || user.freeAttempts > 0) {
        if (user.freeAttempts < 1) {
          ispayment = calDateDifference(
            user.subscription.planStartDate,
            user.subscription.planEndDate
          );
          console.log(ispayment);
          if (ispayment) {
            next();
            return;
          } else {
            return res.status(500).send({ message: "Your payment expired!" });
          }
        } else {
          next();
          return;
        }
      } else {
        return res.status(500).send({ message: "Subscribe your payment!" });
      }
    }
  });
};

const paymentCheck = {
  checkPaymentExpiration: checkPaymentExpiration,
};

module.exports = paymentCheck;
