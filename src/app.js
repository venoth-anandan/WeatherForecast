const request       = require('request')
const path          = require('path');
const express       = require('express');
const hbs           = require('hbs')
const port          = process.env.PORT || 3000 ;
const forecast      = require('./Utils/forecast');
const geoCode       = require('./Utils/geoCode')

const app   = express()

// Defined the path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath     = path.join(__dirname,'../templates/views')
const partialPath   = path.join(__dirname,'../templates/partials')

// Set up handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Set up the path for static files 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {

    res.render('index',{
        title:"weather-app",
        name:"Venoth"
    })
})

app.get('/forgotPassword',(request,response)=>{
    response.render('forgotPassword',{
        title:"forgotPassword"
    })
})

app.get('/login',(request,response)=>{
    response.render('login',{
        title:"Login",
        name:"venoth"
    })
})
app.get('/about',(req,res) =>
{
    res.render('about',
    {
        "helpText":"This is some helpful text",
        "title":"About Me",
        "name":"Venoth"
    })
})

app.get('/help',(req,res) =>{

    res.render('help',{
        "title":"Help!",
        "name":"Venoth"
    })
})

app.get('/weather', (request,response) => {

    if(!request.query.address)
    {
        return response.send(
            {
                "err":"Address should not be empty. Please pass the address into the query"
            }
        )
    }
   else
    {
        location = JSON.stringify(request.query.address)
        geoCode(location,(error,{latitude,longititude,location} ={}) =>{
                if(error)
                {
                    return response.send({error})
                }
                forecast(latitude,longititude,(error,forecastData) =>
                {
                    if(error)
                    {
                        return response.send({error})
                    }

                    response.send(
                        {
                            forecast:forecastData,
                            location,
                            address:request.query.address

                        }
                    )
                })
                
            })
            
        
    }
})



app.get('/products',(req,res) =>
{
    if(!req.query.search)
    {
         return res.send({
            "errorMessage":"You must provide search a term"
        })
    }
    else
    {
        console.log("SearchQuery::"+JSON.stringify(req.query.search))
        res.send({
                products:[]
                })
    }
    
})

app.get('/convertToMinutes',(req,res)=>{
    res.render('convertToMinutes',{
        title: "convertSecondsToMinutes" 
    })
    
})


app.get('/help/*',(req,res) =>{
    res.render('error_404',{
        "title":404,
        "name":"venoth",
        "errorMessage":"Help article not found"
    })
})

app.get('*',(req,res) =>{
    res.render('error_404',{
        "title":404,
        "name":"venoth",
        "errorMessage":"Page not found"
    })
})

app.listen(port,() =>{
    console.log('Server is up and running on port:'+port)
});
