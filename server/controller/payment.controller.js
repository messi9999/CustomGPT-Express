const db = require("../models");
const User = db.user;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const moment = require("moment")

const stripeSession = (plan) => {
  return stripe.checkout.sessions
    .create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/profile/payment/success`,
      cancel_url: `${process.env.DOMAIN}/profile/payment/cancel`,
    })
    .then((session) => {
      return session;
    })
    .catch((e) => {
      return e;
    });
};

exports.createSubscriptionCheckoutSession = (req, res) => {
  const { plan, customerId } = req.body;
  let planId = process.env.BASIC_PRICE_ID;

  stripeSession(planId)
    .then((session) => {
      console.log(session);
      // Do something with the session
      subscription = {
        subscription: {
          sessionId: session.id,
        },
      };
      console.log(subscription);
      User.update(subscription, {
        where: { id: customerId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              session,
            });
          } else {
            res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          console.log("2");
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
          });
        });
      //   User.res.send(session);
    })
    .catch((error) => {
      console.log("3");
      res.status(500).send(error);
    });
};

exports.paymentSuccess = async (req, res) => {
  const { userId, sessionId } = req.body;

  stripe.checkout.sessions
    .retrieve(sessionId)
    .then((session) => {
      if (session.payment_status === "paid") {
        const subscriptionId = session.subscription;
        stripe.subscriptions
          .retrieve(subscriptionId)
          .then((subscription) => {
            const planId = subscription.plan.id;
            const planType = "";
            if (subscription.plan.amount === process.env.BASIC_AMOUNT) {
              planType = "basic";
            }
            const startDate = moment
              .unix(subscription.current_period_start)
              .format("YYYY-MM-DD");
            const endDate = moment
              .unix(subscription.current_period_end)
              .format("YYYY-MM-DD");
            const durationInSeconds =
              subscription.current_period_end -
              subscription.current_period_start;
            const durationInDays = moment
              .duration(durationInSeconds, "seconds")
              .asDays();

            User.update(
              {
                subscription: {
                  sessionId: null,
                  planId: planId,
                  planType: planType,
                  planStartDate: startDate,
                  planEndDate: endDate,
                  planDuration: durationInDays,
                },
              },
              {
                where: { id: userId },
              }
            )
              .then((num) => {
                if (num == 1) {
                  res.status(200).send({ message: "Payment Successful" });
                } else {
                  res.status(500).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                  });
                }
              })
              .catch((error) => {
                res.status(500).send(error);
              });
          })
          .catch((error) => {
            console.error("Error retrieving subscription", error);
            res.status(500).send(error);
          });
        // res.send({ message: "Payment Successful" });
      } else {
        res.status(500).send({ message: "Payment failed" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
