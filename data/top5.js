/* Top 5: de hete stoel zet vijf dingen op volgorde, de rest raadt die volgorde.
   {naam} wordt vervangen door de naam van de speler op de hete stoel.
   lo = bovenaan (plek 1), hi = onderaan (plek 5). */

GN.TOP5 = [
  // 😇 braaf
  { q: 'Welk klusje vindt {naam} het ergst?', self: 'Welk klusje vind jij het ergst?', items: ['Afwassen', 'Stofzuigen', 'Wc schoonmaken', 'Strijken', 'Vuilniszak buiten zetten'], lo: 'Het ergst', hi: 'Valt mee' },
  { q: 'Wat eet {naam} het liefst?', self: 'Wat eet jij het liefst?', items: ['Pizza', 'Sushi', 'Patat met frikandel', 'Stamppot', 'Shoarma'], lo: 'Favoriet', hi: 'Hoeft niet' },
  { q: 'Waar gaat {naam} het liefst op vakantie?', self: 'Waar ga jij het liefst op vakantie?', items: ['Strand in Spanje', 'Skiën in Oostenrijk', 'Stedentrip', 'Camping in Frankrijk', 'Thuisblijven op de bank'], lo: 'Liefst', hi: 'Nooit' },
  { q: 'Welk dier vindt {naam} het engst?', self: 'Welk dier vind jij het engst?', items: ['Spin', 'Slang', 'Rat', 'Kwal', 'Duif'], lo: 'Het engst', hi: 'Prima' },
  { q: 'Waar wordt {naam} het chagrijnigst van?', self: 'Waar word jij het chagrijnigst van?', items: ['File', 'Honger', 'Te weinig slaap', 'Trage wifi', 'Mensen die smakken'], lo: 'Het ergst', hi: 'Kan ermee leven' },
  { q: 'Welke snack kiest {naam} het eerst?', self: 'Welke snack kies jij het eerst?', items: ['Frikandel', 'Kroket', 'Bitterballen', 'Kaassoufflé', 'Kipcorn'], lo: 'Eerste keus', hi: 'Laatste keus' },
  { q: 'Waar kan {naam} het minst zonder?', self: 'Waar kun jij het minst zonder?', items: ['Telefoon', 'Koffie', 'Bed', 'Muziek', 'Netflix'], lo: 'Onmisbaar', hi: 'Kan best zonder' },
  { q: 'Wat zou {naam} het liefst kunnen?', self: 'Wat zou jij het liefst kunnen?', items: ['Vliegen', 'Onzichtbaar worden', 'Gedachten lezen', 'Tijdreizen', 'Teleporteren'], lo: 'Liefst', hi: 'Hoeft niet' },
  { q: 'Welk seizoen vindt {naam} het fijnst?', self: 'Welk seizoen vind jij het fijnst?', items: ['Lente', 'Zomer', 'Herfst', 'Winter', 'De week rond Kerst'], lo: 'Het fijnst', hi: 'Bah' },
  { q: 'Welk feest vindt {naam} het leukst?', self: 'Welk feest vind jij het leukst?', items: ['Carnaval', 'Koningsdag', 'Oud en nieuw', 'Kerst', 'Je eigen verjaardag'], lo: 'Het leukst', hi: 'Mag overgeslagen' },
  { q: 'Welke sport kijkt {naam} het liefst?', self: 'Welke sport kijk jij het liefst?', items: ['Voetbal', 'Formule 1', 'Darts', 'Schaatsen', 'Wielrennen'], lo: 'Liefst', hi: 'Zapt weg' },
  { q: 'Waar geeft {naam} het meeste geld aan uit?', self: 'Waar geef jij het meeste geld aan uit?', items: ['Eten en drinken', 'Kleding', 'Uitgaan', 'Gadgets en games', 'Reizen'], lo: 'Het meest', hi: 'Het minst' },
  { q: 'Welke nerd-reeks vindt {naam} het best?', self: 'Welke reeks vind jij het best?', items: ['Star Wars', 'Harry Potter', 'In de ban van de ring', 'Marvel', 'Game of Thrones'], lo: 'Het best', hi: 'Niks aan' },
  { q: 'Welk jaren 90-ding mist {naam} het meest?', self: 'Welk jaren 90-ding mis jij het meest?', items: ['Tamagotchi', 'Flippo\'s', 'Gameboy', 'MSN Messenger', 'Discman'], lo: 'Mis ik het meest', hi: 'Mag weg blijven' },
  // 😈 pittig
  { q: 'Wie van deze mensen zou {naam} als eerste ontvrienden?', self: 'Wie zou jij als eerste ontvrienden?', items: ['De collega die altijd te laat is', 'De buurman met de bladblazer', 'Je ex', 'Iemand die spoilers verklapt', 'De vriend die nooit terugbetaalt'], lo: 'Als eerste weg', hi: 'Mag blijven', spice: 2 },
  { q: 'Hoe zou {naam} het liefst doodgaan?', self: 'Hoe zou jij het liefst doodgaan?', items: ['In je slaap', 'Tijdens het feesten', 'Door een meteoriet', 'Op de wc', 'Lachend om je eigen grap'], lo: 'Liefst', hi: 'Echt niet', spice: 2 },
  { q: 'Waar zou {naam} het eerst over liegen?', self: 'Waar zou jij het eerst over liegen?', items: ['Je leeftijd', 'Je gewicht', 'Je salaris', 'Hoeveel je gedronken hebt', 'Waarom je te laat bent'], lo: 'Liegt het eerst', hi: 'Altijd eerlijk', spice: 2 },
  { q: 'Wat vindt {naam} het ergste op een verjaardag?', self: 'Wat vind jij het ergste op een verjaardag?', items: ['De kring', 'Iedereen een hand geven', 'Gesprekken over hypotheken', 'Geen bier in huis', 'Oom die politiek begint'], lo: 'Het ergst', hi: 'Valt mee', spice: 2 },
  { q: 'Welke zonde past het best bij {naam}?', self: 'Welke zonde past het best bij jou?', items: ['Gulzigheid', 'Luiheid', 'Hoogmoed', 'Jaloezie', 'Woede'], lo: 'Dat ben ik', hi: 'Ik niet', spice: 2 },
  { q: 'Wat zou {naam} doen met een gestolen miljoen?', self: 'Wat zou jij doen met een gestolen miljoen?', items: ['Vluchten naar een eiland', 'Gewoon uitgeven', 'Begraven in de tuin', 'Teruggeven', 'Opbiechten op Instagram'], lo: 'Doet het meteen', hi: 'Nooit', spice: 2 },
  { q: 'Welke brakke kater-remedie zweert {naam} bij?', self: 'Welke katerremedie gebruik jij het liefst?', items: ['Vet eten', 'Gewoon doordrinken', 'Slapen tot 3 uur', 'Paracetamol en water', 'Een frisse wandeling'], lo: 'Werkt het best', hi: 'Onzin', spice: 2 },
  // 🌶️ stout
  { q: 'Wat vindt {naam} het spannendst in bed?', self: 'Wat vind jij het spannendst in bed?', items: ['Blinddoek', 'Rollenspel', 'Op een rare plek', 'Vastbinden', 'Gewoon het licht aan'], lo: 'Het spannendst', hi: 'Hoeft niet', spice: 3 },
  { q: 'Wat is voor {naam} de grootste afknapper bij een date?', self: 'Wat is voor jou de grootste afknapper?', items: ['Slechte adem', 'Over de ex praten', 'Onbeleefd tegen de ober', 'Telefoon op tafel', 'Laten betalen en wegrennen'], lo: 'Grootste afknapper', hi: 'Kan ik hebben', spice: 3 },
  { q: 'Waar zou {naam} het liefst een vluggertje doen?', self: 'Waar zou jij het liefst een vluggertje doen?', items: ['In de auto', 'In een kleedhokje', 'Op het werk', 'Op het strand', 'In het vliegtuig'], lo: 'Liefst', hi: 'Echt niet', spice: 3 },
  { q: 'Wat zou {naam} het eerst verbergen als de schoonouders langskomen?', self: 'Wat verberg jij het eerst als de schoonouders langskomen?', items: ['Het speeltje in het nachtkastje', 'De zoekgeschiedenis', 'De lege flessen', 'De vuile was', 'De foto\'s van vorig weekend'], lo: 'Als eerste weg', hi: 'Mag blijven liggen', spice: 3 },
  { q: 'Wat vindt {naam} het sexyst aan iemand?', self: 'Wat vind jij het sexyst aan iemand?', items: ['Humor', 'Ogen', 'Billen', 'Stem', 'Zelfvertrouwen'], lo: 'Het sexyst', hi: 'Maakt niet uit', spice: 3 },
];
