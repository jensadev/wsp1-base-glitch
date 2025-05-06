import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    const data = {
        title: 'Välkommen till min test-sida',
        description: 'Detta är en testapplikation för att visa och förklara grunderna i webbserverprogrammering.'
    }
    res.render('index', data)
})

router.get('/about', (req, res) => {
    const data = {
        title: 'Om oss',
        description: 'Detta är en sida om oss.'
    }
    res.render("about", data)
})

router.get('/contact', (req, res) => {
    const data = {
        title: 'Kontakta oss',
        message: 'Fyll i formuläret nedan för att skicka ett meddelande till oss.'
    }
    res.render('contact', data)
})

export default router
