exports.GetLocationDataByAreaQuery=function (){

		return `
				SELECT 	DISTINCT
					area
				FROM    location
				ORDER BY area; 
		`

}

exports.GetLocationDataByCityQuery=function (){

		return `
				SELECT 	DISTINCT
					city
				FROM    location
				ORDER BY city; 

		`

}

exports.GetLocationDataByCountryQuery=function (){

		return `
				SELECT 	DISTINCT
					country
				FROM    location
				ORDER BY country; 

		`

}

exports.GetDepartmentDataQuery=function (){

		return `
				SELECT DISTINCT 
					name as department
				FROM  department
				ORDER BY name;
		`

}

exports.GetClientDataQuery=function (){

		return `

				SELECT DISTINCT 
					name as client
				FROM  client
	WHERE status='A'
	ORDER BY name;
					`

}

exports.GetPrimarySkillDataQuery=function (){

		return `

				SELECT DISTINCT 
					name as primary_skill
				FROM  primary_skill
				ORDER BY name;
					`

}


exports.GetSecondarySkillDataQuery=function (){

		return `

				SELECT DISTINCT 
					name as secondary_skill
				FROM  secondary_skill
				ORDER BY name;
					`

}


exports.GetDomainDataQuery=function (){

		return `

				SELECT DISTINCT 
					name as domain
				FROM  domain_skill
				ORDER BY name;					
				`

}

exports.GetRmgProjectDataQuery=function (){

	return `

			SELECT DISTINCT 
				name as project
			FROM  project
			ORDER BY name;					
			`

}


//////////////   USER DROPDOWN STARTS FORM HERE  ///////////////////////////////




exports.ProjectManagerNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='delivery' 
			ORDER BY u.name;

	`

}

exports.AccountOwnerNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='delivery' 
			ORDER BY u.name;

	`

}

exports.DeliveryOwnerNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='delivery'
			ORDER BY u.name;
	`

}

exports.FinanceOwnerNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='finance' 
			ORDER BY u.name;

	`

}

exports.RMGNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='rm' 
			ORDER BY u.name;
	`

}

exports.HRNameDataQuery=function (id){

	return `
			SELECT DISTINCT u.name 
			FROM   public.user u, role r
			WHERE  u.role_id=r.id
			AND u.status='A'
			AND r.status = 'A'
			AND    r.name='hr' 
			ORDER BY u.name ;

	`

}


/////////////////////////////////   PROJECT PER MANAGER   /////////////////////////////////


exports.ProjectPerManagerQuery=function (id){

	return `
			SELECT DISTINCT p.name as project,p.code as project_code
			FROM   project p,
				public.user u,
				role r
			WHERE p.manager = u.id
			AND   u.role_id =  r.id
			AND   r.name = 'delivery'
			AND u.id = ${id}
	`
}

