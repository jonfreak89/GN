/* Aanvulling 1: Stout */

GN.addQuestions('lichaam', [
  { type: 'mc', q: 'Wat is het kleinste bot in het menselijk lichaam?', a: ['De stijgbeugel in je oor', 'Het staartbotje', 'Het teenkootje van je pink', 'Het tongbeen'] },
  { type: 'mc', q: 'Hoe heet het lelletje achter in je keel?', a: ['De huig', 'Het strottenhoofd', 'Het keelamandel', 'De epiglottis'] },
  { type: 'mc', q: 'Waarom krijg je rimpelvingers in bad?', a: ['Je zenuwstelsel zorgt ervoor, waarschijnlijk voor betere grip', 'Je huid zuigt zich vol water', 'Je vingers drogen uit', 'Door de zeep'], d: 2 },
  { type: 'mc', q: 'Wat is het hardste materiaal in je lichaam?', a: ['Tandglazuur', 'Het dijbeen', 'De schedel', 'Je nagels'] },
  { type: 'mc', q: 'Wat is "halitose"?', a: ['Slechte adem', 'Overmatig zweten', 'Haaruitval', 'Hikken'] },
  { type: 'mc', q: 'Wat is "flatulentie"?', a: ['Winderigheid', 'Platvoeten', 'Een buikgriep', 'Een opgeblazen gevoel na eten'] },
  { type: 'mc', q: 'Hoeveel bacteriecellen heb je ongeveer, vergeleken met je eigen lichaamscellen?', a: ['Ongeveer evenveel', 'Tien keer zoveel', 'Bijna geen', 'Honderd keer zoveel'], d: 3, fact: 'Lang werd "tien keer zoveel" geroepen, maar een berekening uit 2016 kwam uit op ongeveer 1 op 1.' },
  { type: 'mc', q: 'Welk deel van je lichaam stopt nooit met groeien zolang je leeft?', a: ['Je haar en nagels', 'Je botten', 'Je ogen', 'Je hart'] },
  { type: 'mc', q: 'Wat is "dermatillomanie"?', a: ['De drang om aan je huid te pulken', 'Een huidziekte', 'Angst voor huid', 'Zonnebrand'], d: 2 },
  { type: 'num', q: 'Hoeveel liter lucht adem je in rust ongeveer in per ademhaling?', answer: 0.5, unit: 'liter' },
  { type: 'num', q: 'Hoeveel liter plas je ongeveer per dag?', answer: 1.5, unit: 'liter' },
  { type: 'bluff', q: 'Het "grappige botje" in je elleboog is eigenlijk geen bot, maar een ___.', answer: 'zenuw', decoys: ['pees', 'spier', 'kraakbeentje'] },
  { type: 'bluff', q: '\'s Ochtends ben je ongeveer ___ centimeter langer dan \'s avonds.', answer: '1', accept: ['een', 'één', '1 à 2', '2'], decoys: ['5', '10', '0,1'], fact: 'Overdag drukt de zwaartekracht de tussenwervelschijven een beetje in.' },
  {
    type: 'order', q: 'Zet deze botten op lengte', lo: 'Kortste', hi: 'Langste', fmt: '± {v} cm',
    items: [['Stijgbeugel (oor)', 0.3], ['Sleutelbeen', 15], ['Opperarmbeen', 36], ['Scheenbeen', 43], ['Dijbeen', 48]],
  },
]);

