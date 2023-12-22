const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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
      success_url: "",
      cancel_url: "",
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
      // Do something with the session
      subscription = {
        subscription: {
          sessionId: session.id,
        },
      };
      User.update(subscription, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              session,
            });
          } else {
            res.send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
          });
        });
      //   User.res.send(session);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.paymentSuccess = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;
      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
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
          subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment
          .duration(durationInSeconds, "seconds")
          .asDays();

        const num = await User.update({
          subscription: {
            sessionId: null,
            planId: planId,
            planType: planType,
            planStartDate: startDate,
            planEndDate: endDate,
            planDuration: durationInDays,
          },
        });
      } catch (error) {
        console.error("Error retrieving subscription", error);
      }
      res.send({ message: "Payment Successful" });
    } else {
      res.status(500).send({ message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
