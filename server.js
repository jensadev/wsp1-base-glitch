import express from 'express'
import nunjucks from 'nunjucks'
import morgan from 'morgan'

import indexRouter from './routes/index.js'
import charactersRouter from './routes/characters.js'

const app = express()
const PORT = process.env.PORT || 3000

// Konfigurera Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'njk')
app.set('views', './views')

app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/characters', charactersRouter)

app.use((req, res, next) => {
    res.status(404).send('Sidan hittades inte!')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Något gick fel!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})