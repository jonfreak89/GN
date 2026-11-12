/* De Puzzel (naar De Slimste Mens): twaalf woorden, drie verbanden van vier.
   Er zitten bewust strikvragen in (een woord dat bij twee groepen lijkt te passen),
   maar er is altijd maar één oplossing waarbij alle drie de groepen kloppen. */
GN.PUZZELS = [
  { id: 'p1', groups: [
    { name: 'Kaassoorten', words: ['Gouda', 'Brie', 'Feta', 'Camembert'] },
    { name: 'Dansen', words: ['Tango', 'Salsa', 'Wals', 'Samba'] },
    { name: 'Sauzen', words: ['Pesto', 'Mayonaise', 'Ketchup', 'Aioli'] },
  ] },
  { id: 'p2', groups: [
    { name: 'Sterrenbeelden', words: ['Ram', 'Stier', 'Kreeft', 'Vissen'] },
    { name: 'Schaakstukken', words: ['Koning', 'Dame', 'Toren', 'Loper'] },
    { name: 'Speelkaarten', words: ['Aas', 'Heer', 'Boer', 'Vrouw'] },
  ] },
  { id: 'p3', groups: [
    { name: 'Huizen van Zweinstein', words: ['Griffoendor', 'Huffelpuf', 'Ravenklauw', 'Zwadderich'] },
    { name: 'In de ban van de ring', words: ['Frodo', 'Gandalf', 'Aragorn', 'Gollum'] },
    { name: 'Star Wars', words: ['Yoda', 'Chewbacca', 'Leia', 'Vader'] },
  ] },
  { id: 'p4', groups: [
    { name: '… + bal', words: ['Voet', 'Hand', 'Sneeuw', 'Gehakt'] },
    { name: '… + huis', words: ['Zieken', 'Gemeente', 'Pak', 'Poppen'] },
    { name: '… + vis', words: ['Goud', 'Zwaard', 'Inkt', 'Kogel'] },
  ] },
  { id: 'p5', groups: [
    { name: 'Waddeneilanden', words: ['Texel', 'Ameland', 'Vlieland', 'Terschelling'] },
    { name: 'Griekse eilanden', words: ['Kreta', 'Rhodos', 'Corfu', 'Santorini'] },
    { name: 'Spaanse eilanden', words: ['Ibiza', 'Mallorca', 'Tenerife', 'Lanzarote'] },
  ] },
  { id: 'p6', groups: [
    { name: 'Rivieren in Nederland', words: ['Rijn', 'Maas', 'Waal', 'IJssel'] },
    { name: 'Meisjesnamen', words: ['Emma', 'Julia', 'Sophie', 'Tess'] },
    { name: 'Biermerken', words: ['Grolsch', 'Bavaria', 'Amstel', 'Hertog Jan'] },
  ] },
  { id: 'p7', groups: [
    { name: '… + kool', words: ['Rode', 'Spits', 'Bloem', 'Boeren'] },
    { name: '… + brood', words: ['Rogge', 'Krenten', 'Stok', 'Mais'] },
    { name: '… + taart', words: ['Appel', 'Kwark', 'Bruids', 'Verjaardags'] },
  ] },
  { id: 'p8', groups: [
    { name: 'Planeten', words: ['Venus', 'Saturnus', 'Jupiter', 'Mercurius'] },
    { name: 'Chocoladerepen', words: ['Mars', 'Snickers', 'Twix', 'Bounty'] },
    { name: 'Wasmiddelen', words: ['Ariel', 'Omo', 'Robijn', 'Persil'] },
  ] },
  { id: 'p9', groups: [
    { name: 'Sinterklaas', words: ['Piet', 'Mijter', 'Staf', 'Amerigo'] },
    { name: 'Kerst', words: ['Kerstboom', 'Kribbe', 'Engel', 'Piek'] },
    { name: 'Pasen', words: ['Ei', 'Haas', 'Kuiken', 'Paasvuur'] },
  ] },
  { id: 'p10', groups: [
    { name: 'Nederlandse schilders', words: ['Rembrandt', 'Vermeer', 'Van Gogh', 'Mondriaan'] },
    { name: 'Nederlandse voetballers', words: ['Cruijff', 'Van Basten', 'Gullit', 'Bergkamp'] },
    { name: 'Nederlandse zangers', words: ['Borsato', 'Meeuwis', 'Bauer', 'Joling'] },
  ] },
  { id: 'p11', groups: [
    { name: 'Vogels', words: ['Mus', 'Merel', 'Kraai', 'Uil'] },
    { name: 'Bomen', words: ['Eik', 'Beuk', 'Berk', 'Wilg'] },
    { name: 'Vissen', words: ['Zalm', 'Haring', 'Kabeljauw', 'Paling'] },
  ] },
  { id: 'p12', groups: [
    { name: '… + steen', words: ['Bak', 'Edel', 'Zand', 'Hoek'] },
    { name: '… + stoel', words: ['Rol', 'Schommel', 'Strand', 'Lig'] },
    { name: '… + lamp', words: ['Zak', 'Gloei', 'Lava', 'Spaar'] },
  ] },
  { id: 'p13', groups: [
    { name: 'Talen', words: ['Duits', 'Engels', 'Spaans', 'Grieks'] },
    { name: 'Jongensnamen', words: ['Frans', 'Daan', 'Bram', 'Thomas'] },
    { name: 'Munteenheden', words: ['Euro', 'Dollar', 'Yen', 'Pond'] },
  ] },
  { id: 'p14', groups: [
    { name: 'Balsporten', words: ['Tennis', 'Squash', 'Hockey', 'Rugby'] },
    { name: 'Watersporten', words: ['Zeilen', 'Roeien', 'Surfen', 'Kanoën'] },
    { name: 'Automodellen', words: ['Polo', 'Fiesta', 'Corsa', 'Clio'] },
  ] },
  { id: 'p15', groups: [
    { name: 'Kaartspellen', words: ['Klaverjassen', 'Pesten', 'Poker', 'Bridge'] },
    { name: 'Bordspellen', words: ['Monopoly', 'Risk', 'Cluedo', 'Scrabble'] },
    { name: 'Gokken', words: ['Roulette', 'Bingo', 'Lotto', 'Gokkast'] },
  ] },
  { id: 'p16', groups: [
    { name: 'Efteling-attracties', words: ['Python', 'Baron 1898', 'Joris en de Draak', 'Droomvlucht'] },
    { name: 'Slangen', words: ['Cobra', 'Adder', 'Mamba', 'Boa'] },
    { name: 'Programmeertalen', words: ['Java', 'Ruby', 'Swift', 'Rust'] },
  ] },
  { id: 'p17', groups: [
    { name: '… + markt', words: ['Vis', 'Vlooien', 'Kerst', 'Zwarte'] },
    { name: '… + kast', words: ['Kleding', 'Boeken', 'Glazen', 'Hang'] },
    { name: '… + vogel', words: ['Zang', 'Roof', 'Trek', 'Spot'] },
  ] },
  { id: 'p18', groups: [
    { name: 'Weer', words: ['Hagel', 'Mist', 'Storm', 'IJzel'] },
    { name: 'Muziekstijlen', words: ['House', 'Jazz', 'Rock', 'Blues'] },
    { name: 'Kleding', words: ['Trui', 'Broek', 'Jas', 'Sjaal'] },
  ] },
  { id: 'p19', groups: [
    { name: 'Lichaamsdelen', words: ['Knie', 'Kuit', 'Elleboog', 'Hiel'] },
    { name: 'Vissen', words: ['Baars', 'Snoek', 'Schol', 'Tong'] },
    { name: 'Gereedschap', words: ['Hamer', 'Zaag', 'Tang', 'Boor'] },
  ] },
  { id: 'p20', groups: [
    { name: 'Disneyfiguren', words: ['Simba', 'Nemo', 'Olaf', 'Stitch'] },
    { name: 'Hondenrassen', words: ['Poedel', 'Tekkel', 'Husky', 'Mopshond'] },
    { name: 'Uit de boekjes van Nijntje', words: ['Nijntje', 'Snuffie', 'Boris', 'Pluis'] },
  ] },
  { id: 'p21', groups: [
    { name: 'Griekse letters', words: ['Alfa', 'Bèta', 'Gamma', 'Delta'] },
    { name: 'NAVO-alfabet', words: ['Bravo', 'Charlie', 'Tango', 'Whiskey'] },
    { name: 'Cocktails', words: ['Mojito', 'Margarita', 'Daiquiri', 'Cosmopolitan'] },
  ] },
  { id: 'p22', groups: [
    { name: 'Hoofdsteden', words: ['Oslo', 'Wenen', 'Praag', 'Dublin'] },
    { name: 'Automerken uit Japan', words: ['Toyota', 'Honda', 'Mazda', 'Subaru'] },
    { name: 'Merken van gitaren', words: ['Fender', 'Gibson', 'Ibanez', 'Yamaha'] },
  ] },
  { id: 'p23', groups: [
    { name: 'Pokémon', words: ['Pikachu', 'Snorlax', 'Eevee', 'Charizard'] },
    { name: 'Mario-figuren', words: ['Luigi', 'Yoshi', 'Toad', 'Bowser'] },
    { name: 'Sonic-figuren', words: ['Tails', 'Knuckles', 'Shadow', 'Amy'] },
  ] },
  { id: 'p24', groups: [
    { name: '… + dag', words: ['Konings', 'Bevrijdings', 'Moeder', 'Prinsjes'] },
    { name: '… + nacht', words: ['Kerst', 'Oudejaars', 'Midzomer', 'Bruids'] },
    { name: '… + avond', words: ['Pakjes', 'Spel', 'Film', 'Sinterklaas'] },
  ] },
];
