//This file exports a function, which is used to initialize the database
const mysql = require("mysql")
module.exports = {
    databaseInit: () => {

        const createDatabaseConnection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        });

        createDatabaseConnection.connect(function(err) {
        if (err) throw err;

        const createDatabase = `CREATE DATABASE IF NOT EXISTS cutie_paws;`;

        createDatabaseConnection.query(createDatabase, function(err, result) {
            if (err) throw err;
            console.log("Database cutie_paws created");
            createDatabaseConnection.end();
        });
        });


        const connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database:process.env.MYSQL_DATABASE
          });
          
          
        global.connection=connection;
        connection.connect(function(err) {
            if (err) throw err;
            const createCustomer=`CREATE TABLE IF NOT EXISTS user (
              email varchar(100) NOT NULL,
              hashed_password char(64) DEFAULT NULL,
              PRIMARY KEY (email));`
            connection.query(createCustomer,(err,result)=>{
              if(err) throw err;
              console.log("User table created");
            }
            )
            const createService=`CREATE TABLE IF NOT EXISTS service (
              title varchar(100) NOT NULL,
              description varchar(500) DEFAULT NULL,
              unit_price int DEFAULT NULL,
              image_link varchar(1000) DEFAULT NULL,
              PRIMARY KEY (title),
              CONSTRAINT service_chk_1 CHECK ((unit_price > 0)));`
            connection.query(createService,(err,result)=>{
              if(err) throw err;
              console.log("Service table created");
            }
            )
            const insertData = `
                INSERT IGNORE INTO service (image_link, title, description, unit_price)
                VALUES
                    ("../images/haircut.png", "Haircut", "Isn't all that shedding getting annoying to clean up after? Send your pets in for a fashionable haircut! Our stylists are up to date on the latest trends and will help get your pet trimmed.", 175),
                    ("../images/bathing.png", "Bathing", "Do your pets tend to get a little dirty when playing around? Bring them in for a refreshing wash! Your pets will be relaxed, smell fresh and be squeaky clean like you've never seen before.", 350),
                    ("../images/styling.png", "Blow Dry & Style", "Ever need your pets to look in tip-top shape for an important event? Look no further, for we have professional stylists who can get your pets all primed and perfect for the special occasion.", 250),
                    ("../images/brushing.png", "Brushing", "Regular brushing is a hassle for the average person, especially when you're busy. Bring your pets in for a good brushing by our staff. We will get all the uncomfortable knots and matting out.", 100),
                    ("../images/spa.png", "Spa", "Pamper your pet with our Royal Spas! It'll leave them feeling calm and soothed, with many skin and fur benefits. Our Salt Baths and Ayurvedic treatments will get them relaxed in no time.", 500),
                    ("../images/photography.png", "Photography", "Capture you and your pet's favorite moments with our amazing photographs that highlight their individuality. Additionally, we're able to provide digital and framed photos for your pets.", 400),
                    ("../images/dayCare.png", "Day Care", "Our fun-filled playing activities and supervised day care will make your pet's day more enjoyable. We also provide trainers and food to keep your pets happy throughout the day.", 1000),
                    ("../images/training.png", "Training", "Discover your pet's full potential with skilled training that fosters obedience and strengthens your bond. Our highly skilled trainers have plenty of experience to guide you and your pet.", 450),
                    ("../images/eventAccessories.png", "Event Accessories", "With our fashionable accessories, you may groom your pet in a variety of styles for special occasions, from summer to winter, we can be sure your pet will fit the part no matter the season.", 275);
                `;
            connection.query(insertData,(err,result)=>{
                if(err) throw err;
                console.log("Services inserted into service table");
                }
                )    
            const createCart=`CREATE TABLE IF NOT EXISTS cart (
              user_email varchar(100) NOT NULL,
              service_title varchar(100) NOT NULL,
              quantity int DEFAULT NULL,
              PRIMARY KEY (user_email,service_title),
              KEY service_title (service_title),
              CONSTRAINT cart_ibfk_1 FOREIGN KEY (user_email) REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT cart_ibfk_2 FOREIGN KEY (service_title) REFERENCES service (title) ON DELETE CASCADE ON UPDATE CASCADE);`
            connection.query(createCart,(err,result)=>{
              if(err) throw err;
              console.log("Cart table created");
            }
            )
            const createPurchase=`CREATE TABLE IF NOT EXISTS purchase (
              user_email varchar(100) NOT NULL,
              service_title varchar(100) NOT NULL,
              quantity int DEFAULT NULL,
              PRIMARY KEY (user_email,service_title),
              KEY service_title (service_title),
              CONSTRAINT purchase_ibfk_1 FOREIGN KEY (user_email) REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT purchase_ibfk_2 FOREIGN KEY (service_title) REFERENCES service (title) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT purchase_chk_1 CHECK ((quantity > 0)));`
            connection.query(createPurchase,(err,result)=>{
              if(err) throw err;
              console.log("Purchase table created");
            }
            )
          
          
          
          });
          
    }
}