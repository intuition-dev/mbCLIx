# Electron SPA

Electron is built on Chromium and the navigation model is pretty much the exact same as any other web browser.
Electron needs ROO T, as / in electron means root of drive; not root of http server. There is no http server. Not having to go to a remote web server means loading pages in Electron should be pretty quick.
Electron has node and it lets you start Chrome. So you can build a Windows app, or an OSX app.
Electron apps are normally SPA. Our example also in one page.

1. Run the command to extract an Electron SPA App example:

        $ mbakeX -e

1. From the `/elect` folder install node modules:

        $ npm update

1. Compile `.pug` in `/elect/app/www` folder and `.scss/.sass` in `/elect/app/www/assets`, eg:

        $ mbake .
        $ mbake -s .

1. Run the app from the `elect/app` folder with the command:

        $ npm start

    The application should show up.

1. Inspect `/elect/app/www/assets/router/spa-router.js`, here you can see code:

        SPArouter.zone = '#router';
        .
        .
        .
        SPArouter.init(onNavigate);
        function onNavigate (evt) {
            if (evt.detail.type == SPArouter.NavSTART) { //start
                //$('#router').fadeTo(100,.2);
            }
            else if (evt.detail.type == SPArouter.NavDONE) {
                $(SPArouter.zone).html(evt.detail.newContent);
                //$('#router').fadeTo(100,1);
                window.scrollTo(0, 0);
            }
        }

    and here `/elect/app/www/layout/layout.pug` you can see div `#router`:

        .column
            #router
               block main

    It intercepts href and replaces a #div. So every page content will place in `#router` div and for every page just the contents of this div is changed.

1. Inspect `/elect/app/www/index.pug` it the first page that is shown right after the app is run:

        extends /layout/layout

        block main

            .pad.
                Oh Hi

    this page extends the `/elect/app/www/layout/layout.pug` and this means that `block main` is inside the `#router` div.

2. Inspect `/elect/app/www/screen/tabulator/index.pug` it the second page, it shows the Tabulator.js table with the news from different sources that are get through api:

        block main

        .pad
            #feed-table.table-custom

            script.
                loadjs.ready(['services'], function () {
                    let apiService = new ApiService();
                    apiService.getFeedData()
                    .then(feed => {
                        //console.info('feed.data.articles', feed.data.articles);

                        this.table = new Tabulator("#feed-table", {
                            data:feed.data.articles,// assign data to table
                            layout:"fitColumns",    // fit columns to width of table
                            columns:[               // Define Table Columns
                                {title:"id", field:"id", visible:false},
                                {title:"Source", field:"source.name", align:"left"},
                                {title:"Author", field:"author", align:"left"},
                                {title:"Title", field:"title", align:"left"},
                                {title:"Content", field:"content", align:"left"}
                            ],
                            rowClick:(e, row) => { // fill the form fields
                                this.activeRow = row;
                                var row = row.getData();
                                window.rowUid = row.id;
                                $('input[name="name"]').val(row.name);
                                $('input[name="email"]').val(row.email);

                                $('html, body').animate({ // scroll to form
                                    scrollTop: $("#editor-form").offset().top
                                }, 500);
                            },
                        });
                    });

                });

In the [next tutorial ](/meta-cake/) you will learn about Meta Cake.
NEXT: Go to [Meta Cake](/meta-cake/).