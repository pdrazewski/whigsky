import Firebase from 'firebase'
const configFire = {
	apiKey: "AIzaSyCAXWFSeQtM_QQARruI2uqGmfWT4y4ViiI",
    authDomain: "e-components.firebaseapp.com",
    databaseURL: "https://e-components.firebaseio.com",
    projectId: "e-components",
    storageBucket: "",
    messagingSenderId: "483660337530"
}
const app = Firebase.initializeApp(configFire)

const helpers = {
	fetchDB: function(obj, data, callback) {
		var ref = app.database().ref('rects')
		ref.once('value', function(snapshot) {
			let db = snapshot.val()
			data[obj] = db
			if (typeof callback === "function") {
				callback()
			}
		}, function (errorObject) {
			data[obj] = 'The read failed: ' + errorObject.code;
			console.log('The read failed: ' + errorObject.code)
		})
	},
	removeKey: function(db, key) {
		app.database().ref('rects').child(key).remove()
	},
	returnKeyInformation: function(db, key, data, callback) {
		var ref = app.database().ref('rects/' + db)
		ref.once('value', function(snapshot) {
			let snap = snapshot.val()
			data[key] = snap[key]
			if (typeof callback === 'function') {
				callback()
			}
		}, function (errorObject) {
			console.log('The read failed: ' + errorObject.code)
		})
	},
	generateKey: function() {
		return app.database().ref('rects').push().key
	},
	push: function(setup, key, data, callback) {
		var updates = {}
		updates['/' + setup.key] = setup.data
		return app.database().ref('rects').update(updates, function(error) {
			if (error) {
				data[key] = error
			} else {
				data[key] = 'Saved successfully'
				if (typeof callback === "function") {
					callback()
				}
			}
		})
	},
	created: function() {
		return Firebase.database.ServerValue.TIMESTAMP
	}
}

module.exports = {
	app,
	Firebase,
	helpers
}
