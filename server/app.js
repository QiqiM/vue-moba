const express = require('express')
const app = express()

app.set('secret', 'uiasdahsdjasd-salt-value');

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./router/admin')(app);
require('./router/web')(app);

app.listen(3000, () => {
    console.log('App run localhost:3000')
})

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});