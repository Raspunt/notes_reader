let  mysql = require('mysql');

let DbCon = class {



    Connect(){

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "qaqsqdqe",
            database:"musicDb",
        });


        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected to mysql !");
        });
    
        return con

    }


    CreateTable(con){

        let sql = `CREATE TABLE IF NOT EXISTS  notes (
            id MEDIUMINT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            file_link VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)

        )`

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });


    }


    Insert(con,name,file_link){


        let sql = `
        INSERT INTO notes (name, file_link)
        VALUES ('${name}','${file_link}');
        `

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("data sended");
        });


    }

    Get_all_notes(con){

        let sql = "SELECT * FROM notes"


        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

    }


    find_note_by_name(con,name, callback){

        let sql = ` select * from notes where name like '%${name}%';`

        con.query(sql, function (err, result, fields) {
                if (err) throw err;
                return callback(result)
        });

        


    }

    closeConnection(con){
        con.end()
    }

}



module.exports = DbCon;


// db = new DbCon()


// con = db.Connect()

// db.CreateTable(con)
// // db.Insert(con,"Here Come the Sun",`kekw.pwf`)

// db.find_note_by_name(con,"h")

// db.closeConnection(con)