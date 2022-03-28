let express = require('express');
let path = require("path")
let app = express();
let bodyParser = require('body-parser');
let DbCon = require("./dbCon");
let fileupload = require("express-fileupload");

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'Files')));

app.use(bodyParser.json());
app.use(fileupload()); 


db = new DbCon()
con = db.Connect()
db.CreateTable(con)
db.CreateDatabase(con)


app.get('/', function (req, res) {
    res.sendFile(__dirname+"/views/alphabit.html")
})

app.post("/",(req,res)=>{
   
   if (req.files){
      let upload_file = req.files.upload_file;
      upload_file.mv('./Files/'+upload_file.name)
      db.Insert(con,upload_file.name)
      console.log("Все");
      
   }


   res.sendFile(__dirname+"/views/alphabit.html")
})


 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("http://127.0.0.1:"+port)
 })



app.post("/alphabet_id",(req,res)=>{
   
   if(req.body["alphabet_id"]){
      db.find_note_by_name(con,req.body["alphabet_id"],(result)=>{

         const res_data = Object.values(JSON.parse(JSON.stringify(result)));
         
    

         res.json(res_data)
   });
}
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