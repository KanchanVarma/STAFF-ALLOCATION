//For Login
exports.loginQuery=function (user_name){
				return `select u.id as user_id ,u.name as user_name ,u.password as user_password,r.name as role from public.user u inner join 
					public.role r on u.role_id=r.id where u.email='${user_name}';`
				}
exports.loginADQuery=function (user_name){
					return `select u.id as user_id ,u.name as user_name ,r.name as role from public.user u inner join 
						public.role r on u.role_id=r.id where u.email='${user_name}';`
					}