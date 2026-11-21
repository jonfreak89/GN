/* Game Night – extra quizvragen (deel 3), vooral voor de dunnere categorieën,
   plus een nieuwe zwarte categorie: Stomme doden. */
(function (root) {
  const GN = root.GN;
  if (!GN.CAT.doden) {
    const c = { id: 'doden', name: 'Stomme doden', emoji: '⚰️', group: 'Donker', spice: 2 };
    GN.CATEGORIES.push(c);
    GN.CAT.doden = c;
  }

  GN.addQuestions('doden', [
    { type: 'mc', q: 'Hoe kwam componist Jean-Baptiste Lully in 1687 aan zijn dodelijke verwonding?', a: ['Hij sloeg met zijn dirigeerstok op zijn eigen voet', 'Hij struikelde over een cello', 'Een koperen bekken viel op zijn hoofd', 'Hij slikte een stemvork in'] },
    { type: 'tf', q: 'Er zijn meer mensen omgekomen door selfies te maken dan door haaienbeten.', a: true, fact: 'Verschillende tellingen komen voor de afgelopen tien jaar uit op enkele honderden selfiedoden, tegen een paar per jaar door haaien.' },
    { type: 'bluff', q: 'Thomas Midgley vond de loodbenzine en cfk\'s uit. Hij stierf in 1944 door ___.', answer: 'zijn eigen uitvinding: een katrolsysteem om uit bed te komen wurgde hem', decoys: ['loodvergiftiging van zijn eigen benzine', 'een ontploffende koelkast', 'een gat in de ozonlaag boven zijn huis'] },
    { type: 'tf', q: 'Elk jaar sterven er wereldwijd meer mensen door nijlpaarden dan door haaien.', a: true },
    { type: 'mc', q: 'Welke Romeinse keizer zou volgens sommige verhalen gestorven zijn door te veel paddenstoelen (vergiftigd door zijn vrouw)?', a: ['Claudius', 'Nero', 'Caligula', 'Augustus'] },
    { type: 'tf', q: 'Er is een man omgekomen omdat hij werd geplet door een frisdrankautomaat die hij heen en weer schudde.', a: true, fact: 'Dat gebeurt geregeld: een volle automaat weegt honderden kilo\'s.' },
    { type: 'bluff', q: 'De Amerikaanse schrijver Sherwood Anderson overleed in 1941 nadat hij op een feestje ___.', answer: 'een tandenstoker van een cocktailhapje had ingeslikt', decoys: ['een glas met een bij erin had leeggedronken', 'van een balkon was gestapt tijdens een speech', 'te veel oesters had gegeten voor een weddenschap'] },
    { type: 'mc', q: 'Wat zijn de "Darwin Awards"?', a: ['Prijzen voor mensen die op een stomme manier zichzelf uit de genenpoel halen', 'Prijzen voor de beste evolutiebioloog', 'Een quiz over dieren', 'Prijzen voor de langste baard'] },
    { type: 'bluff', q: 'In 1908 verloor vliegtuigpionier Orville Wright een passagier: de eerste dode door ___.', answer: 'een vliegtuigongeluk met een gemotoriseerd vliegtuig', decoys: ['een loszittende propeller op de grond', 'een botsing met een vogelzwerm', 'een parachute die niet openging'] },
    { type: 'tf', q: 'Tennessee Williams stierf door een flessendop die hij inademde.', a: true, fact: 'Hij gebruikte de dop om oogdruppels of pillen af te meten.' },
  ]);

  GN.addQuestions('criminelen', [
    { type: 'tf', q: 'Er zijn overvallers gepakt omdat ze hun eigen naam op het briefje met "geef me het geld" schreven, op de achterkant van een eigen bankafschrift.', a: true },
    { type: 'tf', q: 'Er zijn inbrekers die zelf het alarmnummer belden omdat ze opgesloten zaten in het huis dat ze leegroofden.', a: true },
    { type: 'bluff', q: 'Er zijn inbrekers gepakt doordat ___ hen precies op de plaats delict plaatste.', answer: 'hun eigen enkelband met gps', decoys: ['hun eigen stappenteller', 'de foto-app van hun moeder', 'een hondenpenning met adres'] },
    { type: 'tf', q: 'Er zijn criminelen gepakt omdat ze hun buit op Instagram zetten.', a: true },
    { type: 'mc', q: 'Wat is het "Dunning-Kruger-effect"?', a: ['Domme mensen overschatten hun eigen kunnen', 'Slimme mensen worden sneller boos', 'Dieven keren terug naar de plaats delict', 'Je onthoudt slecht nieuws beter'] },
  ]);

  GN.addQuestions('stoutgeschiedenis', [
    { type: 'mc', q: 'Wat gebruikten de oude Egyptenaren volgens oude papyri als voorbehoedmiddel?', a: ['Krokodillenpoep', 'Kamelenmelk', 'Rauwe ui', 'Leeuwenhaar'] },
    { type: 'tf', q: 'Casanova schreef in zijn memoires over meer dan honderd minnaressen.', a: true },
    { type: 'mc', q: 'Welk object uit de oudheid wordt gezien als een van de oudste seksspeeltjes ter wereld?', a: ['Een stenen fallus van zo\'n 28.000 jaar oud', 'Een bronzen ring uit Rome', 'Een houten zweep uit Egypte', 'Een jade-ei uit China van 500 jaar oud'], fact: 'Hij werd gevonden in de Hohle Fels-grot in Duitsland.' },
    { type: 'bluff', q: 'In het oude Rome gebruikte men ___ als glijmiddel.', answer: 'olijfolie', decoys: ['honing', 'varkensvet', 'geitenmelk'] },
    { type: 'mc', q: 'Wat was in de 18e eeuw een "tabakrook-klisteer"?', a: ['Tabaksrook in je achterwerk blazen om drenkelingen te reanimeren', 'Een sigaar voor vrouwen', 'Een pijp met twee mondstukken', 'Een rookgordijn in de slaapkamer'], fact: 'Langs de Theems hingen er setjes klaar. Vandaar misschien "blowing smoke up your ass".' },
    { type: 'mc', q: 'Hoe heette het boek met liefdes- en seksadviezen uit het oude India?', a: ['Kamasutra', 'Bhagavad Gita', 'Mahabharata', 'Ramayana'] },
    { type: 'tf', q: 'In de Middeleeuwen bestonden er badhuizen die ook als bordeel dienden.', a: true },
    { type: 'num', q: 'In welk jaar werd de pil (het anticonceptiemiddel) in Nederland verkrijgbaar?', answer: 1962 },
  ]);

  GN.addQuestions('mysteries', [
    { type: 'mc', q: 'Wat gebeurde er volgens de verhalen met de bemanning van de Mary Celeste in 1872?', a: ['Het schip werd verlaten aangetroffen, de bemanning was spoorloos', 'Iedereen werd dood aan boord gevonden', 'De bemanning werd door piraten gevangen', 'Het schip zonk met iedereen aan boord'] },
    { type: 'mc', q: 'Wat vonden ze in 1948 bij de "Somerton-man" op een strand in Australië, naast zijn lichaam?', a: ['Een snippertje papier met "Tamám Shud"', 'Een gouden munt uit Rome', 'Een kaart met een kruisje', 'Een brief aan de koningin'], fact: 'De man werd in 2022 via DNA geïdentificeerd als Carl Webb, maar waarom hij stierf blijft onduidelijk.' },
    { type: 'bluff', q: 'In 1959 kwamen in de Oeral negen wandelaars om. Hun tent was ___.', answer: 'van binnenuit opengesneden', decoys: ['nog netjes dichtgeritst', 'honderd meter verplaatst', 'helemaal verdwenen'], fact: 'Het Djatlovpas-incident. Een lawine lijkt nu de meest waarschijnlijke verklaring.' },
    { type: 'tf', q: 'De identiteit van de "Zodiac Killer" uit Californië is officieel opgelost en bevestigd door de politie.', a: false },
  ]);

  GN.addQuestions('oorlog', [
    { type: 'mc', q: 'Wat was "Operation Mincemeat" in de Tweede Wereldoorlog?', a: ['Een lijk met nepplannen dat de Duitsers misleidde', 'Een plan om Hitler te vergiftigen met vlees', 'Een bombardement op een slachthuis', 'Een geheime voedselvoorraad in Londen'] },
    { type: 'tf', q: 'In de Tweede Wereldoorlog gebruikten de geallieerden een "spookleger" van opblaasbare tanks om de Duitsers te misleiden.', a: true },
    { type: 'mc', q: 'Welke code werd gebruikt door Navajo-indianen in de Tweede Wereldoorlog?', a: ['Hun eigen taal', 'Rooksignalen', 'Morsecode op trommels', 'Een code met dierenbotten'] },
    { type: 'bluff', q: 'In de Eerste Wereldoorlog vierden Duitse en Britse soldaten in 1914 spontaan ___.', answer: 'samen Kerstmis en speelden voetbal in niemandsland', decoys: ['samen Oud en Nieuw met vuurwerk', 'de verjaardag van de koning met taart', 'een bruiloft tussen twee soldaten'] },
    { type: 'tf', q: 'Bij de Slag om Arnhem in 1944 wonnen de geallieerden en veroverden ze de brug.', a: false, fact: '"A bridge too far": de operatie Market Garden mislukte bij Arnhem.' },
    { type: 'mc', q: 'Wat was de Hongerwinter?', a: ['De winter van 1944-1945 met hongersnood in West-Nederland', 'Een strenge winter in 1963', 'Een Russische veldslag', 'Een vastentijd in de Middeleeuwen'] },
  ]);

  GN.addQuestions('bier', [
    { type: 'num', q: 'Hoeveel milliliter zit er in een standaard fluitje bier?', answer: 200, unit: 'ml' },
    { type: 'mc', q: 'Welk bier wordt gebrouwen in de abdij van Koningshoeven bij Tilburg?', a: ['La Trappe', 'Westmalle', 'Chimay', 'Orval'] },
    { type: 'mc', q: 'Wat betekent "Proost" ongeveer?', a: ['Het moge baten (van het Latijn "prosit")', 'Op je gezondheid (van het Frans)', 'Drink snel (van het Duits)', 'Dank je wel (van het Spaans)'] },
    { type: 'mc', q: 'Wat is "bokbier"?', a: ['Een donker, wat sterker seizoensbier, vooral in de herfst', 'Bier met geitenmelk', 'Bier uit een bokaal', 'Alcoholvrij bier voor kinderen'] },
  ]);

  GN.addQuestions('kater', [
    { type: 'tf', q: 'Een kater komt alleen door uitdroging, dus genoeg water drinken voorkomt hem helemaal.', a: false, fact: 'Water helpt een beetje, maar ook ontstekingsreacties, slecht slapen en afbraakstoffen spelen mee.' },
    { type: 'mc', q: 'Wat is volgens veel Nederlanders dé katersnack?', a: ['Een broodje kroket of patat', 'Een salade', 'Haring', 'Yoghurt met muesli'] },
    { type: 'tf', q: 'Koffie helpt de alcohol sneller uit je bloed.', a: false, fact: 'Je lever breekt alcohol in een vast tempo af. Koffie maakt je hooguit wakkerder.' },
    { type: 'mc', q: 'Wat is een "zatlap"?', a: ['Iemand die vaak dronken is', 'Een doekje voor gemorst bier', 'Een slok bier van een ander', 'Een soort bierglas'] },
    { type: 'tf', q: 'Donkere dranken zoals whisky en rode wijn geven gemiddeld een zwaardere kater dan heldere zoals wodka.', a: true, fact: 'Ze bevatten meer "congeneren", bijstoffen uit het rijpen en gisten.' },
    { type: 'mc', q: 'Wat is de "walk of shame"?', a: ['De wandeling naar huis de ochtend na een nachtje elders', 'Het afscheid van een ontslagen collega', 'De weg naar de wc in de kroeg', 'De rondgang van een verliezende quizploeg'] },
  ]);

  GN.addQuestions('reizen', [
    { type: 'mc', q: 'Wat is de drukste luchthaven van Nederland?', a: ['Schiphol', 'Eindhoven Airport', 'Rotterdam The Hague Airport', 'Groningen Airport Eelde'] },
    { type: 'tf', q: 'In Japan is fooi geven gebruikelijk en wordt het zeer gewaardeerd.', a: false, fact: 'In Japan kan fooi zelfs als onbeleefd gezien worden.' },
    { type: 'mc', q: 'Waar ligt de Grand Canyon?', a: ['Arizona', 'Texas', 'Californië', 'Colorado'] },
    { type: 'num', q: 'Hoeveel landen hadden in 2024 de euro als munt?', answer: 20 },
    { type: 'tf', q: 'In het Verenigd Koninkrijk rijdt men links.', a: true },
  ]);

  GN.addQuestions('merken', [
    { type: 'mc', q: 'Waar staat de naam IKEA voor?', a: ['Ingvar Kamprad Elmtaryd Agunnaryd', 'Interieur Kopen En Afhalen', 'Internationale Kasten En Accessoires', 'Het betekent "huis" in het Zweeds'] },
    { type: 'mc', q: 'Wat was Nokia oorspronkelijk voor bedrijf?', a: ['Een papierfabriek', 'Een visserijbedrijf', 'Een bank', 'Een fietsenmaker'] },
  ]);

  GN.addQuestions('kunst', [
    { type: 'tf', q: 'Vincent van Gogh verkocht tijdens zijn leven honderden schilderijen.', a: false, fact: 'Voor zover bekend verkocht hij er maar heel weinig, misschien zelfs maar één.' },
    { type: 'mc', q: 'Wat is een "Jan Steen-huishouden"?', a: ['Een rommelig, wanordelijk huishouden', 'Een heel net huishouden', 'Een huis vol schilderijen', 'Een gezin met veel kinderen'] },
    { type: 'tf', q: 'Banksy is een kunstenaar wiens ware identiteit officieel nooit is bekendgemaakt.', a: true },
  ]);

  GN.addQuestions('sinterklaas', [
    { type: 'mc', q: 'Wat is "taai-taai"?', a: ['Een taai koekje met anijs, vaak in poppetjesvorm', 'Een soort marsepein', 'Een chocoladeletter', 'Een sinterklaasliedje'] },
    { type: 'tf', q: 'In België komt Sinterklaas op 6 december langs met cadeautjes, niet op de 5e.', a: true },
    { type: 'mc', q: 'Wat zingen kinderen bij de schoorsteen?', a: ['Sinterklaasliedjes', 'Kerstliedjes', 'Volksliedjes', 'Verjaardagsliedjes'] },
  ]);

  GN.addQuestions('kerst', [
    { type: 'mc', q: 'Wat eten veel Nederlanders aan tafel met de hele familie met Kerst, met kleine pannetjes?', a: ['Gourmet', 'Fondue van chocola', 'Barbecue', 'Rijsttafel'] },
    { type: 'tf', q: 'In de Kerstnacht van 1914 speelden Duitse en Britse soldaten op sommige plekken voetbal.', a: true },
    { type: 'mc', q: 'Wat is een "kerststol"?', a: ['Een zoet brood met amandelspijs en rozijnen', 'Een kerststal met beeldjes', 'Een kerstkrans', 'Een soort glühwein'] },
    { type: 'num', q: 'Hoeveel dagen telt de bekende kerstliedje-lijst "The Twelve Days of Christmas"?', answer: 12 },
  ]);

  GN.addQuestions('morbide', [
    { type: 'mc', q: 'Wat is een "lijkenpikker" in de natuur?', a: ['Een aaseter, zoals een gier', 'Een vogel die alleen \'s nachts eet', 'Een insect in boomschors', 'Een vis die op de bodem leeft'] },
    { type: 'mc', q: 'Wat werd in de 19e eeuw met "resurrection men" bedoeld?', a: ['Grafrovers die lijken aan anatomen verkochten', 'Priesters die doden zegenden', 'Artsen die mensen reanimeerden', 'Toneelspelers in passiespelen'] },
    { type: 'tf', q: 'In Victoriaans Engeland maakten mensen weleens foto\'s van overleden familieleden alsof ze nog leefden.', a: true },
    { type: 'mc', q: 'Wat is "lijkwas" (adipocere)?', a: ['Een wasachtige laag die op lijken kan ontstaan in vochtige grond', 'Wax van bijen op graven', 'Een middel om lijken te balsemen', 'Een soort grafkaars'] },
    { type: 'bluff', q: 'In de Middeleeuwen werden soms ___ gebruikt als medicijn.', answer: 'gemalen mummies', decoys: ['gedroogde slakken van kerkhoven', 'botten van heiligen in thee', 'haren van gehangen dieven'], fact: '"Mumia" werd als poeder verkocht in apotheken in Europa.' },
    { type: 'tf', q: 'Het lichaam van Lenin ligt nog altijd gebalsemd in een mausoleum in Moskou.', a: true },
    { type: 'mc', q: 'Wat is een "vanitas"-schilderij?', a: ['Een stilleven met een schedel, over de vergankelijkheid', 'Een portret van een rijke man', 'Een schilderij van een spiegel', 'Een landschap met een kerkhof bij nacht'] },
  ]);

  GN.addQuestions('lichaam', [
    { type: 'mc', q: 'Welk lichaamsdeel blijft je hele leven groeien, zo lijkt het?', a: ['Neus en oren', 'Ogen', 'Tanden', 'Vingers'], fact: 'Kraakbeen verandert en de huid verslapt, waardoor ze groter lijken.' },
    { type: 'tf', q: 'Mannelijke tepels hebben geen functie maar ontstaan omdat elk embryo eerst hetzelfde begint.', a: true },
  ]);

  GN.addQuestions('liefde', [
    { type: 'tf', q: 'Kussen verbrandt calorieën.', a: true },
    { type: 'mc', q: 'Wat betekent "pillow talk"?', a: ['Intiem kletsen in bed na de seks', 'Praten in je slaap', 'Ruzie over het beddengoed', 'Een sollicitatie vanuit bed'] },
    { type: 'mc', q: 'Wat is "spooning"?', a: ['Als lepeltjes tegen elkaar aan liggen', 'Samen een toetje eten', 'Een liefdesbrief met een lepel erin', 'Zoenen met je ogen open'] },
    { type: 'mc', q: 'Welk dier staat bekend als symbool voor trouw, omdat het vaak voor het leven een partner kiest?', a: ['Zwaan', 'Konijn', 'Kat', 'Pauw'] },
  ]);

  GN.addQuestions('dating', [
    { type: 'mc', q: 'Wat is "ghosten"?', a: ['Zonder uitleg ineens niks meer laten horen', 'Iemand stiekem online bekijken', 'Een date in een spookhuis', 'Doen alsof je iemand niet kent'] },
  ]);

  GN.addQuestions('flop', [
    { type: 'tf', q: 'Coca-Cola veranderde in 1985 zijn recept ("New Coke") en draaide dat na een paar maanden weer terug.', a: true },
    { type: 'mc', q: 'Wat was de "Segway"?', a: ['Een tweewielig stepje waar je op staand balanceert', 'Een elektrische fiets', 'Een mini-auto voor één persoon', 'Een vliegende skateboard'] },
    { type: 'tf', q: 'De Nintendo Virtual Boy uit 1995 werd een enorm succes en verkocht miljoenen per jaar.', a: false, fact: 'Hij verkocht slecht en gaf veel spelers hoofdpijn. Na een jaar stopte Nintendo ermee.' },
  ]);

  GN.addQuestions('laatstewoorden', [
  ]);

  GN.addQuestions('nederland', [
    { type: 'mc', q: 'Wat is een "pinda" volgens een Nederlander?', a: ['Een apennootje', 'Een walnoot', 'Een cashewnoot', 'Een amandel'] },
    { type: 'mc', q: 'Wat is "gezelligheid" volgens veel buitenlanders?', a: ['Een woord dat je niet goed kunt vertalen', 'Een Nederlands gerecht', 'Een feestdag', 'Een soort fiets'] },
    { type: 'mc', q: 'Waar is de grootste haven van Europa?', a: ['Rotterdam', 'Antwerpen', 'Hamburg', 'Amsterdam'] },
  ]);

  GN.addQuestions('weetjes', [
    { type: 'mc', q: 'Wat kan een schaap van een foto herkennen, volgens onderzoek?', a: ['Gezichten van mensen', 'Kleuren van de regenboog', 'Getallen tot tien', 'Het eigen spiegelbeeld van achteren'] },
    { type: 'tf', q: 'Honing kan duizenden jaren goed blijven.', a: true, fact: 'In Egyptische graven is eetbare honing gevonden.' },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
