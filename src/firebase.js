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
	fetchDB: function(obj, data) {
		var ref = app.database().ref('db')
		ref.once('value', function(snapshot) {
			let db = snapshot.val()
			data[obj] = db[obj]
		}, function (errorObject) {
			console.log('The read failed: ' + errorObject.code)
		})
	},
	removeKey: function(db, key) {
		app.database().ref('db').child(key).remove()
	},
	returnKeyInformation: function(db, key, data, callback) {
		var ref = app.database().ref('db/' + db)
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
		return app.database().ref('db').push().key
	},
	push: function(setup, key, data) {
		var updates = {}
		updates['/' + setup.db + '/' + setup.key] = setup.data
		if (setup.clone) {
			app.database().ref('db').child(setup.clone.db).push(setup.clone.data)
		}
		return app.database().ref('db').update(updates, function(error) {
			if (error) {
				data[key] = 'saving...with error'
			} else {
				data[key] = 'saving...with success'
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
