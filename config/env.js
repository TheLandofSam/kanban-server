// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',///changing this changes everything. devel means it is being built. changes to production when done.
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'bananaberry',
	DBPASSWORD: 'yellowishred',
	DBHOST: 'ds149431.mlab.com:49431',
	DBNAME: 'youcankanban',
	SERVERNAME: 'dev-server'
}


// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
}) 


// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env