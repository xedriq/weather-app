const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicPath))

const author = "Xedriq"

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "Help message here!",
        author
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address to search'
        })
    }

    geocode(req.query.address, (error, { long, lat, location } = {}) => {
        if (error) {
            return (res.send({ error }))
        } else {

            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return (res.send({ error }))
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        long,
                        lat,
                        address: req.query.address,
                    })
                }
            })

        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a keyword to search'
        })
    }

    console.log(req.query)
    res.send([{
        productios: [],
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        message: "Help article not found..",
        author
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        author,
        message: "Sorry, page not found..."
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})