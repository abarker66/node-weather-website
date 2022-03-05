const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3001

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Barker'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Barker'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helptext: 'This the help text',
        name: 'Andrew Barker'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to supply an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            eror: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: 'Help Page not found',
        message: 'Help Page not found - go to home page',
        name: 'Andrew Barker'
    })
})

// match anything not matched so far
app.get('*', (req, res) => {
    res.render('404-page', {
        title: 'Page not found!',
        message: 'Page not found - go to home page',
        name: 'Andrew Barker'
    })
})

// start the server
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})