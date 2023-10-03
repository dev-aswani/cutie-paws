// This controller module provides the necessary functionality to manage a user's shopping cart by retrieving the cart items, adding new items or updating existing ones, and removing items from the cart, by interacting with the specific resources (in this case, the cart table) in the database.

module.exports = {
	
	get: (user_email) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT image_link, title, unit_price, quantity, (quantity * unit_price) AS sum_total
			FROM user
			JOIN cart ON user.email = cart.user_email
			JOIN service ON service.title = cart.service_title
			WHERE user.email =?`;
			;
			global.connection.query(query, [user_email], (err, result) => {
				if (err) return reject(err);
				let grand_total = 0;
				let grand_quantity=0;
				result.map(item => {
					grand_total += item.sum_total
					grand_quantity+=item.quantity;
				})
				return resolve(JSON.parse(JSON.stringify({grand_total, grand_quantity, cart:result})));
			});
		});
	},
	
	post: (user_email, service) => {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO cart (user_email, service_title, quantity) VALUES (?,?,?)
			ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity) ;`;
			global.connection.query(
				query,
				[user_email, service.service_title, service.quantity],
				(err, result) => {
					if (err) return reject(err);
					return resolve(JSON.parse(JSON.stringify({user_email, ...service})));
				}
			);
		});
	},
	
	delete: (user_email, service_title) => {
		return new Promise((resolve, reject) => {
			const query = `DELETE FROM cart 
        WHERE user_email=? AND service_title=?`;
			global.connection.query(
				query,
				[user_email, service_title],
				(err, result) => {
					if (err) return reject(err);
					console.log(result);
					return resolve(JSON.parse(JSON.stringify(result)));
				}
			);
		});
	},
	deleteAll: (user_email) => {
		return new Promise((resolve, reject) => {
			const query = `DELETE FROM cart 
        WHERE user_email=?`;
			global.connection.query(query, [user_email], (err, result) => {
				if (err) return reject(err);
				return resolve(JSON.parse(JSON.stringify(result)));
			});
		});
	},
};
