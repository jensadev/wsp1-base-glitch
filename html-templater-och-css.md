# HTML-templater och CSS

En av fördelarna med att köra en webbserver är att vi kan använda kod för att generera HTML-sidor dynamiskt. Det finns flera sätt att göra detta, både på backend och frontend. Eftersom vi arbetar med backend i det här fallet så kommer vi att fokusera på hur vi kan använda templater för att generera HTML-sidor på servern.

## Vad menas med en html-templat?

En HTML-templat är en HTML-fil som innehåller platshållare för data som kommer att fyllas i av servern. Det gör att vi kan skapa dynamiska sidor som kan anpassas efter användarens inmatning eller andra faktorer.

### Hur fungerar det?

När servern tar emot en begäran så kommer den att hämta rätt templat och fylla i platshållarna med data. Denna data kan komma från en databas, en fil eller något annat ställe. När servern har fyllt i templatet så kommer den att skicka tillbaka den färdiga HTML-sidan till webbläsaren.

## Installation av Nunjucks

För att kunna använda templater i vår applikation så kommer vi att använda Nunjucks. Nunjucks är en templating engine för JavaScript med syfte att förenkla skapandet av HTML-sidor.

För att installera Nunjucks så kör vi följande kommando i terminalen:

```bash
npm install nunjucks
```
Detta kommer att installera Nunjucks och lägga till det i vår `package.json` fil.

### Konfigurera Nunjucks

För att kunna använda Nunjucks i vår applikation så måste vi konfigurera det. Vi kommer att göra detta i vår `server.js` fil.
Öppna `server.js` filen och redigera den så att den ser ut som följande:

```javascript
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
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
```

## Skapa en vy

Nu när vi har konfigurerat Nunjucks så kan vi skapa en vy. En vy är en HTML-templat som kommer att användas för att generera en sida.
Skapa en ny mapp med namnet `views` i din projektmapp. Inuti `views` mappen så skapar vi en ny fil med namnet `index.njk`. Denna fil kommer att innehålla vår HTML-templat.

### HTML struktur

Börja med att skapa en grundläggande HTML-struktur i `index.njk` filen.
Tips: Visual Studio Code har en inbyggd funktion för att skapa HTML-struktur, du kan skriva html och trycka på `tab` så kommer den att skapa en grundläggande HTML-struktur. Om inte VS Code känner igen filformatet så klicka nere till höger och associera `.njk` som HTML.

### Faktiskt innehåll

I templatens `<body>`-tagg så kan vi lägga till en rubrik och en paragraf.

```html
<body>
    <h1>Välkommen till min test-sida</h1> 
    <p>Detta är en testapplikation för att visa och förklara grunderna i webbserverprogrammering.</p>
</body>
```

## Använda templaten

Nu när vi har skapat vår vy så kan vi använda den i vår server. Vi kommer att ändra vår `GET`-route så att den använder templaten istället för att skicka tillbaka en enkel text.
Öppna `server.js` filen och ändra `app.get`-metoden så att den ser ut som följande:
```javascript
app.get('/', (req, res) => {
    res.render('index')
})
```
Nu när vi har ändrat vår `GET`-route så kommer servern att använda templaten istället för att skicka tillbaka en enkel text. När användaren går till roten av webbplatsen (`/`) så kommer servern att svara med den HTML-sidan som genereras av templaten.

### Att skicka data till templaten

Som tidigare nämnt så är en av fördelarna med att använda templater att vi kan skicka data till dem. Vi kan skicka data i form av objekt som kommer att fyllas i platshållarna i templaten.
För att skicka data till templaten så kan vi ändra vår `GET`-route så att den ser ut som följande:
```javascript
app.get('/', (req, res) => {
    const data = {
        title: 'Välkommen till min test-sida',
        description: 'Detta är en testapplikation för att visa och förklara grunderna i webbserverprogrammering.'
    }
    res.render('index', data)
})
```
Nu när vi har ändrat vår `GET`-route så kommer servern att skicka data till templaten. Vi kan sedan använda denna data i templaten genom att använda platshållare.
I templaten så kan vi använda platshållarna för att fylla i data. Ändra `index.njk` filen så att den ser ut som följande:

```html
<h1>{{ title }}</h1>
<p>{{ description }}</p>
``` 

Nu kan du besöka din server igen och se att templaten har fyllts i med data. Men här behöver vi göra en viktig ändring för att servern ska ladda om när vi redigerar templaten. 

### Uppdaterat dev script

För att servern ska ladda om när vi redigerar templaten så måste vi lyssna på det filformatat. Lägg till följande rad i din `package.json` fil:

```json
"dev": "nodemon -e js,html,njk,json,css ./server.js"
```

Starta sedan om scriptet med `npm run dev` så kommer servern att ladda om när vi redigerar templaten.

## Layout och att undvika upprepning


