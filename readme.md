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