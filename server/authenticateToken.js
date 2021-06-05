const admin = require("firebase-admin");
const serviceAccount = require("./wisejoServiceAccount.json");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_AUTH_DOMAIN,
});

async function decodeIDToken(req, res, next) {
	const header = req.headers?.authorization;

	if (
		header !== "Bearer null" &&
		req.headers?.authorization?.startsWith("Bearer ")
	) {
		console.log("Authenticated!!!========");
		const idToken = req.headers.authorization.split("Bearer ")[1];
		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req["currentUser"] = decodedToken;
		} catch (err) {
			console.log(err);
		}
	} else {
		console.log("did not authenticate");
	}
	next();
}
module.exports = decodeIDToken;
