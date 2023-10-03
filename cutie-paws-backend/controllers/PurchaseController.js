// This controller module provides functions to handle operations related to live orders, including creating a live order (checkout), reading the live order (viewing chosen services), and updating the live order (adding more items to chosen services) by interacting with the specific resources (in this case, the purchase table) in the database.
module.exports={
    get:(user_email)=>{
        return new Promise((resolve,reject)=>{
            const query=`SELECT title, image_link, description, quantity
            FROM user 
            JOIN purchase ON user.email=purchase.user_email
            JOIN service ON service.title=purchase.service_title
            WHERE user.email = ?;`
            global.connection.query(query,[user_email],(err,result)=>{
                if(err) return reject(err);
                return resolve(JSON.parse(JSON.stringify(result)));
            }) 
        })
    },
    post:(user_email,services)=>{
        return new Promise((resolve, reject) => {
            //const values = services.map(service => [user_email, service.title, service.quantity]);
            const query = `INSERT INTO purchase (user_email, service_title, quantity)
                            VALUES ?
                            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
            
            global.connection.query(query, [services.map(service => [user_email, service.title, service.quantity])], (err, result) => {
                if (err) return reject(err);
                return resolve(services);
            });
        });

    }
}