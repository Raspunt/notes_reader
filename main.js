let express = require('express');
let path = require("path")
let app = express();
let pug = require('pug')
let bodyParser = require('body-parser');
let DbCon = require("./dbCon");

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());


db = new DbCon()
con = db.Connect()


app.get('/', function (req, res) {
    res.sendFile(__dirname+"/views/alphabit.html")
})
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("http://127.0.0.1:"+port)
 })



 app.post("/alphabet_id",(req,res)=>{
    console.log(req.body);

})



app.post("/search_holder",(req,res)=>{
   

   if(req.body["search_holder"]){
      db.find_note_by_name(con,req.body["search_holder"],(result)=>{
         // res.json({
         //    name:result

         // })
         const res_data = Object.values(JSON.parse(JSON.stringify(result)));
         
    

         res.json(res_data)
   });
   }

 

})