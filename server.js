import express from 'express'
import nunjucks from 'nunjucks'

import indexRouter from './routes/index.js'

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

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})