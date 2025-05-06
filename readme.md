# Webbserverprogrammering med Node.js och Express.js

Det här är en testapplikaton för att visa och förklara grunderna i webbserverprogrammering. Vi kommer att använda node.js och Express.js för att bygga en enkel webbserver som kan hantera olika typer av HTTP-förfrågningar. 

Vi kommer att använda glitch för att köra vår server i molnet så att den är tillgänglig för alla.

## Vad vi kommer att bygga

Applikationen vi skapar kommer att innehålla en struktur för en vanlig hemsida med navigation, hem, om och kontakt.
Med det på plats så kommer vi att skapa grunden för att visa och hantera en resurs, detta som ett sätt att visa hur vi bygger en applikation enligt REST-principer. Vi kommer att skapa en resurs som representerar en karaktär i ett spel. Denna resurs kommer att innehålla information om karaktären, såsom namn, klass och nivå. Vi kommer också att skapa en vy för att visa information om karaktären och en vy för att skapa en ny karaktär.

### Varför detta?

Genom att bygga applikationen kommer vi se hur vi skapar http router och hanterar olika typer av HTTP-förfrågningar. 

Eftersom vi kommer att låta användaren välja olika vägar genom spelet så kommer vi också att behöva hantera inmatning från användaren. Vi kommer att använda formulär för att låta användaren göra sina val. Det skapar i sin tur ett behov av att hantera tvätta och validera inmatning från användaren.

## Innehållsförteckning

1. [Installation och setup](docs/installation-och-setup.md)
2. [HTML-templater och CSS](docs/html-templater-och-css.md)
3. [Routing och hantering av HTTP-förfrågningar](docs/routing-och-requests.md)
4. [Logger och felmeddelanden](docs/logger-och-felmeddelanden.md)
5. [En resurs enligt REST-principer](docs/en-resurs-enligt-rest-principer.md)

## Fel i koden

Det är oundvikligt att det inte förekommer fel i koden eller att något har ändrats. Se det som en del av lärandet. Du behöver felsöka och hitta lösningar på problemen. Det är en viktig del av programmering och utveckling.
Det betyder inte att du inte får be om hjälp, men försök först genom att läsa felmeddelanden och koden där det uppstår problem.

### Tips

Ett flödesschema för hur du kan felsöka problem:

1. Min kod fungerar inte - Undersök i terminalen, utvecklarverktygen eller i VSCode.
2. Får du ett felmeddelande?
   - Ja: Läs felmeddelandet och kolla i koden där det uppstår problem
        - Vad är det för felmeddelande?
            1. Syntaxfel - Har du glömt att stänga en klammerparentes eller ett citattecken? Sök efter röda squigglylinjer i koden.
            2. Typfel - Har du använt en variabel som inte är definierad? Kolla att du har skrivit rätt namn på variabeln.
            3. Referensfel - Har du försökt att använda en funktion som inte är definierad? Kolla att du har skrivit rätt namn på funktionen.
            4. Logiska fel - Har du skrivit koden på rätt sätt? Kolla att du har skrivit rätt kod för det du vill göra.
            5. Fel i servern - Har du glömt att starta servern? Kolla att du har kört kommandot `npm run dev` i terminalen. Har servern startat om eller kraschat?
                - Här är kan det vara att du har missat att installera ett paket. Felmeddelandet kan vara något i stil med `Cannot find module 'express'`. Det betyder att du inte har installerat express-paketet. Du kan installera det genom att köra kommandot `npm install express` i terminalen.
   - Nej: Kolla om du har glömt att starta servern
        - Kontrollera i terminalen och läs vad som skett, det är med stor sannolikhet ett felmeddelande som kan ge dig en ledtråd om vad som har hänt.


