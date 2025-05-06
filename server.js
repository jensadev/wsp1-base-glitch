import express from 'express'
import nunjucks from 'nunjucks'

const app = express()
const PORT = process.env.PORT || 3000

// Konfigurera Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    const data = {
        title: 'Välkommen till min test-sida',
        description: 'Detta är en testapplikation för att visa och förklara grunderna i webbserverprogrammering.'
    }
    res.render('index', data)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})