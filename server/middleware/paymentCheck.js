const db = require("../models");
const User = db.user;

const calDateDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays > 0;
};

checkPaymentExpiration = (req, res, next) => {
  if (!req.body.iskajabiuser) {

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
          return res.status(500).send({ message: "You have used your 10 free questions. Subscribe for unlimited questions." });
        }
      }
    });
  } else {
    next();
    return;
  }
  //Username
};

const paymentCheck = {
  checkPaymentExpiration: checkPaymentExpiration,
};

module.exports = paymentCheck;
