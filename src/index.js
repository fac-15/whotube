const app = require('./app.js');

app.listen(app.get('port'), () => {
    console.log('App is working on port ', app.get('port'));
});
