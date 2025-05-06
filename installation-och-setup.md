# Installation och setup

## Installation

Börja med att skapa en mapp och initiera ett nytt node.js projekt i den mappen. Du kan göra detta genom att köra följande kommandon i terminalen:

```bash
mkdir my-adventure-game
cd my-adventure-game
npm init -y
```
Detta kommer att skapa en ny mapp med namnet `my-adventure-game` och initiera ett nytt node.js projekt i den mappen. Du kommer att få en `package.json` fil som innehåller information om ditt projekt.

### Node paket

För att kunna använda Express.js i vårt projekt så måste vi installera det. Vi kommer också att installera `nodemon` som är ett verktyg som automatiskt startar om vår server när vi gör ändringar i koden. Detta gör det enklare att utveckla och testa vår applikation.
Kör följande kommando i terminalen för att installera Express.js och nodemon:

```bash
npm install express
npm install --save-dev nodemon
```

Detta kommer att installera Express.js och nodemon och lägga till dem i din `package.json` fil. Du kommer också att se en ny mapp som heter `node_modules` i din projektmapp. Denna mapp innehåller alla de paket som du har installerat.

Anledningen till att vi installerar paket med node.js är att när vi sedan laddar ned koden från git så kommer vi att kunna köra `npm install` och då kommer alla de paket som vi har installerat att laddas ned automatiskt (kommandot läser `package.json` filen och laddar ned alla de paket som är listade där). Detta gör det enklare att dela koden med andra och att köra den på olika datorer.

## Anvädningen av ESM

ESM är ett modulformat som gör det möjligt att använda `import` och `export` i JavaScript. Det är en nyare standard för att skriva JavaScript-kod.

För att använda ESM i ditt projekt så måste du ange det i din `package.json` fil. Öppna `package.json` filen och lägg till följande rad:

```json
"type": "module"
```

### Varför använder vi ESM?

* **Standardisering:** ESM är den officiella standarden för moduler i JavaScript.
* **Förbättrad syntax:** import och export är mer intuitiva och läsbara.
* **Framtidssäker:** ESM är framtiden för JavaScript-moduler och stöds av moderna JavaScript-motorer.


### .gitignore för att ignorera node_modules

Eftersom vi inte vill att `node_modules` mappen ska laddas upp till git så måste vi skapa en `.gitignore` fil. Skapa en ny fil med namnet `.gitignore` i din projektmapp och lägg till följande rad i den:

```
node_modules
```
Detta kommer att se till att `node_modules` mappen ignoreras av git och inte laddas upp till ditt git-repo.

## server.js och starta det med nodemon

Skapa en ny fil med namnet `server.js` i din projektmapp. Denna fil kommer att innehålla koden för vår webbserver.
Lägg till följande kod i `server.js` filen:

```javascript
import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
```

Denna kod skapar en enkel webbserver som lyssnar på port 3000 (eller den port som anges i miljövariabeln `PORT`). När användaren går till roten av webbplatsen (`/`) så kommer servern att svara med texten "Hello World!", detta för att vi skapar en route för att hantera GET-förfrågningar till `/`.

För att köra servern så kommer vi att skapa ett start script i vår `package.json` fil. Lägg till följande rad i din `package.json` fil:

```json
"scripts": {
    "dev": "nodemon server.js"
}
```

Vi kan sedan starta servern genom att köra följande kommando i terminalen:

```bash
npm run dev
```

## Förbered för att köra detta med glitch

För att kunna köar projektet med glitch så är det viktigt att vi har ett start script och att vi anger en version av node.js i vår `package.json` fil. 

Lägg till följande kod i din `package.json` fil:
```json
"engines": {
    "node": "18.x"
},
"scripts": {
    "start": "node server.js"
}
```

Vi kommer att återkomma till detta senare när vi ska köra projektet med glitch.

## Testa att allt fungerar

Det är viktigt att du hela tiden har din testserver igång så att du kan se att allt fungerar. När du arbetar med servern lokalt för utveckling så använder du `npm run dev` för att starta servern.

Om något strular så finns det flera vägar att hitta vad som är fel. Du kan alltid kolla i terminalen där du kör servern för att se om det finns några felmeddelanden. Du kan också kolla i webbläsarens utvecklarverktyg för att se om det finns några felmeddelanden där.

Slutligen så bör Visual Studio Code ge dig en del hjälp med att hitta fel i koden. Leta efter squigglar eller röda linjer i koden. Om du ser något sådant så kan du förutsätta att din kod innehåller fel av något slag och kommer således inte att fungera.

## Sammanfattning

Vi har nu installerat node.js och Express.js och skapat en enkel webbserver som kan hantera GET-förfrågningar. Det är en grund som du kommer att upprepa i de flesta projekt du skapar i framtiden men också något som du kommer kunna bygga vidare på.

Vill du titta på koden för det här steget så kan du komma åt den med länken till denna commit, [installation och setup](https://github.com/jensadev/wsp1-base-glitch/tree/76bbeb67be825aba2c85c93d22f11374ea80e957)