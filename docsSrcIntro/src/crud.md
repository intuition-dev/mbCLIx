
# Generate a serverless CRUD webapp.

CRUD stands for create-read-update-delete. 

In this tutorial, you will learn how to create your own Firestore database.

Firestore database is part of the Google Firestore offering. Similar to AWS Cognito, Firestore includes pure client-side user authentication. Firestore can be used from the browser via JavaScript; no custom serverside code is needed. This is key to be able to develop faster.

Firestore is free for up to 50,000 reads and 20,000 writes per day. See more details [here](https://firebase.google.com/docs/Firestore/quotas). At the time of writing, Firestore is a beta version, but Gmail also was beta for a very long time, without major issues. Firestore has a clean and mature API that is much improved from a previous version of Firebase. 

## Steps

1. Using the DO, create new linux machine, or use existing one as you used in [Setup S3 as your HTTP server and mount it](/s3_n_webdrive_mount/). Extract the CRUD sample project with the command:

		$ mbake -v

	and copy the project files (inside of `/crud`) into the project root (eg: `/www` folder). Compile the project:

		$ mbake -c .
		// from assets
		$ mbakeX -s .
		$ mbakeX -n .

	In a browser, open the Endpoint-URL. You should see the CRUD App served by Caddy & webDav server OR if you're running locally on your PC use the mbake watcher to run the app (eg: 0.0.0.0:8080):

		$ mbakeX -w .

2. Navigate to the 'ViewModel CRUD' menu item. Inspect the fragment `/screen/example1/index.pug`. Note the `table#table1` and `table#table2` tags, an empty tables with ID `#table1` and `#table2` which fills with data using tabulator.js library.
Next is how table is getting filled with data. `getViewList('table1', 'table2')` function is called from the bind file `Example1Bind.js`:

		getViewList(tableID, tableID2){
			let _this = this
			let columns1 = [ //Define Table Columns
				{title:"Col1", field:"col1", align:"left", width:150},
				{title:"Col2", field:"col2", align:"left", width:'70%'},
			];
			let columns2 = [ //Define Table Columns
				{title:"Col45", field:"col45", align:"left", width:'70%'},
				{title:"Col55", field:"col55", align:"left", width:'70%'},
			];
			Promise.all([this.viewModel.read()])
				.then(function(){
					let data1 = _this.viewModel.getViewList(tableID)
					let data2 = _this.viewModel.getViewList(tableID2)
					_this.setTable(tableID, columns1, data1)
					_this.setTable(tableID2, columns2, data2)
				})
		}

then function `this.viewModel.read()` is called from the 'view-model' file `assets/models/Example1ViewModel.js`:

		read(){
			let _this = this
			return Promise.all([this.exampleModel.read()])
				.then(function(data){
					_this._data = [].concat(data[0])
				})
			//maybe other read methods from a diffrent entity
		}

and then `this.exampleModel.read()` function is called from `assets/models/service/Example1Service.js`:

		read(id?:string){
			let _this = this
			console.info('--reading...', Date.now() - _start)

			let ref = db1.collection(this.entityName)

			if(id){
				return db1.collection(this.entityName).doc(id)
				.get()
				.then(function(docSnap) {
					let temp = docSnap.data()
					temp['id'] = docSnap.id
					// Object.assign(_this._dataObj, temp)
					return temp
				})
			.catch(function(error) {
				console.info("Error getting documents: ", error)
			})
			}

			return ref
				.get()
				.then(function(querySnapshot) {
					let rows = []
					querySnapshot.forEach(function(doc) {
					let row = doc.data()
					row['id'] = doc.id
					rows.push(row)
					})
					return rows
				})
			.catch(function(error) {
				console.info("Error getting documents: ", error)
			})
		}//()

it reads the data from the Firestore database and fills the table with the content. This is an example of a 'View-model' pattern.

In View-model pattern each page should have a bind file and a ViewModel file. In bind file, eg `Example1Bind.js`, there is all that сoncerns UI functionallity. In ViewModel file, eg: `assets/models/Example1ViewModel.js` there are the data samples 'real' or 'fake' which are then mapped with the data from the database in file `assets/models/service/Example1Service.js` in which create/read/update/delete functionallity directly occurs.

4. Inspect `/screen/auth/modA.pug` the form that used here is styled with [gridforms](http://kumailht.com/gridforms/). If you will open `screen/auth/modA.pug` you can see this form. Here is the example of Firebase authentication. You can try to create user, reset password, sign-in and log out in browser on `screen/auth` page. 
The Firestore function to login with email and password:

		auth.signInWithEmailAndPassword(email,pswd)
            .then(function(user) {
               console.info(user)
               alert('Signed in successfully') //replace with pretty popup
            })
            .catch(function(error){
               console.info(error)
               alert(error) // replace with pretty popup
            })

the function to sign up a new user with email and password:

		auth.createUserWithEmailAndPassword(email,pswd)
            .then(function(user) {
               bAuth.sendEmailVerification()
            })
            .catch(function(error){
               console.info(error) //show error in .message
               alert(error) // replace with pretty popup
            })

the function that will sent reset password link to the user email:

		auth.sendPasswordResetEmail(email)

and the function to log out:

		auth.signOut()

all of them triggers on appropriate buttons click.


3. To learn Firebase, you will now remap the Firestore connection to your own Firestore. Create a Google account if you don't already have one. Log into <https://console.firebase.google.com>. Create a project named `test-crud`. Under the left menu 'Develop - Database', create a Firestore app in test mode.
On the Project Overview, click the `</>` button near 'Add an app to get started' to open a popup. In your mapped project `/assets/comps/preRW-comp.pug`, overwrite the values for apiKey, authDomain and projectId with the values shown in the Firestore popup and save. Run `'$ mbake -c .'` from the `tags` folder. (`/layout/layout.pug` will use the updated `script(src='/assets/comps/preRW-comp.min.js')`.)

7. We will now secure the database. In the Firestore Console, on the Rules tab in 'Develop - Database', replace:

		allow: read, write;

	with  

		allow read, write: if request.auth.token.email_verified == true;

	Only logged in users who have been verified by email can now read from or write to the database. Since you are currently not logged in, 'Add data' on the 'CRUD' screen should now fail.

8. We will now configure and test a sign-in method. In the Firestore Console, in 'Develop - Authentication', click on 'Set up sign-in method'. Enable Email/Password sign-up and save. In the CRUD App, navigate to the multi-purpose 'Auth' screen (/screen/auth/). Enter your email and a password and click the 'Sign Up' button. The new user should appear in the Firestore Authentication list of Users.

9. Check your email and click on the link you received (The email can be customized on the Firestore Authentication Templates tab). Return to the Auth screen (/screen/auth/) and click the 'Sign In' button. If the login succeeded, 'Add row' on the 'View-Model CRUD' screen should now succeed, and you should see the added data in the Firestore database console.

__Summary:__ You learnt how to create your own Firestore database, insert data and add authentication to the app.
Firestore replaces MongoDB, but also ORM, REST, DevOps, Security, Failover, etc. Instead of learning all of these, now you only need to learn how to use Firestore. That should create a huge savings in your development and operations budget.

__NEXT STEPS:__ You can try out more Template projects (type `$ mbake`). You can also setup a META build server. META has a watcher that triggers 'mbake' when you save a file to a mapped drive. You can become 10X more productive by adopting the Metabase approach. 

Definitely look at:

- <a href='https://github.com/MetaBake/_mBake/tree/master/awesomeReference' target='_blank'>Awesome list of MetaBake resources</a>

- <https://git.mBake.org>.


In the [next tutorial](/model/), we cover a _view-model pattern_.

NEXT: Go to [Simple CRUD example app and ViewModel+Bind](/model/).
