New Yorker - Test API Client
============================

Der "Test API Client" ist eine WebApplication welche die [New Yorker Test API](https://appdev.newyorker.de/newyorkerapitest) verwendet, um Informationen über die angemeldeten Benuter darzstellen.

## Web-app

Bei der WebApp handelt es sich um eine SinglePageApplication (SPA), die mit (Aurelia)[http://aurelia.io/]  erstellet wurde. Folgende Framworks / Libraries werden verwendet:

 * __[Aurelia](http://aurelia.io/)__: Basis-SPA-Framework
 * __[Bulma](http://bulma.io/)__: CSS-Framework basierend aub Flexbox
 * __[Font Awesome](http://fontawesome.io/)__: CSS-Framework für Icons
 * __[C3.js](http://c3js.org/)__: eien auf [D3.js](https://d3js.org/) basierende Library zum Erstellen von Diagrammen


### Starten der Anwendung

Zum starten der Entwicklungsugebung wird das Aurelia CLI (Command Line Interface) verwendet. Diese setzt vorroaus das Node.js und ein Git Client installiert sind. 
Anschließend kann Aurelia CLI mit dem folgenden Beefehl installiert werden:

```sh
npm install aurelia-cli -g
``` 

Nun müssen die Projekt-Dependencies mit npm installiert werden:

```sh
npm install
``` 

Jetzt kann das die Entwicklungsugebung gestartet werden:

```sh
au run --watch
``` 

Auf [http://localhost:9000](http://localhost:9000) ist die WebApp verfügbar.

