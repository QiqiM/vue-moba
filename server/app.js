const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())


require('./router/admin')(app);
require('./plugins/db')(app);

app.listen(3000, () => {
    console.log('App run localhost:3000')
})