GN.addQuestions('liefde', [
  { type: 'mc', q: 'Hoe heet de Griekse god van de liefde en begeerte?', a: ['Eros', 'Apollo', 'Hermes', 'Dionysos'] },
  { type: 'mc', q: 'Waar staat "xoxo" voor onder een bericht?', a: ['Kusjes en knuffels', 'Boter-kaas-en-eieren', 'Tot later', 'Geheim'] },
  { type: 'mc', q: 'Welk zeedier staat bekend als afrodisiacum?', a: ['De oester', 'De kreeft', 'De paling', 'De inktvis'] },
  { type: 'mc', q: 'Welke seksuoloog publiceerde rond 1950 spraakmakende rapporten over het seksleven van Amerikanen?', a: ['Alfred Kinsey', 'Sigmund Freud', 'Masters & Johnson', 'Dr. Ruth'] },
  { type: 'mc', q: 'Welke serie volgde vier vriendinnen in New York, met columniste Carrie Bradshaw?', a: ['Sex and the City', 'Girls', 'Desperate Housewives', 'Gossip Girl'] },
  { type: 'mc', q: 'Welk tv-programma koppelt al jaren boeren aan een partner?', a: ['Boer zoekt Vrouw', 'Married at First Sight', 'Love Island', 'Lang Leve de Liefde'] },
  { type: 'mc', q: 'Welk boek uit 2011 maakte "mommy porn" ineens heel normaal in de trein?', a: ['Fifty Shades of Grey', 'Twilight', 'Bridget Jones', 'Normal People'] },
  { type: 'mc', q: 'Wat is de Valentijnsdagtraditie in Japan?', a: ['Vrouwen geven mannen chocola', 'Mannen geven vrouwen rozen', 'Iedereen geeft zijn ouders iets', 'Je eet samen sushi'], d: 2 },
  { type: 'mc', q: 'Welk tijdschrift had in 1953 Marilyn Monroe op de eerste cover?', a: ['Playboy', 'Vogue', 'Cosmopolitan', 'Time'] },
  { type: 'mc', q: 'Wat is een "friends with benefits"-relatie?', a: ['Vrienden die ook met elkaar naar bed gaan', 'Vrienden die elkaar geld lenen', 'Een zakelijke samenwerking', 'Vrienden met dezelfde werkgever'] },
  { type: 'num', q: 'In welk jaar verscheen het eerste Kinsey-rapport (over mannen)?', answer: 1948 },
  { type: 'num', q: 'In welk jaar verscheen het eerste nummer van Playboy?', answer: 1953 },
  { type: 'bluff', q: 'In het Frans noemt men een orgasme ook wel "la petite ___".', answer: 'mort', accept: ['dood'], decoys: ['fête', 'étoile', 'pause'] },
  { type: 'bluff', q: 'Op "White Day" (14 maart) geven in Japan de ___ cadeautjes terug.', answer: 'mannen', accept: ['man', 'jongens'], decoys: ['kinderen', 'collega\'s', 'buren'] },
  {
    type: 'order', q: 'Zet deze "liefdes-mijlpalen" in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Eerste Kinsey-rapport', 1948], ['Eerste Playboy', 1953], ['Woodstock', 1969], ['Sex and the City (serie)', 1998], ['Fifty Shades of Grey', 2011], ['Tinder', 2012]],
  },
]);

GN.addQuestions('dating', [
  { type: 'mc', q: 'Wat is "catfishing"?', a: ['Iemand misleiden met een nep-profiel', 'Daten met een kattenliefhebber', 'Vissen naar complimenten', 'Een date bij de dierentuin'] },
  { type: 'mc', q: 'Wat is "cuffing season"?', a: ['Herfst en winter, als singles ineens een relatie willen', 'Het seizoen van bruiloften', 'Valentijnsweek', 'De zomer vol vakantieliefdes'] },
  { type: 'mc', q: 'Wat is een "red flag" bij daten?', a: ['Een waarschuwingssignaal', 'Een teken dat iemand verliefd is', 'Een eerste kus', 'Een ruzie'] },
  { type: 'mc', q: 'Wat is "slow fading"?', a: ['Langzaam steeds minder contact zoeken tot het uitdooft', 'Langzaam verliefd worden', 'Een romantische film kijken', 'Je oude foto\'s wissen'] },
  { type: 'mc', q: 'Welke datingshow speelt zich af in een villa met "recouplings"?', a: ['Love Island', 'Temptation Island', 'The Bachelor', 'Too Hot to Handle'] },
  { type: 'mc', q: 'Waar staat "DTR" voor in datingland?', a: ['Define the relationship: het "wat zijn we"-gesprek', 'Date tonight, really?', 'Don\'t text regularly', 'Dinner then romance'] },
  { type: 'mc', q: 'Wat is "pocketing"?', a: ['Je date niet voorstellen aan vrienden en familie', 'Je date laten betalen', 'Telefoonnummers verzamelen', 'Cadeautjes geven'] },
  { type: 'mc', q: 'Wat betekent "swipe left"?', a: ['Niet geïnteresseerd', 'Superleuk', 'Later bekijken', 'Profiel melden'] },
  { type: 'mc', q: 'In welke show moeten stellen weerstaan aan verleidelijke singles op een tropisch eiland?', a: ['Temptation Island', 'Love Island', 'Paradise Hotel', 'Ex on the Beach'] },
  { type: 'mc', q: 'Wat is een "rebound"?', a: ['Een snelle relatie vlak na een breuk', 'Een tweede date', 'Terug bij je ex', 'Een relatie op afstand'] },
  { type: 'num', q: 'In welk jaar begon Love Island in het Verenigd Koninkrijk (de huidige versie)?', answer: 2015 },
  { type: 'bluff', q: 'Het plotselinge afknappen op iemand om een klein detail heet "the ___".', answer: 'ick', decoys: ['yuck', 'meh', 'blah'] },
]);
