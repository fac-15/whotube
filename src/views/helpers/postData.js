
const apps = require('../../app.js');
//this gets the input from the form
let search;
const postData = () => {
    
    apps.post('/', (req, res) => {
    //     // 'search' needs to match the 'name' attribute of the input tag in the form
        search = req.body.search;
        console.log('your search', search);
        res.redirect(`/results/${search}`);
    });

    
}



module.exports = search;

