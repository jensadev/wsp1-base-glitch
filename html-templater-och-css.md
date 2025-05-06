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

Vi har nu skapat en HTML-templat som vi använder för vår `index`-sida. Om jag nu ger dig i uppdrag att skapa en `about`-sida så kommer du att behöva skapa en ny templat för den sidan med samma grundläggnade HTML-struktur som `index`-sidan. Detta är inte optimalt eftersom vi kommer att behöva upprepa oss själva och det kommer att bli svårt att underhålla koden. Kom ihåg vi använder oss av templater för att förbättra vår kod.

För att undvika detta så kan vi använda oss av en layout. En layout är en HTML-templat som innehåller den grundläggande strukturen för vår sida. Vi kan sedan använda denna layout i våra andra templater.
Skapa en ny fil med namnet `layout.njk` i `views` mappen. Denna fil kommer att innehålla vår layout.

### Layoutens struktur

I `layout.njk` filen så kan vi skapa en grundläggande HTML-struktur som kommer att användas för alla våra sidor. Vi kan sedan skapa ett block där vi kan fylla i innehållet för varje sida. Detta block kommer att kallas `content` och kommer att användas för att fylla i innehållet för varje sida.

```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

Nu har vi skapat en layout som innehåller den grundläggande strukturen för vår sida. Vi kan nu använda denna layout i våra andra templater.

### Variabler och templat kommandon

I layouten så har vi använt `{{ title }}` för att fylla i titeln för sidan. Detta kommer att fyllas i med den data som vi skickar till templaten. Vi kan också använda andra templater kommandon i layouten, som `{% block %}`-taggen för att skapa block där vi kan fylla i innehållet för varje sida.

### Använda layouten

Vi kan nu använda layouten i vår `index`-templat. För att göra detta så måste vi först inkludera layouten i templaten. Detta gör vi genom att använda `{% extends %}`-taggen. Vi kan sedan använda `{% block %}`-taggen för att fylla i innehållet för varje sida.
Ändra `index.njk` filen så att den ser ut som följande:

```html
{% extends "layout.njk" %}

{% block content %}
<main>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
</main>
{% endblock %}
```

Ladda om sidan, nu när vi använder layout så bör du se att sidans titeln nu använder sig av `title` variabeln som vi skickade till templaten.

## Statiska filer

Nu när vi har skapat en layout och en template så kan vi titta på hur vi använder statiska filer i vår applikation. Statiska filer är filer som inte ändras när servern körs. Detta inkluderar bland annat CSS-filer och bilder. Vi kommer att använda en CSS-fil för att styla vår applikation.

### Konfigurera statiska filer

För att kunna använda statiska filer i vår applikation så måste vi konfigurera Express.js för att servera dessa filer. Vi kommer att göra detta genom att använda `express.static`-metoden. Lägg till följande rad i din `server.js` fil:

```javascript
app.use(express.static('public'))
```
Denna rad kommer att konfigurera Express.js för att servera statiska filer från `public` mappen. Vi kommer att lägga till vår CSS-fil i denna mapp.

#### Public mappen

Nu när vi har konfigurerat Express.js för att servera statiska filer så kan vi skapa en mapp för våra statiska filer. Skapa en ny mapp med namnet `public` i din projektmapp. Denna mapp kommer att innehålla alla våra statiska filer, inklusive CSS-filer och bilder.

Anledningen till att vi döper mappen `public` är för att det är en konvention inom webbutveckling. Det gör det tydligt att dessa filer är offentliga och kan nås av alla. Det är också en standard som används av många ramverk och bibliotek, inklusive Express.js.

`public` mappen syns aldrig i webbläsaren, utan det är bara en mapp som används för att lagra statiska filer. När vi laddar en sida så kommer webbläsaren att begära dessa filer från `/` och inte från `/public`. Så du ska aldrig referera till `/public` i din css eller html.

### Skapa en CSS-fil

Inuti `public` mappen så skapar vi en fil med namnet `style.css`. Denna fil kommer att innehålla vår CSS-kod.
I `style.css` filen så kan vi lägga till lite grundläggande CSS-kod för att styla vår applikation. Lägg till följande kod i `style.css` filen:

```css
body {
    font-family: sans-serif;
    background-color: #f0f0f0;
    color: #333;
}
main {
    max-width: 80ch;
    padding: 1rem;
    margin: 0 auto;
}
```

Nu när vi har skapat vår CSS-fil så kan vi använda den i vår applikation. För att göra detta så måste vi inkludera CSS-filen i vår layout. Öppna `layout.njk` filen och lägg till följande rad i `<head>`-taggen:
```html
<link rel="stylesheet" href="/style.css">
```
Nu när vi har inkluderat CSS-filen i vår layout så kommer den att användas för alla sidor som använder denna layout. Ladda om sidan och se att CSS-filen har laddats och att sidan nu är stylad.

## Uppgift

Lägg till en bild för att testa att skapa statiskt innehåll. Använd sedan bilden i din `index.njk` fil.

## Frågor

1. Vad är en HTML-templat och hur används den i en webbserver?
    * Vad är fördelen med att använda templater för att generera HTML-sidor dynamiskt?
2. Hur skickar vi data till en templat och använder platshållare i templaten?
    * Vilken syntax använder nunjucks?
3. Vad är en layout och hur hjälper den oss att undvika upprepning av kod?
4. Hur skulle du förklara fördelarna med att använda templater och layout i en webbapplikation till någon som är ny inom webbutveckling?
5. Kan du ge ett exempel på en situation där templater och layout skulle vara särskilt användbara?
6. Kan du sammanfatta stegen för att skapa och använda en HTML-templat med Nunjucks i en Express.js-applikation?

## Sammanfattning

Vi har nu tittat på att använda templater för att generera HTML-sidor dynamiskt. Vi har också sett hur vi kan använda en layout för att undvika upprepning av kod. Vi har också sett hur vi kan använda statiska filer för att styla vår applikation.

## Kod

Vill du titta på koden för det här steget så hittar du en länken till comitten här: [html-templater-och-css](https://github.com/jensadev/wsp1-base-glitch/tree/9b914b6b5ca4a155c6ff4d8f7d513b24315b2bc1)