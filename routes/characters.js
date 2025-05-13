import express from 'express'
const router = express.Router()

// Hårdkodad data
const characters = [
    { id: 1, name: 'Hero', class: 'Warrior', level: 1 },
    { id: 2, name: 'Mage', class: 'Sorcerer', level: 1 },
    { id: 3, name: 'Rogue', class: 'Thief', level: 1 }
]
// Hämta alla karaktärer
router.get('/', (req, res) => {
    res.render('characters', {
        title: "All characters",
        description: "List of all characters",
        characters: characters 
    })
})

export default router