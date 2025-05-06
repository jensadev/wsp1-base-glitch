# Routing och requests (hantering av HTTP-förfrågningar)

I det här avsnittet kommer vi att gå igenom hur vi kan hantera olika typer av HTTP-förfrågningar med Express.js. Vi kommer att skapa olika rutter för att hantera GET- och POST-förfrågningar, samt hur vi kan skicka data tillbaka till klienten.

## Routing

Routing är processen att definiera hur en webbserver ska svara på olika HTTP-förfrågningar. I Express.js kan vi enkelt definiera rutter med hjälp av `app.get()`, `app.post()`, `app.put()` och `app.delete()` metoderna.

Än så länge har vi bara använt `app.get()` metoden för att hantera GET-förfrågningar. Nu ska vi lägga till några fler rutter för att hantera olika typer av förfrågningar.

## GET-förfrågningar

GET-förfrågningar används för att hämta data från servern. Vi har redan skapat en GET-route för att hantera förfrågningar till roten av webbplatsen (`/`). Nu ska vi skapa några fler GET-routes för att hantera olika sidor i vår applikation.

När vi skapar routes så använder vi oss av en praxis som kallas för Representational State Transfer (REST). REST är en arkitektur för att bygga webbapplikationer som använder HTTP-protokollet. Enligt REST-principerna så ska varje resurs (t.ex. en sida i vår applikation) ha en unik URL och vi ska använda olika HTTP-metoder för att hantera dessa resurser.

### Planera dina routes

Innan vi börjar skapa våra routes så är det bra att planera vilka sidor vi vill ha i vår applikation och hur de ska länka till varandra. Här är ett exempel på hur det kan se ut:

| metod | URL | beskrivning | template |
|-------|-----|-------------|----------|
| GET   | /   | Startsidan  | index.njk |
| GET   | /about | Om oss   | about.njk |
| GET   | /contact | Kontakta oss | contact.njk |
| POST  | /contact | Skicka in ett meddelande | - |
| GET   | /error | Testa 500 felmeddelande | 500.njk |
| ALL   | *   | Hantera 404 felmeddelande | 404.njk |

## Skapa routes

Nu när vi planerat routes så kan vi börja skapa dem, men innan vi gör det så ska vi skapa en ny mapp i vår projektmapp som heter `routes`. Denna mapp kommer att innehålla alla våra routes. Anledningen till att vi skapar en ny mapp är att det gör det enklare att organisera vår kod och hålla den ren och lättläst. Om vi skriver alla våra routes i `server.js` filen så kommer den att bli väldigt stor och svår att läsa. Genom att dela upp koden i olika filer så blir det enklare att hantera och underhålla.

### Route: index.js

Det första vi ska göra är att flytta vår GET-route för `/` till en ny fil som vi ska kalla `index.js`. Skapa en ny fil i `routes` mappen med namnet `index.js` och lägg till följande kod:
```javascript
import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    // kod från server.js
})
export default router
```

Viktig här är att vi använder `express.Router()` för att skapa en ny router. Vi använder inte `app` här utan `router` istället. Detta gör att vi kan skapa flera olika routers i vår applikation och sedan koppla dem till vår huvudrouter (i det här fallet `app`).

### Avsluta med export

I slutet av din router fil så måste du exportera den med `export default router`. Detta gör att vi kan importera den i vår `server.js` fil och använda den där. Du kan tänka på det som att express läser in filen där du anger det (`use`) och sedan kör innehållet, `export` berättar sedan att express ska gå tillbaka och fortsätta med koden i `server.js` filen.

### Importera och använd router i server.js

Nu när vi har skapat vår router så måste vi importera den i vår `server.js` fil och använda den där. Öppna `server.js` filen och lägg till följande kod:
```javascript
// efter imports
import indexRouter from './routes/index.js'
// efter konfiguration av app, dvs. use
app.use('/', indexRouter)
```

När vi kopplar routen till vår server så använder vi `app.use()` metoden. Denna metod används för att koppla en router till en specifik URL. I det här fallet så kopplar vi vår `indexRouter` till roten av webbplatsen (`/`). Detta innebär att alla förfrågningar som görs till `/` kommer att hanteras av vår `indexRouter`. 

## Testa din router

Nu när vi flyttat routen till en egen fil och kopplat den till vår server så kan vi testa den. Starta din server med `npm run dev` och gå till `http://localhost:3000/` i din webbläsare. Du bör nu se innehållet som tidigare för `/` routen. Spännande nog så bör det se ut precis som tidigare.

## En ny route, /about

Nu ska vi skapa en ny route för `/about`. Jag argumenter för att vi skapar `about` routen i den existerande `index` routen för att hålla det enkelt. Skapa en ny route i `index.js` filen med följande kod:

```javascript
router.get('/about', (req, res) => {
    const data = {
        title: 'Om oss',
        message: 'Detta är en sida om oss.'
    }
    res.send(data)
})
```

Nu har vi skapat en ny route för `/about`, testkör den så kommer du att se texten från `data` objektet.

### Skapa en vy för /about

Nu när vi har skapat en route för `/about` så ska vi skapa en vy för den. Skapa en ny fil i `views` mappen med namnet `about.njk`. Filen kan vara en kopia av `index.njk` filen än så länge eftersom vi använder samma keys i `data` objektet.

```html
{% extends "layout.njk" %}

{% block content %}
<main>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
</main>
{% endblock %}
```

Ändra sedan i `index.js` filen så att den renderar vyn istället för att skicka tillbaka ett objekt. Ändra koden i `/about` routen till följande:
```javascript
res.render('about', data)
```

