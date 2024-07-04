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
      subscription_data: {
        trial_period_days: 7
      },
      success_url: `${process.env.DOMAIN}/profile/payment/success`,
      cancel_url: `${process.env.DOMAIN}/profile/payment/cancel`,
    })
    .then((session) => {
      return session;
    })
    .catch((e) => {
      console.log(e)
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
          res.status(500).send({
            message: "Error updating subscription with id=" + id,
          });
        });
    })
    .catch((error) => {
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
            const planType = "basic";

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

            const trialEndDate = moment.unix(subscription.trial_end).format("YYYY-MM-DD")

            User.update(
              {
                subscription: {
                  sessionId: null,
                  trialEndDate: trialEndDate,
                  planId: planId,
                  planType: planType,
                  planStartDate: startDate,
                  planEndDate: endDate,
                  planDuration: durationInDays,
                },
                subscriptionid: subscription.id
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
      } else {
        res.status(500).send({ message: "Payment failed" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};



exports.paymentCancel = async (req, res) => {
  const subscriptionId = req.body.subscriptionId
  const userId = req.body.userId
  stripe.subscriptions.cancel(subscriptionId).then((subscription) => {
    User.update(
      {
        subscription: {
          subscription: null
        }
      },
      {
        where: { id: userId },
      }
    ).then((num) => {
      if (num == 1) {
        res.status(200).send({ message: "Payment Canceled." });
      } else {
        res.status(500).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    }).catch((error) => {
      res.status(500).send(error)
    })
  }).catch((error) => {
    res.status(500).send(error)
  })

}


exports.webhook = async (req, res) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      const updated_user = await User.findOne({ subscriptionid: subscription.id });

      if (user) {
        const planId = subscription.plan.id;
        const planType = "basic";
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

        const trialEndDate = moment.unix(subscription.trial_end).format("YYYY-MM-DD")

        User.update(
          {
            subscription: {
              sessionId: null,
              trialEndDate: trialEndDate,
              planId: planId,
              planType: planType,
              planStartDate: startDate,
              planEndDate: endDate,
              planDuration: durationInDays,
            },
          },
          {
            where: { id: updated_user.id },
          }
        )
      }
      break;
    case 'customer.subscription.deleted':
      const deleted_user = await User.findOne({ subscriptionid: subscription.id });
      User.update(
        {
          subscription: null,
          subscriptionid: null
        },
        {
          where: { id: deleted_user.id },
        }
      )
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.status(200).send('Received');
}
