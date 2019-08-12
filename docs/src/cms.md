# Editor CMS

CMS App was configured to make operations to some another site (eg: mounted CMS), in it one can: 

- edit `.md` and `.yaml` files
- upload images and video files
- create new posts
- set publish date for posts (if you will set date in future, the post won't publish until that time)
    
## CMS Deploy
<!-- TODO -->
1. Assuming you have finished [this tutorial](/source_config_n_mount/) 

1. Create folder for CMS CMS Editor App, download CMS CMS App to this folder, change `cms` with your own name:
    ```sh
    $ mkdir cms
    $ cd cms
    $ mbakeX -c
    ```
1. Create an account (if you haven't one already) and database in [FireStore](http://console.firebase.google.com). Navigate to the Service Accounts tab in your database project's settings page. Click the `Generate New Private Key` button at the bottom of the FireStore Admin SDK section of the Service Accounts tab. After you click the button, a JSON file containing your service account's credentials will be downloaded. Next go to the `Authentication` tab, click `Sign-in method` and set `Email/Password` method to `Enabled`.

1. To CMS App folder add the following files next to example files accordingly:

    - Rename downloaded in the previous step FireStore Admin SDK file to: `serviceAccountKey.json` and place it in folder: `/cms/CMS`. 

    - Copy file `.env.example ` to the same folder, rename it to `.env`. In the FireStore console go to `Project Overview` tab, on the next screen click `</>` icon, a popup `Add FireStore to your web app` will appear. Fill the `.env` file fields values with according values of your project.

    - Copy file `config.js.example` in the folder `/cms/CMS/wwwAdmin` rename it to `config.js` and change ip url to your server or local ip address.

    - Copy file `config.js.example` in the folder `/cms/CMS/www`, rename it to `config.js` and change ip url to your server or local ip address and change the values of fields `apiKey, authDomain, projectId` accordingly to the values of your project that you've already retrieved in one of the previous steps.

    - Copy file `config.yaml.example` in the folder `/cms/CMS`, rename it to `config.yaml`, it is necessarily change `appMount` field value to the path to your mounted folder with site from CDN. You can also change ports or admin password (optional).


1. in folder `/cms/CMS` run command to install node_modules, compile them and run node:
    ```sh
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
1. Open in browser CMS Admin App:
    ```sh
    [your-ip]:8080
    // eg: http://0.0.0.0:8080
    ```

    Open in browser CMS Editors App:

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

1. In Admin App there is a functionality of CRUD end-users. It has front end in the `wwwAdmin` folder and backend written on Node Express.



### Editors App

In the Editors App there is functionality for editing `.md` and `.yaml` files, creating new post, uploading files and seting a post date, which converts from human readable format to epoch format and is written to `dat.yaml`.

1. If you will inspect `CMS/www/edit/edit/index.pug` you'll see that there is an instance of `Posts()` class:

        let posts = new Posts();

    which is declared in `CMS/www/assets/js/general.js` file.
    From this file we address to the `CMS/www/assets/js/services.js` file in which there are api requests to the node backend.


In the [next tutorial ](/electron/) you will learn about Electron SPA.
NEXT: Go to [Electron SPA](/electron/).