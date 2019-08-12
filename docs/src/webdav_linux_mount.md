# Mount webDAV on linux

We'll be mounting using `davfs2` — a Linux file system driver that allows to mount a WebDAV resource.

1. Install `davfs2`

		$ cat <<EOF | sudo debconf-set-selections
		davfs2 davfs2/suid_file boolean false
		EOF
		$ sudo apt-get update
		$ sudo apt install -y davfs2

1. Reconfigure `davfs2` to enable to use `davfs` under unprivileged end-users

    	$ sudo dpkg-reconfigure davfs2

1.  Create a directory: 

		$ mkdir ~/.davfs2

    create file:

    	$ vim ~/.davfs2/davfs2.conf

    with contents:

		`secrets /root/.davfs2/secret`

    // press `a` keyboard button to run edit mode --> edit file --> `esc` --> `:w`(for saving) --> `enter` --> `:q` (to quit the file) --> `enter` 

1. Edit `~/.davfs2/secrets` file to add credentials to remote WebDav diectory:

    	$ vim ~/.davfs2/secrets

    Add a line to the end of file in following style:

		http://<WebDav URI>   <username> <password>

    eg: 
		http://0.0.0.0:8080/webdav/www  admin 123123

    Set the permission: 

		$ chmod 600 ~/.davfs2/secrets

1. Make a directory in which you'll mount

    	$ mkdir mount

    Add a line to `/etc/fstab` about the remote WebDav directory

    	$ vim /etc/fstab

		http://<WebDav URI> <mount point> davfs user,noauto,file_mode=600,dir_mode=700 0 1

    eg:
		http://0.0.0.0:8080/webdav/www /root/mount davfs user,noauto,file_mode=600,dir_mode=700 0 1

1. Add your user to the davfs2 group

		// check user:
		$ whoami
		$ sudo vim /etc/group

    Add your username as follows:

		`davfs2:x:134:<username>`

    eg if the command `$ whoami` says the user is `root`:

		`davfs2:x:134:root`

1. That's it. You can use following commands without being a root user to mount/umount

		$ mount <mount point>
		$ umount <mount point>

    eg:

		$ mount /root/mount
		// will ask for username and password: admin 123123
		$ umount /root/mount

In the [next tutorial](/seo/) you will learn about social SEO.

NEXT: Go to [Social SEO](/seo/).
