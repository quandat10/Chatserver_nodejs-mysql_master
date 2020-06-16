
////***** Created by Dattran *****////

var express = require("express");
const app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'11111111',
  database:'dattran',
});

//connect to database
con.connect(function(err){
  if(err) throw err;
  console.log('connected');

});


app.use(express.json());





app.get("/api/login",(req,res)=>{
  res.send("success");
})

//Post method
app.post('/api/login',(req,response)=>{

  var User = {
    username:req.body.username,
    password:req.body.password
  };

  console.log(`${User.username} va ${User.password}`);

  con.query(`SELECT * FROM dattran.user WHERE username = '${User.username}' AND password = '${User.password}'`,function(err, res){
    if(err) throw err;
    console.log(res);
    if(res.length === 0) return response.status(404).send("Not found data");
    response.status(200).send(res);

  })

})


app.get("/api/user",(req,response)=>{
  con.query(`SELECT * FROM dattran.user`, function(err, res){
    if(err) throw err;
    console.log(res);
    if(res.length === 0) return response.status(404).send("Not found data");
    var result =
      {
        status:"ok",
        data:res
      }
    
    response.status(200).send(result);
  })
})

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`listening on port ${port}`));