## Nagivation

För att förenkla navigeringen mellan sidorna så ska vi lägga till en navbar i vår layout. Vi kommer inte att skriva navbaren direkt i layouten utan vi kommer att skapa en ny fil som heter `navbar.njk` i `views` mappen för att sedan inkludera den i layouten. Skapa en ny fil i `views` mappen med namnet `navbar.njk` och lägg till följande kod:
```html
<nav>
    <ul>
        <li><a href="/">Startsidan</a></li>
        <li><a href="/about">Om oss</a></li>
        <li><a href="/contact">Kontakt</a></li>
    </ul>
</nav>
```

Nu när vi har skapat navbaren så ska vi inkludera den i vår layout. Öppna `layout.njk` filen och lägg till följande kod där du vill att navbaren ska visas:
```html
{% include "navbar.njk" %}
```
Nu när vi har inkluderat navbaren i vår layout så ska vi testa att den fungerar. Starta din server med `npm run dev` och gå till `http://localhost:3000/` i din webbläsare. Du bör nu se navbaren högst upp på sidan. Om du klickar på länkarna så ska du kunna navigera mellan sidorna.

Jag hoppas att du ser hur kraftfullt template systemet är för att snabbt kunna skapa sidor och återanvända kod.

### Övning

Lite repetition från webbutveckling 1, styla din navbar!

## POST-förfrågningar

POST-förfrågningar används för att skicka data till servern. Vi kommer att skapa en POST-route för att hantera formulär som skickas in från klienten. För att kunna ta emot och hantera data från formulär så måste vi konfigurera vår server för att kunna hantera POST-förfrågningar.

### Hantera POST-förfrågningar

För att konfigurera servern att hantera data skickat från formulär så behöver vi konfigurera det i vår `server.js` fil. Det görs genom en metod i express som heter `express.urlencoded()`. Denna metod används för att parsa data som skickas från formulär.

## En ny route, /contact

Nu ska vi skapa en ny route för `/contact`. Denna route kommer att hantera ett formulär som användaren kan fylla i för att skicka ett meddelande till oss. Skapa en ny route i `index.js` filen med följande kod:
```javascript
router.get('/contact', (req, res) => {
    const data = {
        title: 'Kontakta oss',
        message: 'Fyll i formuläret nedan för att skicka ett meddelande till oss.'
    }
    res.render('contact', data)
})
```
Nu har vi skapat en ny route för `/contact`. Vi behöver också skapa en vy för den. Skapa en ny fil i `views` mappen med namnet `contact.njk` och lägg till följande kod:
```html
{% extends "layout.njk" %}

{% block content %}
<main>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <form action="/contact" method="POST">
        <label for="name">Namn:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">E-post:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Meddelande:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Skicka</button>
    </form>
</main>
{% endblock %}
```

Nu har vi skapat en vy för `/contact` som innehåller ett formulär. Formuläret har tre fält: namn, e-post och meddelande. När användaren skickar in formuläret så kommer det att skicka en POST-förfrågan till `/contact` routen.

För att styra ett formulär så använder vi `action` attributet i `<form>` taggen. Detta attribut anger vilken URL som formuläret ska skicka data till när det skickas in. I det här fallet så skickar vi data till `/contact` routen. Vi anger också metoden som formuläret ska använda, i det här fallet `POST`.

## Hantera POST-förfrågningar från /contact

Nu ska vi skapa en POST-route för att hantera formuläret som skickas in från `/contact` routen. Formulärets action pekar till `/contact`, så för att hantera POST-förfrågningar till `/contact` så lägger vi till en ny route i `index.js` filen med metoden `router.post()`. Denna metod används för att hantera POST-förfrågningar.

För att förstå hur den data som skickas från formuläret ser ut så kan vi logga den i konsolen. Lägg till följande kod i `index.js` filen:
```javascript
router.post('/contact', (req, res) => {
    console.log(req.body)
    res.send('Meddelandet har skickats!')
})
```

Nu när vi har skapat en POST-route för `/contact` så kan vi testa den. Starta din server med `npm run dev` och gå till `http://localhost:3000/contact` i din webbläsare. Fyll i formuläret och klicka på "Skicka". Du bör nu se att data som skickas från formuläret loggas i konsolen. Om du kollar i terminalen så ska du se något liknande detta:
```javascript
{ name: 'test', email: 'test@test.se', message: 'test' }
```


## Frågor

1. Vad är routing och hur används det i Express.js?
    * Vilka metoder används för att definiera routes i Express.js?
2. Hur skapar vi en GET-route för /about och vad är syftet med att använda en vy för denna route?
3. Beskriv tre fördelar med att använda templater för att generera HTML-sidor dynamiskt?
4. Vilka egenskaper har ett formulär i HTML och hur kan vi använda dem för att skicka data till servern?
5. Hur kan du säkerställa att dina routes är organiserade och lättillgängliga?

## Sammanfattning

I det här avsnittet har vi gått igenom hur vi kan hantera olika typer av HTTP-förfrågningar med Express.js. Vi har skapat routes för att hantera GET- och POST-förfrågningar. Vi har även tittat på hur vi hanterar data från användaren.

## Kod

Vill du titta på koden för det här steget så hittar du en länken till comitten här: [Routing och hantering av HTTP-förfrågningar](https://github.com/jensadev/wsp1-base-glitch/tree/cbb1a1c7bc6455d06d96f4984b804fb9b74e7751)