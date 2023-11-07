require("dotenv").config()

const express = require("express")
var router = express.Router();


const stripe = require("stripe")("sk_test_51O4G68Ee23otpQpYRzoQwl5mUUnvZV92pAZRFtnC8dm7pxBpw29tHyhBziSz7nAPoErwiiyVtxIHhMW5wtWhiTY900oTOygGLH")

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "CSE class" }],
  [2, { priceInCents: 20000, name: "INFO class" }],
])


router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router;