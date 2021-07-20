const http = require('http');
const express = require('express');
const db = require('./model/trips');

const hostname = '127.0.0.1';
const port = 3000;

let id = 3;

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false 
}))

app.get('/', (req, res) => {
    res.render('home', {
        title: "List of the trips",
        trips: db,

    });
})

app.get('/trip-details/:handle', (req, res) => {
    const foundTrip = db.find((trip) => {
        return trip.id === parseInt(req.params.handle)
    })
    res.render('trip-details', {
        title: "Trip details",
        trip: foundTrip
    })
})

app.get('/new', (req, res) => {
    res.render('new', {
        title: "New CEO Form",
    })
});

app.post('/new', (req, res) => {
    const newTrip = {
        id: id++,
        title: req.body.trip_title.toLowerCase().split(' ').join('_'),
        departure_date: req.body.trip_departure_date,
        return_date: req.body.trip_return_date,
    }
    db.push(newTrip)
    console.log('New Trip Received', newTrip)
    res.redirect('/')
})





server.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})