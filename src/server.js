const express = require("express");
const app     = express();
const exphbs  = require('express-handlebars')
const path    = require('path')

app.use(express.static(path.join(__dirname,'public')))
app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');
app.use(
  express.json({
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

const payment = require('./routes/payment')
app.use('/payment', payment)

app.listen(21068, () => console.log(`Node server listening on port ${21068}!`));
