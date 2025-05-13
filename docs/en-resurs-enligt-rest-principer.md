# En resurs enligt REST-principer

Nu ska vi skapa en resurs som representerar en karaktär i ett spel. Denna resurs är ett exempel på hur vi hanterar resurser enligt REST-principer. 

## Vad är en resurs?

En resurs är en enhet som representerar något i vår applikation. I vårt fall kommer vi att skapa en resurs som representerar en karaktär i ett spel. Denna resurs kommer att innehålla information om karaktären, såsom namn, klass och nivå. Vi kommer också att skapa en vy för att visa information om karaktären och en vy för att skapa en ny karaktär.

Resursen kan representeras som ett objekt.
```javascript
const character = {
    name: 'Hero',
    class: 'Warrior',
    level: 1
}
```

Resursen kan också representeras som en JSON-sträng.
```json
{
    "name": "Hero",
    "class": "Warrior",
    "level": 1
}
```

Vi använder dessa exempel för att det sedan kommer att vara en bra grund när vi går vidare till att skapa och hantera data i en databas.

Tips: Det är viktigt att du förstår vad en resurs är och hur den representeras. En resurs är en representation av någon i vår applikation, du kan tänka på det som en "sak". En bok, en bil eller en nyhetpost är alla exempel på resurser. Alla dessa "saker" har egenskaper som representeras på objeketet.

## Hantera en resurs, CRUD

CRUD är en akronym som står för Create, Read, Update och Delete. Dessa fyra operationer är de grundläggande funktionerna för att hantera resurser i en applikation.
- **Create**: Skapa en ny resurs. I vårt fall kommer vi att skapa en ny karaktär.
- **Read**: Hämta en resurs eller en lista med resurser. Vi kommer att hämta alla karaktärer eller en specifik karaktär.
- **Update**: Uppdatera en befintlig resurs. Vi kommer att uppdatera en karaktärs information.
- **Delete**: Ta bort en resurs. Vi kommer att ta bort en karaktär.

## REST-principer

REST (Representational State Transfer) är en arkitektur för att bygga webbapplikationer. REST-principerna definierar hur resurser ska representeras och hur de ska hanteras. Här är några av de viktigaste principerna:
1. **Resurser representeras med URI**: Varje resurs har en unik identifierare (URI) som används för att hämta eller manipulera resursen. I vårt fall kommer vi att använda `/characters` som URI för att hämta och manipulera karaktärer.
2. **HTTP-metoder**: Vi använder olika HTTP-metoder för att utföra olika operationer på resurser. De vanligaste metoderna är:
   - `GET`: Hämta en resurs
   - `POST`: Skapa en ny resurs
   - `PUT`: Uppdatera en befintlig resurs
   - `DELETE`: Ta bort en resurs
3. **Stateless**: Varje begäran från klienten till servern måste innehålla all information som behövs för att förstå och bearbeta begäran. Servern ska inte lagra någon information om klientens tillstånd mellan begärningar.
4. **Representations**: Resurser kan representeras i olika format, såsom JSON eller XML. Vi kommer att använda JSON för att representera våra karaktärer.

## Routing

Vi börjar som tidigare med att planera våra routes. Routerna är de URL:er som vi kommer att använda för att hämta och manipulera våra resurser. Vi gör det enligt REST-principerna och förbereder för att utföra CRUD-operationer på våra karaktärer.

| metod | URL | beskrivning | template |
|-------|-----|-------------|----------|
| GET | /characters | Hämta alla karaktärer | characters.njk |
| GET | /characters/:id | Hämta en specifik karaktär | character.njk |
| GET | /characters/new | Visa formulär för att skapa en ny karaktär | new-character.njk |
| POST | /characters | Skapa en ny karaktär | - |
| PUT | /characters/:id | Uppdatera en befintlig karaktär | - |
| DELETE | /characters/:id | Ta bort en karaktär | - |

## Koda router

Min personliga preferens är att börja med att skapa en route för att hämta all data, Read i CRUD. Det är en bra startpunkt för att se att det fungerar. Det är en `GET` request och den kan sedan användas för att visa att vi kan skapa data (när vi jobbar med Create).

I det första steget så kommer vi att "hårdkoda" datan i en array.

### Koda en route för att hämta alla karaktärer, Read

Eftersom vi jobbar med en resurs så kommer vi att skapa en ny fil som heter `characters.js` i mappen `routes`. Denna fil kommer att innehålla vår route för att hämta alla karaktärer.

Redigera filen `routes/characters.js` och lägg till följande kod:
```javascript
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
    res.json(characters)
})

export default router
```

Nu behöver vi att registrera vår route i `server.js` så att den kan användas. Öppna filen `server.js` och lägg till följande kod:
```javascript
// samla route imports efter paket
import charactersRouter from './routes/characters.js'
// konfiguartion av express
app.use('/characters', charactersRouter)
// listen på slutet
```

Med det på plats så är det dags att testa din server så att allt fungerar. Surfa till `http://localhost:3000/characters` och se att du får en lista med karaktärer. Om det inte fungerar, kolla i webbläsaren samt terminalen så att du kan hitta vad som är fel.

### Skapa en vy för att visa alla karaktärer

Nu när vi vet att vi kan svara med datan (i form av en json-klump) så kan vi skapa en vy för att visa alla karaktärer. Som tidigare så använder vi Nunjucks, men nu kommer vi att använda oss av Nunjucks möjlighet att loopa igenom data.

Öppna/skapa filen `views/characters.njk` och lägg till följande kod:
```html
{% extends "layout.njk" %}
{% extends "base.njk" %}
<main class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <ul>
        {% for character in characters %}
            <li>
                Name: {{ character.name }}
            </li>
        {% else %}
            <li>No characters found.</li>
        {% endfor %}
    </ul>
</main>
{% block content %}
```

Syntaxen för att loopa i Nunjucks är lite annorlunda än i JavaScript, men här använder vi en forEach-loop. Vi använder `{% for character in characters %}` för att loopa igenom alla karaktärer och `{% else %}` för att hantera fallet när det inte finns några karaktärer.

Nu behöver vi att uppdatera vår route så att den skickar med datan till vyn. Öppna filen `routes/characters.js` och ändra koden för att hämta alla karaktärer så att den renderar vyn istället för att skicka tillbaka JSON.

```javascript
router.get('/', (req, res) => {
    res.render('characters', {
        title: "All characters",
        description: "List of all characters",
        characters: characters 
    })
})
```

Om du vill testa `else`-delen så kan du kommentera bort arrayen med karaktärer i `characters.js` så att den blir tom. Då kommer du att se att det står "No characters found." i vyn.

#### Övning

Redigera vyn för att visa mer information om karaktären. Lägg till klass och nivå i listan.


## Skapa en vy för att visa en specifik karaktär