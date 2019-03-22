# Editor CMS

CMS App was configured to make operations to some another site (eg: mounted blog), in it one can: 

- edit `.md` and `.yaml` files
- upload images and video files
- create new posts
- set publish date for posts (if you will set date in future, the post won't publish until that time)
    
## CMS Deploy
<!-- TODO -->
1. Assuming you have finished [this tutorial](/source_config_n_mount/) 

1. Create folder for Blog CMS Editor App, download Blog CMS App to this folder, change `cms` with your own name:
    ```sh
    $ mkdir cms
    $ cd cms
    $ mbakeX -c
    ```
1. Create an account (if you haven't one already) and database in [Firebase](https://console.firebase.google.com). Navigate to the Service Accounts tab in your database project's settings page. Click the `Generate New Private Key` button at the bottom of the Firebase Admin SDK section of the Service Accounts tab. After you click the button, a JSON file containing your service account's credentials will be downloaded. Next go to the `Authentication` tab, click `Sign-in method` and set `Email/Password` method to `Enabled`.

1. To CMS App folder add the following files next to example files accordingly:

    - Rename downloaded in the previous step Firebase Admin SDK file to: `serviceAccountKey.json` and place it in folder: `/cms/CMS`. 

    - Copy file `.env.example ` to the same folder, rename it to `.env`. In the Firebase console go to `Project Overview` tab, on the next screen click `</>` icon, a popup `Add Firebase to your web app` will appear. Fill the `.env` file fields values with according values of your project.

    - Copy file `config.js.example` in the folder `/cms/CMS/wwwAdmin` rename it to `config.js` and change ip url to your server or local ip address.

    - Copy file `config.js.example` in the folder `/cms/CMS/www`, rename it to `config.js` and change ip url to your server or local ip address and change the values of fields `apiKey, authDomain, projectId` accordingly to the values of your project that you've already retrieved in one of the previous steps.

    - Copy file `config.yaml.example` in the folder `/cms/CMS`, rename it to `config.yaml`, it is necessarily change `appMount` field value to the path to your mounted folder with site from CDN. You can also change ports or admin password (optional).


1. in folder `/cms/CMS` run command to install node_modules, compile them and run node:
    ```sh
    $ yarn
    $ tsc

    $ node index.js 
    // or: 
    // $ nohup node index.js & 
    // if you want node running after the terminal will be closed
    ```
1. In folders `/cms/CMS/www` and `/cms/CMS/wwwAdmin` accordingly run command to compile pug:
    ```sh
    $ mbake .
    ```
1. in folders `/cms/CMS/www/assets` and `/cms/CMS/wwwAdmin/assets` accordingly run command to compile sass:
    ```sh
    $ mbake -s .
    ```
1. Open in browser Blog Admin App:
    ```sh
    [your-ip]:8080
    // eg: http://0.0.0.0:8080
    ```

    Open in browser Blog Editors App:

    ```
    [your-ip]:9080
    // eg: http://0.0.0.0:9080
    ```
1. Login to Admin App is: 'admin', password is: '123456' (Note: if you have changed the password in config.yaml, then use your new password)

1. Create a new user in Admin App, reset password via received email and then login in Editors app with this user's credentials.

1. In Editors App you can: 

    - edit `.md` and `.yaml` files
    - upload images and video files
    - create new posts
    - set publish date for posts (if you will set date in future, the post won't publish until that time)
    
    All this operations will be applied to your mounted site.

    *Note:* that changes will apply after your configured CDN cache will expire.

## CMS App Structure

CMS App consists of two parts: Admin App and Editors App.

### Admin App

1. In Admin App there is a functionality of CRUD users. It has front end in the `wwwAdmin` folder and backend written on Node Express.

1. Login to admin App implemented throught basic auth. On login the values from login form fields are compared with the login and password on backend login is hardcoded and password is stored in `config.yaml` and if they are matched, the login occures.
Inspect `/cms/wwwAdmin/assets/js/login.js`, here we get the login input values and store them in sessionStorage:

        let formLogin = $("#login-form input[name='login']").val();
        let formPassw = $("#login-form input[name='password']").val();

        window.sessionStorage.setItem('username', formLogin);
        window.sessionStorage.setItem('password', formPassw);

    then inspect  `/cms/wwwAdmin/assets/js/general.js`:

        /**
        * basic auth 
        * @param username user name
        * @param password user password
        */
        constructor(username, password) {
            this.service = axios.create({
                baseURL: window.api[0],
                auth: {
                    username: username,
                    password: password
                },
                responseType: 'json'
            });

            this.service.interceptors.response.use(function(response) {
                // Do something with response data
                console.info('response', response);
                return response;
            }, function(error) {
                // With response error redirect
                if (typeof error.response === 'undefined') {
                    window.sessionStorage.setItem('errorMessage', 'Network Error');
                    window.location = '/';
                } else if (401 === error.response.status) {
                    window.sessionStorage.setItem('errorMessage', 'Access denied');
                    window.location = '/';
                }
                return Promise.reject(error);
            });
        }

    here we check if values are not empty and then go to `/cms/wwwAdmin/assets/js/service.js` where values are passed to node for check.
    Here in every request in header axios send username and password and in some request being called we get the response if basic auth is successful or if some error occurs and it is being processed in this function:

            this.service.interceptors.response.use(function(response) {
                // Do something with response data
                console.info('response', response);
                return response;
            }, function(error) {
                // With response error redirect
                if (typeof error.response === 'undefined') {
                    window.sessionStorage.setItem('errorMessage', 'Network Error');
                    window.location = '/';
                } else if (401 === error.response.status) {
                    window.sessionStorage.setItem('errorMessage', 'Access denied');
                    window.location = '/';
                }
                return Promise.reject(error);
            });

    and then on node in `admin.ts` file `basicAuth()` checks if login and password are matched:

        adminApp.use(basicAuth({
            challenge: true,
            users: { 'admin': config.secret, 'me': 'openforme' }
        }));

1. If you will inspect `CMS/wwwAdmin/admin/crudEditors/index.pug` you'll see that there is an instance of `Editors` class:

        let editors = new Editors(getApiService());

    which is declared in `CMS/wwwAdmin/assets/js/general.js` file.
    From this file we address to the `CMS/wwwAdmin/assets/js/services.js` file in which there are api requests to the node backend.

1. For example, inspect once again `CMS/wwwAdmin/admin/crudEditors/index.pug`, here you can see the code that adds a new user:

        /*
        * add editor
        */
        $(document).on('click', '#add-editor', function (e) {
            e.preventDefault();
            $(this).attr("disabled", "disabled");
            $('.loader').addClass('active');
            editors
                .save()
                .then(() => { 
                    $(this).removeAttr("disabled");
                    $('.loader').removeClass('active');
                });
        });

    `editors.save()` promise addresses `save()` method in class `Editors` in `CMS/wwwAdmin/assets/js/general.js` file:

        // add & edit user
        save(id) {
            let password = $("#editor-form input[name='password']").val();
            let email = $("#editor-form input[name='email']").val();
            let name = $("#editor-form input[name='name']").val();
            if (id) { // edit user
                .
                .
                .
            } else { // add user
                return this.apiService.addEditor(name, email, password)
                    .then((documentRef) => {
                        .
                        .
                        .
                    })
                    .catch(err => {
                        .
                        .
                        .
                    });
            }
        }

    here this line `this.apiService.addEditor(name, email, password)` addresses to the `addEditor()` method in `CMS/wwwAdmin/assets/js/services.js`:

        addEditor(name, email, password) {
            return this.service.post('/auth/editors', {
                name: name,
                email: email,
                password: password
            });
        }

    this method call an api request to node.

1. Inspect `/lib/admin.ts` file, here you can see the endpoint of adding a user to Firestore database:

        // add user
        adminApp.post("/editors", (req, res) => {
            let email = req.body.email;
            let name = req.body.name;
            let password = req.body.password;
            if (typeof email !== 'undefined' &&
                typeof name !== 'undefined' &&
                typeof password !== 'undefined'
            ) {
                let editorRef = dbAdminFs.collection('editors').doc(); // get editor id reference
                firebaseAdmin
                .get()
                .auth()
                .createUser({ // create user
                    email: email,
                    displayName: name,
                    password: password,
                })
                .then(userRecord => { // add user to editors collection
                    return dbAdminFs.collection('editors')
                        .doc(userRecord.uid)
                        .set({
                            editor_id: editorRef
                        })
                        .then(_ => {
                            return userRecord;
                        });
                })
                .then(userRecord => {
                    let firebaseAuth = firebase.get().auth();
                    console.info('sending reset and verification email to user');
                    firebaseAuth.sendPasswordResetEmail(email)
                        .then(() => {
                            console.info('email has been sent to user');
                        })
                        .catch(function (error) {
                            console.info('email hasn\'t been sent to user', error);
                        });
                    return userRecord;
                })
                .then(function (userRecord) { // send response to client
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.info("Successfully created new user:", userRecord.uid);
                    let response = {
                        id: userRecord.uid
                    }
                    res.json(response);
                })
                .catch(function (error) {
                    console.info("Error creating new user:", error);
                    res.status(400);
                    res.send({ error: error.message });
                });
            } else {
                res.status(400);
                res.send({ error: 'parameters missing' });
            }
        });

    method `createUser()` creates a new user in database with email and password, then a new entry with user is created in `editors` collection and then the method `firebaseAuth.sendPasswordResetEmail()` sends an email with reset password to the new created user. 

1. The other CRUD operations works by the same/similar analogy. 


### Editors App

In the Editors App there is functionality for editing `.md` and `.yaml` files, creating new post, uploading files and seting a post date, which converts from human readable format to epoch format and is written to `dat.yaml`.

1. If you will inspect `CMS/www/editors/edit/index.pug` you'll see that there is an instance of `Posts()` class:

        let posts = new Posts();

    which is declared in `CMS/www/assets/js/general.js` file.
    From this file we address to the `CMS/www/assets/js/services.js` file in which there are api requests to the node backend.

1. For example, inspect once again `CMS/www/editors/edit/index.pug` file, here you can see the code of saving the `.md`, `.yaml` files:

        /*
        * save .md
        */
        $(document).on('click', '.save', function(e) {
            e.preventDefault();

            let postId = $('.blog-item.active').find('li.active').text();
            let pathPrefix = $('.blog-item.active').find('span').text();
            let md = myCodeMirror.getValue();
            $(this).attr("disabled", "disabled");
            $('.loader').addClass('active');

            posts
                .saveMd(postId, md, pathPrefix)
                .then(() => {

                    $(this).removeAttr("disabled");
                    $('.loader').removeClass('active');
                    $('.notification').removeClass('d-hide').find('.text').text('The content was successfully updated');

                    setTimeout(function() {
                        $('.notification').addClass('d-hide').find('.text').text('');
                    }, 4000);

                });

        });

    from this file `posts.saveMd(postId, md, pathPrefix)` method calls the `saveMd()` method in `CMS/www/assets/js/general.js` file:

        saveMd(id, md, pathPrefix) {
            return apiService.savePostMd(id, md, pathPrefix);
        }

    and here `savePostMd()` method calls the `savePostMd` api method in `CMS/www/assets/js/services.js` file:

        /**
        * save .md and mbake after edit
        * @param id .md file name, eg: '/title.md'
        * @param md .md file content, eg: '###### Lorem ipsum dd dolor sit {.title}'
        * @param pathPrefix path to .md file, eg: 'blog/post-4'
        */
        savePostMd(id, md, pathPrefix) {
            return this.service.put('/editors/post', md, {
                headers: { 'Content-Type': 'text/plain' },
                params: {
                    post_id: id,
                    pathPrefix: pathPrefix
                }
            });
        }

    the `savePostMd()` method call an api request to node. 

1. Now inspect `/lib/editor.ts`, here is the endpoint for saving `.md` and `.yaml` files:

        // update .md file
        appE.put("/post", (req, res) => {
            let post_id = req.query.post_id;
            let pathPrefix = req.query.pathPrefix;
            if (typeof post_id !== 'undefined') {
                let md = '/' + pathPrefix + post_id;
                let fileOps = new FileOps(config.appMount);
                fileOps.write(md, req.body);
                let runMbake = new MBake();
                let postsFolder = post_id.substr(0, post_id.indexOf('/')); 
                runMbake.itemizeNBake(config.appMount + '/' + postsFolder);
                runMbake.comps(config.appMount);
                
                res.send('OK');
            } else {
                res.status(400);
                res.send({ error: 'no post_id' });
            }
        });

    you can see that a new instance of `FileOps()` class is created it is imported from node modules mbake library, and the method `fileOps.write()` saves the file with the new changes. Then we create a new instance of class `MBake` which is also imported from node modules and then mbake is triggered to compile the changes to html with the methods `runMbake.itemizeNBake()` and `runMbake.comps()`.

1. The other functionality works by the same/similar analogy. 


In the [next tutorial ](/electron/) you will learn about Electron SPA.
NEXT: Go to [Electron SPA](/electron/).