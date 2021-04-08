const express = require('express')
const app = express()
const drivers = require('./drivers')
const PORT = 8001

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index.ejs', { drivers })
})

app.get('/api', (req, res) => {
    res.sendFile(__dirname + "/api.html")
})

app.post('/getChamp', (req, res) => {
    let champs
    if (req.body.champ){
        champs = drivers.filter(d => d.name.includes(req.body.champ))
    }else if (req.body.year) champs = drivers.filter(d => d.yearsWon.includes(Number(req.body.year)))
    else if (req.body.nationality) champs = drivers.filter(d => d.nationality === req.body.nationality)
    console.log(champs)
    res.render('index.ejs', { drivers: champs })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})