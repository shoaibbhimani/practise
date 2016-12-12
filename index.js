const app = require('express')();
app.get('/', (req, res) => {
    res.send('Welcome');
});
app.get('/user', function(req, res){
    res.send('users');
})
app.listen(3000);
