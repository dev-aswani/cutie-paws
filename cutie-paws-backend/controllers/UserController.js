// This controller module provides functions to handle user-related operations such as checking if an account exists, creating a user (sign up), and authenticating a user (login), by interacting with the specific resources (in this case, the user table) in the database.
module.exports={
  checkIfAccountExists: (email) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT email 
      FROM user 
      WHERE email=?`;
			global.connection.query(query, [email], (err, result) => {
				if(err) return reject(err);
        if(result.length == 0) return reject(new Error("account doesn't exist"));
        return resolve(JSON.parse(JSON.stringify(result[0])));
			});
		});
	},

  post:(user)=>{
    return new Promise((resolve,reject)=>{
      const query=`INSERT INTO USER VALUES(?,?)`
      global.connection.query(query,[user.email,user.hashed_password],(err,result)=>{
        if(err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(user)));
      })

    })
  },
  authenticate:(user)=>{
    return new Promise((resolve,reject)=>{
      const query=`SELECT *
      FROM user
      WHERE user.email=? AND user.hashed_password=?`
      global.connection.query(query,[user.email,user.hashed_password],(err,result)=>{
        if(err) return reject(err);
        if(result.length == 0) return reject(new Error("invalid login credentials"));
        return resolve(JSON.parse(JSON.stringify(result[0])));
      })
    })
  },
  

}