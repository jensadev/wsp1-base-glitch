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

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})