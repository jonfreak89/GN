# Game Night 🌙

Quizavond in je eigen woonkamer. De TV toont het spel, iedereen speelt mee op zijn eigen telefoon (Android en iPhone). Gratis, geen app, geen eigen server.

## Spelen

1. Open `tv.html` op de TV (browser van de TV, of cast een Chrome-tabblad naar Chromecast / Google TV).
2. Iedereen scant de QR-code of tikt de code van 4 letters in op `play.html`.
3. Wie als eerste binnen is, wordt spelleider 👑 en kiest spice level, lengte en start.

Telefoon op slot of pagina herladen? Je komt vanzelf terug op je plek, met je punten. Crasht de TV, herlaad dan gewoon: het spel staat gepauzeerd klaar en de telefoons verbinden opnieuw.

## De show

- **Joep de Maan** presenteert: hij verwelkomt spelers, kondigt rondes aan, plaagt wie te lang nadenkt en reageert op de uitslag.
- **Muziek en geluid** worden in de browser zelf gemaakt (niets te downloaden): loungemuziek in de lobby, spanning tijdens vragen, tromgeroffel bij de onthulling, applaus aan het eind. Browsers willen eerst één klik of toets op de TV voordat er geluid mag.
- **Spannende onthullingen:** tromgeroffel, eerst valt het foute weg, dan licht het goede antwoord op, met confetti. In de tussenstand zie je spelers elkaar inhalen.
- **Uitleg per ronde:** de eerste keer dat een ronde langskomt, staat op TV en telefoon in drie stappen hoe het werkt.
- **Terugblik:** aan het eind de beste bluf, het mooiste kunstwerk, de beste verhaalzin en meer, daarna de winnaar.
- **Wachten op je telefoon:** een weetje, noppenfolie om te knappen of je eigen statistieken.
- **Bediening voor de spelleider** (👑 Bediening): pauze, volgende stap, +15 seconden, vraag of ronde overslaan, muziek, effecten, voorlezen en grote tekst aan of uit.

## Online zetten (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save.
Na een minuutje staat het op `https://jonfreak89.github.io/GN/`.

## Rondes

| Ronde | Hoe het werkt |
|---|---|
| Meerkeuze | Iedereen kiest tegelijk, snelheid telt niet |
| Waar of nep? | Klopt de stelling of is het onzin? Snelle ronde |
| Schatten & Wedden | Getal schatten, daarna wedden op de schatting die het dichtst zit |
| Bluffen | Verzin een nep-antwoord, zoek het echte, scoor op wie je erin luist |
| Op volgorde | Vier dingen in de juiste volgorde zetten |
| Hoe goed ken je elkaar? | Hete stoel, "Wie van ons…" en anonieme gênante enquêtes |
| Wie zei dit? | Iedereen schrijft anoniem een antwoord, daarna raad je wie wat schreef |
| Hoger of lager | Is het volgende getal hoger of lager? Hoe langer je goed zit, hoe meer punten |
| Lingo | Raad het woord van vijf letters op je eigen telefoon, met toetsenbord |
| De Puzzel | Twaalf woorden, drie verbanden van vier (zoals in De Slimste Mens) |
| Teken & Raad | Teken je geheime opdracht, verzin nep-titels, zoek de echte |
| Twee waarheden en een leugen | Schrijf drie dingen over jezelf, de rest zoekt de leugen |
| Top 5 | De hete stoel zet vijf dingen op volgorde, de rest raadt het lijstje |
| Echt of verzonnen? | Het begin van een waargebeurd verhaal: verzin hoe het afliep en zoek het echte einde |
| Invulverhaal | Vul woorden in zonder te weten waar het over gaat, de TV leest het verhaal voor. Stem op het grappigste woord |
| Verhalenketting | Iedereen schrijft om de beurt een zin en ziet alleen de vorige. Daarna voorlezen en stemmen op de beste zin |
| Finale | Zet in wat je durft op één laatste vraag |

Extra's: de laatste plaats kiest de categorie, power-ups (Dubbel, 50/50, Stelen, Sabotage, Schild), troost-power-up voor de laatste na elke ronde, awards aan het eind, anonieme overslaan-knop bij 18+ vragen.

**Teams:** ieder voor zich, 2 of 3 teams (Patat, Tulp, Kaas). Spelers kiezen hun team op hun telefoon of de spelleider husselt. Kleinere teams krijgen een eerlijke bonus. De spelleider kan ook per ronde kiezen of die meedoet. Kort = 6 rondes, normaal = 8, lang = 11; staan er meer rondes aan, dan kiest het spel er willekeurig een mix uit.

**Ganzenbord:** kies als spelvorm *Ganzenbord* in plaats van *Quizshow*. Dan speel je korte rondes (kort 8, normaal 12, lang 16) en na elke ronde gooit iedereen op zijn telefoon de dobbelsteen. De beste drie van de ronde krijgen 3, 2 of 1 bonusstap. Met ganzen, brug, herberg, put, doolhof, gevangenis, dood, kansvakjes en sterren (power-up). Wie precies op 40 komt, wint.

**Thema-avonden:** 🧙 Nerd-avond (fantasy, sci-fi, superhelden, games, film, wetenschap) of 📼 Jaren 80 & 90 (jaren, kinder-tv, reclames, muziek, games, film). Het thema verandert ook de look op TV en telefoon.

**Spice levels:** 😇 Braaf (kennis en rare weetjes) · 😈 Pittig (+ donkere humor) · 🌶️ Stout (+ 18+).

**41 categorieën**, van Kennis (o.a. Nederland, geschiedenis, kunst & cultuur, merken & bedrijven, reizen) en Nerd (fantasy, sci-fi, superhelden) tot Nostalgie, Grappig & raar (o.a. domme criminelen, bier & kroeg), Donker (o.a. onopgeloste mysteries, oorlog & spionage), Pittig (kater & feestjes) en Stout (o.a. stoute geschiedenis). Samen zo'n 1.770 vaste vragen, plus gegenereerde.

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

Persoonlijke vragen staan in `data/persoonlijk.js`. Invulverhalen, openingszinnen en waargebeurde verhalen staan in `data/verhalen.js`.

Tip: zet bij de verhalenrondes *TV leest vragen voor* aan, dan worden de verhalen hardop voorgelezen.

## Testen in één browser

`tv.html?local=1` en daarna een paar tabbladen met `play.html?c=CODE&local=1`. Dan gaat alles via de browser zelf, zonder internet.

## Techniek

Losse HTML/JS, geen build-stap. Verbinding via [PeerJS](https://peerjs.com) (WebRTC, gratis publieke server). De TV is de host en draait de spelregels (`js/engine.js`); telefoons krijgen alleen hun eigen scherm doorgestuurd.
