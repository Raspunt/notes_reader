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
            PRIMARY KEY (id)

        )`

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    }

    CreateDatabase(con){

        let sql = `create database if not exists  musicDb ;`

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("database created");
        });


    }



    Insert(con,name){


        let sql = `
        INSERT INTO notes (name)
        VALUES ('${name}');
        `

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("data sended");
        });


    }

    Get_all_notes(con,callback){

        let sql = "SELECT * FROM notes"


        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            return callback(result)
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

// db.Insert(con,"Here Come the Sun",`Here_come_the_sun.pdf`)


// db.find_note_by_name(con,"h")

// db.closeConnection(con)