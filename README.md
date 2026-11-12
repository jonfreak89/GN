# Game Night 🌙

Quizavond in je eigen woonkamer. De TV toont het spel, iedereen speelt mee op zijn eigen telefoon (Android en iPhone). Gratis, geen app, geen eigen server.

## Spelen

1. Open `tv.html` op de TV (browser van de TV, of cast een Chrome-tabblad naar Chromecast / Google TV).
2. Iedereen scant de QR-code of tikt de code van 4 letters in op `play.html`.
3. Wie als eerste binnen is, wordt spelleider 👑 en kiest spice level, lengte en start.

Telefoon op slot of pagina herladen? Je komt vanzelf terug op je plek, met je punten. Crasht de TV, herlaad dan gewoon: het spel staat gepauzeerd klaar en de telefoons verbinden opnieuw.

## Online zetten (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save.
Na een minuutje staat het op `https://jonfreak89.github.io/GN/`.

## Rondes

| Ronde | Hoe het werkt |
|---|---|
| Meerkeuze | Iedereen kiest tegelijk, snelheid telt niet |
| Schatten & Wedden | Getal schatten, daarna wedden op de schatting die het dichtst zit |
| Bluffen | Verzin een nep-antwoord, zoek het echte, scoor op wie je erin luist |
| Op volgorde | Vier dingen in de juiste volgorde zetten |
| Hoe goed ken je elkaar? | Hete stoel, "Wie van ons…" en anonieme gênante enquêtes |
| Finale | Zet in wat je durft op één laatste vraag |

Extra's: de laatste plaats kiest de categorie, power-ups (Dubbel, 50/50, Stelen, Sabotage, Schild), troost-power-up voor de laatste na elke ronde, awards aan het eind, anonieme overslaan-knop bij 18+ vragen.

**Spice levels:** 😇 Braaf (kennis en rare weetjes) · 😈 Pittig (+ donkere humor) · 🌶️ Stout (+ 18+).

**Nooit dezelfde vragen:** de TV onthoudt welke vragen al geweest zijn en herhaalt pas als een categorie op is. Schatten, volgorde en hoofdsteden worden ook gegenereerd uit datatabellen (duizenden combinaties).

## Vragen toevoegen

Alle vragen staan in `data/`. Een vraag toevoegen = één regel erbij:

```js
GN.addQuestions('dieren', [
  { type: 'mc', q: 'Vraag?', a: ['GOED', 'fout', 'fout', 'fout'], fact: 'optionele uitleg' },
  { type: 'num', q: 'Hoeveel…?', answer: 42, unit: 'km' },
  { type: 'bluff', q: 'Iets met een ___ erin.', answer: 'waarheid', decoys: ['nep 1', 'nep 2', 'nep 3'] },
  { type: 'order', q: 'Zet op…', lo: 'Kleinste', hi: 'Grootste', items: [['A', 1], ['B', 2], ['C', 3], ['D', 4]] },
]);
```

Persoonlijke vragen staan in `data/persoonlijk.js`.

## Testen in één browser

`tv.html?local=1` en daarna een paar tabbladen met `play.html?c=CODE&local=1`. Dan gaat alles via de browser zelf, zonder internet.

## Techniek

Losse HTML/JS, geen build-stap. Verbinding via [PeerJS](https://peerjs.com) (WebRTC, gratis publieke server). De TV is de host en draait de spelregels (`js/engine.js`); telefoons krijgen alleen hun eigen scherm doorgestuurd.
