# Logger och felmeddelanden

Innan vi går vidare ska vi lägga till en logger för att logga alla förfrågningar som kommer in till servern. Detta är bra för att kunna se vad som händer på servern och för att kunna felsöka eventuella problem.

Vi kommer göra det genom att använda ett paket som heter `morgan`. Detta paket används för att logga alla förfrågningar som kommer in till servern. För att installera `morgan` så kör följande kommando i terminalen:
```bash
npm install morgan
```

### Använda morgan

Nu när vi har installerat `morgan` så måste vi importera det i vår `server.js` fil och använda det där. Öppna `server.js` filen och lägg till följande kod:
```javascript
import morgan from 'morgan'
app.use(morgan('dev'))
```

Starta sedan om din server med `npm run dev`. Nu när vi har installerat och konfigurerat `morgan` så kan vi se alla förfrågningar som kommer in till servern i terminalen. Du bör se något liknande detta:
```javascript
GET / 200 5.123 ms - 1234
GET /about 200 2.123 ms - 5678
POST /contact 200 1.123 ms - 1234
```
Detta visar att vi har fått en GET-förfrågan till `/` routen som svarade med statuskod 200 (OK) och tog 5.123 ms att bearbeta. Vi ser också att vi har fått en POST-förfrågan till `/contact` routen som också svarade med statuskod 200 (OK) och tog 1.123 ms att bearbeta.

## Felmeddelanden

Nu när vi har lagt till en logger så ska vi också lägga till felmeddelanden. Detta är bra för att kunna se om det uppstår några problem på servern. Vi kommer att använda `express` inbyggda felhanterare för att hantera fel som uppstår på servern.
För att göra detta så lägger vi till en ny middleware i vår `server.js` fil. En middleware är en funktion som körs innan en route hanteras. Vi kommer att använda denna middleware för att hantera fel som uppstår på servern.
Lägg till följande kod i slutet av din `server.js` fil:
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Något gick fel!')
})
```
Denna middleware kommer att logga felmeddelandet i konsolen och skicka tillbaka ett felmeddelande till klienten med statuskod 500 (Internal Server Error). Detta är bra för att kunna se om det uppstår några problem på servern.
Nu när vi har lagt till en felhanterare så kan vi testa den genom att skapa ett fel i vår kod. Öppna `index.js` filen och lägg till följande kod i slutet av filen:
```javascript
router.get('/error', (req, res) => {
    throw new Error('Detta är ett testfel!')
})
```
Nu har vi skapat en route för `/error` som kommer att kasta ett fel när den anropas. Starta din server med `npm run dev` och gå till `http://localhost:3000/error` i din webbläsare. Du bör nu se ett felmeddelande i konsolen och ett meddelande som säger "Något gick fel!" i webbläsaren.

### 404 fel

Nu när vi har lagt till en felhanterare så ska vi också lägga till en 404 felhanterare. Detta är bra för att kunna se om användaren försöker komma åt en sida som inte finns. Vi kommer att använda `express` inbyggda 404 felhanterare för att hantera 404 fel.
Lägg till följande kod i slutet av din `server.js` fil:
```javascript
app.use((req, res, next) => {
    res.status(404).send('Sidan hittades inte!')
})
```
Denna middleware kommer att skicka tillbaka ett felmeddelande till klienten med statuskod 404 (Not Found) om användaren försöker komma åt en sida som inte finns. Detta är bra för att kunna se om användaren försöker komma åt en sida som inte finns.
Nu när vi har lagt till en 404 felhanterare så kan vi testa den genom att gå till en sida som inte finns, t.ex. `http://localhost:3000/unknown`. Du bör nu se ett meddelande som säger "Sidan hittades inte!" i webbläsaren.

#### Övning

Istället för att skicka tillbaka ett felmeddelande så kan vi skicka tillbaka en vy som visar ett felmeddelande. Skapa en ny vy i `views` mappen med namnet `404.njk` och lägg till ett meddelande till användaren. Du kan med fördel fortfarande använda `layout.njk` filen för att sidorna ska använda din skapade layout.  Du behöver sedan ändra koden i `server.js` så att `res.render` används istället för `res.send`.

Om du vill så kan du göra samma för 500 felmeddelandet.

## Sammanfattning

Nu har den en grund för att kunna arbeta med eventuella fel som uppstår i din kod. Du bör få bättre information om vad som sker i terminalen och du kan också se om användaren försöker komma åt en sida som inte finns. Vi hanterar också fel på ett sätt som gör att användaren får en bättre upplevelse.