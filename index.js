const express = require('express');
const app = express();
const compression = require('compression');

const bodyparser = require("body-parser");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const cookieSession = require("cookie-session");
const csurf = require("csurf");


app.disable("x-powered-by");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(
    cookieSession({
        secret: "I am always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);


app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

let secrets;

if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('./secrets');
    //console.log("secrets:", secrets);
}
const myKey = secrets.API_KEY;

app.post("/registration", (req, res) => {
    //console.log("req.body in /registration:", req.body);
    if (req.body.password != "") {
        hash(req.body.password).then(hash => {
            console.log("hashedpassword in post /registration:", hash);
            return db
                .createUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hash);

        }).then(results => {
            console.log("results in post /registration:", results);
            req.session.user_id = results.rows[0].id;
            //console.log(req.session.user_id);
            req.session.firstname = results.rows[0].firstname;
            req.session.lastname = results.rows[0].lastname;
            req.session.email = results.rows[0].email;
            res.json({success: true});
        })
            .catch(function(error) {
                console.log("error in post /registration:", error);
                res.json({success: false});
            });
    } else {
        console.log("please, add a password");
    }

});

app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(result => {
        return compare(req.body.password, result.rows[0].password)
            .then(doesMatch => {
                if (doesMatch === true) {
                    req.session.user_id = result.rows[0].user_id;
                    res.json({success: true});
                } else {
                    res.json({success: false});
                }
            }).catch(err => {
                res.json({success: false});
                console.log("error in post login: ", err);
            });
    }).catch(err => {
        res.json({success: false});
        console.log("second error in post login: ", err);
    });
});

app.get("/user", (req, res) => {
    //console.log("GET /user hit!");
    db.getUserData(req.session.user_id
    ).then(resp => {
        //console.log("resp on get /user:", resp);
        res.json(resp.rows[0]);
        //console.log("resp:", resp);
    }).catch(err =>{
        console.log("error in get /user:", err);
    });
});

// app.get(`https://www.googleapis.com/books/v1/volumes?q=params&download=epub&key=` + myKey).then(data => {
//     //console.log("data in axios get:", data);
//     this.setState(data);
//     //redirects user to / route: use this if user writes nonsense in url
// }).catch(error => {
//     console.log("error in axios get:", error);
// });

//google books:
let books = require('google-books-search');

let options = {
    key: myKey,
    field: 'title',
    offset: 0,
    limit: 40,
    // type: 'books',
    order: 'relevance',
    download: 'epub',
    printType: 'ebook',
    lang: 'en'
};

app.get("/search/:name", (req, res) => {
    books.search(req.params.name, options, function(error, results, apiResponse) {
        if ( ! error ) {
            console.log("results in search index.js:", results);
            console.log("apiResponse:", apiResponse);
            res.json(results);
        } else {
            console.log(error);
        }

    });
});
//end of google books!

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get('/welcome', function(req, res) {
    if (req.session.user_id) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
