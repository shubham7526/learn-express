const express = require('express')
const app = express()
const port = 3001

const bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const usersList = [];
counter = 0;

app.get('/', (req, res) => {
//   res.send('Hello World!')
    res.render("list", {channelName:"shubham tiwari"});
})

  
app.get('/get-users', (req, res) => {
    res.send(usersList)
})
  
app.post('/create-user', (req, res) => {
    counter = counter+1;
    usersList.push({...req.body, userId: counter})
    res.send({status: true, message: "added successfully", userId : counter})
})

app.patch('/update-user/:userId', (req, res) => {
    // let [user] = usersList.filter(i => i.userId == req.params.userId)
    let index = usersList.findIndex(i => i.userId == req.params.userId);
    usersList[index].name = req.body.name;
    // console.log(user)
    // user.name = req.body.name;
    res.send({status: true, message: "deleted successfully", userId : counter})
    res.send(usersList)
})

app.delete('/delete-user', (req, res) => {
    // res.send([{name: "abhijeet", class:12},{name: "shubham", class:12}])
    let index = usersList.findIndex(i => i.userId == req.params.userId);
    let deletedUserList = usersList.splice(index, 1);
    res.send(deletedUserList)
})

app.get('/about', (req, res) => {
    let markup = `<html><head><title>About us</title></head><body>
        <ul>${usersList.map(i=> `<li>${i.name}</li>`).join("")}</ul>
    </body></html>`
    res.send(markup)
})


  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
