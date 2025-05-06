# Wsp1

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

## ESM modul

Vi kommer att skriva vår kod i ESM-moduler. Detta innebär att vi kommer att använda `import` och `export` istället för `require` och `module.exports`. För att kunna använda ESM-moduler i node.js så måste vi ange `"type": "module"` i vår `package.json` fil. Lägg till följande rad i din `package.json` fil:

```json
"type": "module"
```

Detta kommer att göra att node.js kommer att behandla alla `.js` filer i ditt projekt som ESM-moduler. Du kan nu använda `import` och `export` i din kod.

Anledningen till att vi använder ESM-moduler är att det är en nyare standard för att skriva JavaScript-kod. 

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

Denna kod skapar en enkel webbserver som lyssnar på port 3000 (eller den port som anges i miljövariabeln `PORT`). När användaren går till roten av webbplatsen (`/`) så kommer servern att svara med texten "Hello World!".

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


