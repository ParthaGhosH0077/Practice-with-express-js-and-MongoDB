const express = require('express');
const path = require('path');
const usermodel = require('./modela/user'); // Ensure this path is correct
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index"); 
    
});

app.get('/read', async (req, res) => {
   
        let allusers = await usermodel.find();
        res.render("read", { users: allusers }); 
   
});

app.get('/delete/:id', async (req, res) => {
   
    let users = await usermodel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read"); 

});

app.get('/edit/:Userid', async (req, res) => {
   
    let user = await usermodel.findOne({_id: req.params.Userid});
    res.render("edit", { user });

});

app.post('/update/:Userid', async (req, res) => {
    let{ image,name,email} = req.body;
   
    let user = await usermodel.findOneAndUpdate({_id: req.params.Userid} , {image,name,email} ,{new:true});
    res.redirect("/read");

});


app.post('/create', async (req, res) => {
  
        let { name, email, image } = req.body;
        let createuser = await usermodel.create({
             name, 
             email, 
             image
             });
        res.redirect("/read");
    
   
});

app.listen(3210, () => {
    console.log("its killing it!");
});
