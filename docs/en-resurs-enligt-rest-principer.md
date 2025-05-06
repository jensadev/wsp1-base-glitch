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

Vi börjar som tidigare med att planera våra routes. Vi kommer att skapa följande rutter för att hantera våra karaktärer:

| metod | URL | beskrivning | template |
|-------|-----|-------------|----------|
| GET | /characters | Hämta alla karaktärer | characters.njk |
| GET | /characters/:id | Hämta en specifik karaktär | character.njk |
| GET | /characters/new | Visa formulär för att skapa en ny karaktär | new-character.njk |
| POST | /characters | Skapa en ny karaktär | - |
| PUT | /characters/:id | Uppdatera en befintlig karaktär | - |
| DELETE | /characters/:id | Ta bort en karaktär | - |


