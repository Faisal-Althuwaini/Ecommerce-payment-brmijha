
// Require the necessary modules

const stripe = require('stripe')('sk_test_51NWfzfGRR3yX6nkUWWIfQyT0rlCIQHU8pqdMKdr6REnVZnIw13hY1tdqjnUAybK1L6hWwayKZaLmSNpOOePjWsBz00heToQOqu');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Parse JSON bodies (as sent by the client)
app.use(express.json())

app.use(express.static('docs'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));// we need to register a parser, to parse the incoming request body !

app.get("/", (req,res) => {
  res.sendFile("index.html", { root: "docs"})
})

app.get("/success.html", (req,res) => {
  res.sendFile("success.html", { root: "docs"})
})

//  domain
const YOUR_DOMAIN = 'https://faisal-althuwaini.github.io/';

// Route to handle payment
app.post('https://faisal-althuwaini.github.io/Ecommerce-payment-brmijha/create-checkout-session', async (req, res) => {


  let priceId = req.body.priceId


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {

        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});





app.listen(3000, () => console.log('Running on port 3000'));