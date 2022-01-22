const mongoose = require('mongoose');
require("dotenv/config")
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')



mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection open")
}
).catch(err => {
    console.log('Error');
    console.log(err);
})

const userInfoSchema = new mongoose.Schema({
    restaurants: { type: Array, required: true },
    phoneNumber: { type: String, required: true }
});

const userInfo = mongoose.model('userInfo', userInfoSchema);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/success', (req, res) => {
    res.send("hello");
})


app.post('/', (req, res) => {
    const selectedRests = req.body.selectedRest;
    const phoneNumb = req.body.phoneNum;
    console.log(selectedRests, phoneNumb);
    const user = { restaurants: selectedRests, phoneNumber: phoneNumb }
    const newUser = new userInfo(user);
    newUser.save();

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



