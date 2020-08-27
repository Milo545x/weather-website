//requiring files 
const express = require('express')
const ejs = require('ejs')
const { query } = require('express')
const forecast = require('./public/js/utils/forecast')
const geocode = require('./public/js/utils/geocode')
const request = require('request')

//create express app
const app = express()

// Setup ejs engine and views location
app.set('view engine', 'ejs')

// Setup static directory to serve
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Milo Chris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Milo Chris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Entrez une adresse ou un code postal dans la barre de recherche et puis validez',
        title: 'Help',
        name: 'Milo Chris'
    })
})
app.get('/help/:helpID', (req, res) =>{
    console.log(req.params.helpID)
    res.send('<h3> HELP ARTICLE : ' + req.params.helpID + ', DOESN\'T EXIST</h3>')
})

//weather

//routes weather
app.get('/weather', (req, res) => {
    const addressName = req.query.address
    if(!addressName){
    return res.send({error : 'provides an address please'})
    }else{
    geocode(addressName,(error, {latitude, longitude, Location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error : error})
            }
            res.send({
                    forecast: forecastData,
                    Location,
                    address: req.query.address
                })
          })
    })
}

})
app.get('/products', (req, res) =>{
    if((!req.query.search) || (! req.query.rating)){
        return res.send({error : 'Provides a search please or rating'})
    }
    res.send({products : [
        {
            products_name : req.query.search,
            rating : req.query.rating
        }
            
    ]})
})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Milo Chris',
//         errorMessage: 'Help article not found.'
//     })
// })

app.use((req, res) => {
    res.render('404', {
        title: '404',
        name: 'Milo Chris',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})