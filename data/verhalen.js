/* Verhalen: Invulverhaal, Verhalenketting en Echt of verzonnen */

/* ---------- Invulverhaal ----------
   In de tekst:  {type}    = nieuw gat van dat soort
                 {type!x}  = nieuw gat dat je later herhaalt met {=x}
   Spelers zien alleen het soort woord, niet het verhaal. */
GN.INVUL_TYPES = {
  naam: { label: 'De naam van iemand hier in de kamer', ex: ['Henk', 'Ingrid', 'Kees', 'Sanne'] },
  bn: { label: 'Een Bekende Nederlander', ex: ['Gordon', 'André van Duin', 'Linda de Mol', 'Frans Bauer', 'Johan Derksen', 'Patty Brard', 'Max Verstappen'] },
  lichaamsdeel: { label: 'Een lichaamsdeel', ex: ['linkerelleboog', 'teennagel', 'neushaar', 'oorlel', 'knieholte'] },
  dier: { label: 'Een dier', ex: ['alpaca', 'zeekoe', 'cavia', 'wrattenzwijn', 'duif'] },
  voorwerp: { label: 'Een voorwerp', ex: ['tosti-ijzer', 'wc-borstel', 'tuinkabouter', 'skippybal', 'kaasschaaf'] },
  eten: { label: 'Iets te eten', ex: ['frikandel', 'hagelslag', 'zuurkool', 'drop', 'bitterbal'] },
  drank: { label: 'Een drankje', ex: ['Berenburg', 'chocomel', 'advocaat', 'Red Bull', 'lauw bier'] },
  plaats: { label: 'Een plaats in Nederland of België', ex: ['Oss', 'Spijkenisse', 'Urk', 'Tilburg', 'Bergen op Zoom'] },
  beroep: { label: 'Een beroep', ex: ['tandarts', 'vuilnisman', 'dominee', 'stripper', 'boswachter'] },
  werkwoord: { label: 'Een werkwoord (iets wat je doet, bijv. dansen)', ex: ['dweilen', 'kwispelen', 'breakdancen', 'snurken', 'jodelen'] },
  bijv: { label: 'Een bijvoeglijk naamwoord (bijv. plakkerig)', ex: ['plakkerig', 'zweterig', 'sexy', 'beschimmeld', 'knapperig'] },
  uitroep: { label: 'Een uitroep', ex: ['Jezus Mina', 'Hatsikidee', 'Potverdorie', 'Holy shit', 'Joepie'] },
  geluid: { label: 'Een geluid', ex: ['BOEM', 'pfffrrrt', 'tsjak', 'oink', 'piep'] },
  getal: { label: 'Een getal', ex: ['7', '69', '1.000.000', '3', '42'] },
  kleding: { label: 'Een kledingstuk', ex: ['string', 'klompen', 'joggingbroek', 'badjas', 'onesie'] },
  plek: { label: 'Een plek in huis', ex: ['wasmand', 'kruipruimte', 'badkuip', 'schuur', 'koelkast'] },
  winkel: { label: 'Een winkel', ex: ['Action', 'HEMA', 'Kruidvat', 'Gamma', 'Albert Heijn'] },
  voertuig: { label: 'Een voertuig', ex: ['bakfiets', 'tractor', 'scootmobiel', 'Fiat Panda', 'vuilniswagen'] },
  hobby: { label: 'Een hobby', ex: ['postzegels sparen', 'paaldansen', 'vissen', 'karaoke', 'legpuzzels'] },
  liedje: { label: 'Een liedje', ex: ['Het Busje Komt Zo', 'Barbie Girl', 'Brabant', 'Despacito', 'De Vogeltjesdans'] },
  film: { label: 'Een film of serie', ex: ['Titanic', 'Shrek', 'Boer zoekt Vrouw', 'Jurassic Park', 'GTST'] },
  kwaal: { label: 'Een kwaaltje', ex: ['de hik', 'een kater', 'een wrat', 'zweetvoeten', 'de waterpokken'] },
  scheld: { label: 'Een (lief) scheldwoord', ex: ['sukkel', 'droplul', 'mafkees', 'kneus', 'lapzwans'] },
  emotie: { label: 'Een gevoel', ex: ['jaloers', 'geil', 'beschaamd', 'opgelucht', 'hongerig'] },
  tijd: { label: 'Een tijdstip of moment', ex: ['drie uur \'s nachts', 'tijdens de kerk', 'op Koningsdag', 'onder de douche', 'bij de tandarts'] },
};

GN.INVUL = [
  {
    title: 'Het verjaardagsfeestje', spice: 1,
    text: 'Vorige week vierde {naam!h} zijn verjaardag in {plaats}. Er was taart met {eten} en er stond {drank} in een {voorwerp}. Toen {bn} onverwacht binnenkwam, riep iedereen: "{uitroep}!" Oom Henk ging meteen {werkwoord} op tafel, waarbij zijn {kleding} scheurde. Tante Truus vond dat best {bijv}. Om {getal} uur \'s nachts lag {=h} nog in de {plek} met een {dier}. Beste feest ooit.',
  },
  {
    title: 'Mijn eerste werkdag', spice: 1,
    text: 'Op mijn eerste dag als {beroep} moest ik meteen {werkwoord}. Mijn baas, een {bijv} man die op {bn} leek, gaf me een {voorwerp} en zei: "Hier, niet in je {lichaamsdeel} steken." In de kantine aten we {eten} en iedereen zong {liedje}. Om vijf uur reed ik met de {voertuig} naar huis en voelde me heel {emotie}.',
  },
  {
    title: 'Vakantie op de camping', spice: 1,
    text: 'Dit jaar gingen we kamperen in {plaats}. Papa zette de tent op naast een {dier} die de hele nacht "{geluid}" deed. Mama had {getal} pakken {eten} meegenomen. Op de tweede dag kreeg mijn broertje {kwaal} van de {drank}. De buurman bleek {bn} te zijn, die elke ochtend in zijn {kleding} kwam {werkwoord}. Volgend jaar gaan we toch maar weer naar de {winkel}.',
  },
  {
    title: 'Het journaal', spice: 1,
    text: 'Goedenavond, dit is het journaal. In {plaats} is vanochtend een {dier} ontsnapt uit een {voertuig}. Het dier werd gezien in de {winkel}, waar het {getal} zakken {eten} opat. Een woordvoerder: "{uitroep}! Dit is heel {bijv}." Ook {bn} was erbij en probeerde het beest te vangen met een {voorwerp}, maar kreeg daarbij {kwaal}. En dan nu het weer: morgen wordt het {bijv} met kans op {drank}.',
  },
  {
    title: 'Sprookje', spice: 1,
    text: 'Er was eens een {bijv} prinses die {naam!p} heette. Ze woonde in een kasteel in {plaats} en had een betoverde {voorwerp}. Op een dag kwam er een {dier} langs die zei: "Kus mijn {lichaamsdeel}, dan word ik een knappe {beroep}." Dat deed {=p}, en "{geluid}!", daar stond {bn}. Ze trouwden, aten {eten} en zongen {liedje}. En als ze niet gestorven zijn, dan {werkwoord} ze nog steeds.',
  },
  {
    title: 'Sinterklaasgedicht', spice: 1,
    text: 'Sinterklaas zat te denken in zijn {plek}, wat hij {naam!s} dit jaar zou geven. {=s} houdt van {hobby} en van {eten}, maar wordt van {drank} altijd {emotie}. Daarom krijgt {=s} een {bijv} {voorwerp} en een {kleding} van de {winkel}. Piet zegt: "{uitroep}, wat een cadeau!" En wie niet lief is, moet {getal} keer {werkwoord} met {bn}.',
  },
  {
    title: 'Het sollicitatiegesprek', spice: 1,
    text: '"Goedemiddag, u solliciteert als {beroep}. Waarom?" "Nou, ik ben heel {bijv} en ik kan goed {werkwoord}." "Wat is uw grootste zwakte?" "{kwaal}, en ik ben verslaafd aan {eten}." "Wat doet u in uw vrije tijd?" "{hobby}, samen met {bn}." "Waar ziet u zichzelf over {getal} jaar?" "In {plaats}, in een {voertuig}, met een {dier}." "U bent aangenomen. {uitroep}!"',
  },
  {
    title: 'Natuurdocumentaire', spice: 1,
    text: 'Hier zien we de {bijv} {dier!d} in zijn natuurlijke omgeving: de {plek} van een rijtjeshuis in {plaats}. Elke ochtend om {tijd} gaat de {=d} op zoek naar {eten}. Het mannetje imponeert het vrouwtje door {werkwoord} en "{geluid}" te roepen. Als er gevaar dreigt, verstopt de {=d} zich in een {kleding}. Zijn grootste vijand: {bn} met een {voorwerp}.',
  },
  {
    title: 'De date', spice: 2,
    text: 'Mijn date met {naam!d} begon in de {winkel}. {=d} had een {kleding} aan en rook naar {eten}. We dronken {getal} glazen {drank} en daarna werd {=d} erg {emotie}. Bij het afscheid zei {=d}: "Jij hebt de mooiste {lichaamsdeel} van heel {plaats}." Toen moest ik ineens {werkwoord}. Het eindigde met {kwaal} en een {dier} op de achterbank van de {voertuig}. Tweede date? Misschien.',
  },
  {
    title: 'Het testament', spice: 2,
    text: 'Ik, {naam!t}, laat bij mijn dood het volgende na. Mijn {voorwerp} gaat naar {bn}. Mijn verzameling {eten} gaat naar de {winkel}. Mijn {bijv} {kleding} mag in de kist, samen met een fles {drank}. Op mijn begrafenis wil ik {liedje} horen, terwijl iedereen {werkwoord}. Mijn as moet worden uitgestrooid in {plaats}, bij voorkeur om {tijd}. En aan mijn ex: {scheld}!',
  },
  {
    title: 'Bericht aan de buren', spice: 2,
    text: 'Beste buren. Wij hebben er genoeg van. Elke nacht om {tijd} horen wij "{geluid}" door de muur. Ook staat er al {getal} weken een {voertuig} op onze stoep met een {dier} erin. Wie gooit er steeds {eten} in onze {plek}? En meneer van nummer 12: {werkwoord} in uw {kleding} in de voortuin is NIET normaal. Wij zijn heel {emotie}. Groetjes, {naam}. PS: {scheld}.',
  },
  {
    title: 'Zelfhulpboek', spice: 2,
    text: 'Hoofdstuk 1: Het geluk zit in je {lichaamsdeel}. Elke ochtend sta je om {tijd} op en zeg je drie keer "{uitroep}". Daarna eet je {eten} en drink je een glas {drank}. Ben je {emotie}? Ga dan {werkwoord} met een {voorwerp}. Zoals {bn} altijd zegt: "Wie {hobby} doet, wordt vanzelf {bijv}." Nog niet gelukkig? Verhuis naar {plaats}.',
  },
  {
    title: 'Het vrijgezellenfeest', spice: 3,
    text: 'Het vrijgezellenfeest van {naam!v} begon onschuldig met {hobby}. Daarna kwam er een {beroep} binnen die alleen een {kleding} droeg en heel {bijv} kon {werkwoord}. {=v} werd {emotie} en riep: "{uitroep}!" Na {getal} shotjes {drank} lag iedereen in de {plek}. Er is een filmpje waarop {=v} {eten} likt van het {lichaamsdeel} van {bn}. Dat filmpje komt op de bruiloft.',
  },
  {
    title: 'Erotisch verhaal', spice: 3,
    text: 'Het was {tijd}. Ze keek hem diep in zijn {lichaamsdeel} en fluisterde: "Pak de {voorwerp}." Langzaam trok hij zijn {kleding} uit. Hij rook naar {eten} en {drank}. "Je bent zo {bijv}," hijgde ze, "net {bn}." Toen begon hij te {werkwoord}. "{geluid}!" klonk het, {getal} keer achter elkaar. Ze voelde zich zo {emotie} als een {dier} in {plaats}.',
  },
  {
    title: 'Datingprofiel', spice: 3,
    text: 'Hoi! Ik ben {naam}, een {bijv} {beroep} uit {plaats}. Ik hou van {hobby}, lange wandelingen naar de {winkel} en {eten} in bed. Mijn beste eigenschap is mijn {lichaamsdeel}. Ik zoek iemand die net zo goed kan {werkwoord} als {bn}. Turn-off: {kwaal}. Turn-on: een {kleding} en een fles {drank}. Eerste date? Bij mij in de {plek}.',
  },
];

/* ---------- Verhalenketting: openingszinnen ---------- */
GN.KETTING = [
  { q: 'Het was een gewone dinsdag in Tilburg, tot er een giraffe in de Albert Heijn stond.' },
  { q: 'Opa had altijd gezegd: "Maak nooit de kelder open." Vanavond deden we het toch.' },
  { q: 'Het ruimteschip landde precies op het voetbalveld, midden in de wedstrijd.' },
  { q: 'Toen ik wakker werd, was ik ineens tachtig jaar oud.' },
  { q: 'Het was carnaval, en Gerrit was zijn broek kwijt.' },
  { q: 'In de Efteling ging het licht uit, en de Holle Bolle Gijs begon te praten.' },
  { q: 'De zombies kwamen het eerst aan in Den Bosch, net tijdens de kermis.' },
  { q: 'Mijn kat keek me aan en zei heel duidelijk: "We moeten praten."' },
  { q: 'Het testament werd voorgelezen, en iedereen viel stil.' },
  { q: 'Op de camping in Frankrijk stond ineens een man met een koffer vol kaas voor onze tent.' },
  { q: 'Er zat een briefje onder de ruitenwisser: "Ik weet wat je vorige zomer deed."' },
  { q: 'De sterrenpoort in de achtertuin begon blauw te gloeien.' },
  { q: 'De woestijnplaneet was heet, en het water was op.' },
  { q: 'In de Kalverstraat verscheen een gat in de lucht, en er kwam een dinosaurus uit.' },
  { q: 'Het eerste wat ik zag op de verjaardag van tante Riek, was een man in een badjas.' },
  { q: 'De tovenaar keek bezorgd naar zijn toverstaf. Die was gebroken.' },
  { q: 'Mijn baas belde om drie uur \'s nachts en fluisterde: "Kom nu naar kantoor."' },
  { q: 'Op Koningsdag verkocht een oud vrouwtje een kistje dat bewoog.' },
  { q: 'Iedereen in het dorp had dezelfde droom gehad.' },
  { q: 'De kerstman lag dronken in onze schoorsteen.' },
  { q: 'De nieuwe buren waren vriendelijk, maar ze kwamen alleen \'s nachts naar buiten.' },
  { q: 'Bij de Gamma stond een bord: "Vandaag alles gratis, maar er is één regel."' },
  { q: 'Het bier was op, en het was pas negen uur.' },
  { q: 'De superheld was zijn krachten kwijt, precies op de dag dat hij ze nodig had.' },
  { q: 'Het vliegtuig maakte een noodlanding op een eiland dat niet op de kaart stond.' },
  { q: 'Ik opende de koelkast, en daar zat een klein mannetje met een sigaar.' },
  { q: 'De date ging goed, tot de ober zei: "Uw vrouw heeft ook al betaald."', spice: 2 },
  { q: 'De begrafenis was bijna voorbij toen de kist begon te kloppen.', spice: 2 },
  { q: 'Het lijk in de bibliotheek had een briefje in zijn hand.', spice: 2 },
  { q: 'Op het vrijgezellenfeest ging het pas echt mis toen de stripper binnenkwam.', spice: 3 },
  { q: 'Ze werd wakker in een onbekend bed, naast iemand die ze heel goed kende.', spice: 3 },
  { q: 'De buurman stond in zijn blootje in de tuin, en hij had een plan.', spice: 3 },
];
// als iemand niets instuurt
GN.KETTING_FILL = [
  'Toen werd het heel even stil.',
  'Niemand had dit zien aankomen.',
  'Gelukkig kwam net op dat moment de buurvrouw langs.',
  'Er klonk een harde knal.',
  'Iedereen keek naar Henk, maar Henk keek naar de grond.',
  'Daarna ging alles mis wat mis kon gaan.',
  'Er was maar één oplossing: bier.',
  'Ineens rook het heel sterk naar frikandellen.',
  'En toen ging het licht uit.',
  'Iemand begon zachtjes te huilen.',
];

/* ---------- Echt of verzonnen ----------
   Het begin van een waargebeurd verhaal; ___ is hoe het afliep. */
GN.ECHT = [
  { q: 'In 1518 begon een vrouw in Straatsburg op straat te dansen. Binnen een maand ___.', answer: 'dansten honderden mensen mee, dagenlang, en sommigen dansten zich dood', decoys: ['werd ze heilig verklaard door de paus', 'werd dansen in de hele stad voor eeuwig verboden', 'had ze genoeg geld verdiend om een kasteel te kopen'], fact: 'De dansplaag van 1518. Waarom het gebeurde, weet niemand precies.' },
  { q: 'In 1932 trok het Australische leger met machinegeweren ten strijde tegen duizenden emoes die de oogst opaten. Het eindigde met ___.', answer: 'een overwinning voor de emoes: het leger trok zich terug', decoys: ['een vredesverdrag met de boeren en een emoe-reservaat', 'emoe op het menu van elk legerkamp', 'het uitsterven van de emoe in die hele provincie'], fact: 'De Grote Emoe-oorlog. De vogels bleken lastig te raken.' },
  { q: 'In januari 1919 knapte in Boston een enorme opslagtank. Er overstroomde een hele wijk met ___.', answer: 'stroop (melasse)', accept: ['melasse', 'stroop'], decoys: ['bier', 'olijfolie', 'ketchup'], fact: 'Er kwamen 21 mensen om. Op warme dagen zou het er nog jaren naar stroop geroken hebben.' },
  { q: 'In 1814 barstte in Londen een brouwerijvat. Daarna ___.', answer: 'stroomde een golf bier door de straten en kwamen er acht mensen om', decoys: ['werd bier een jaar lang gratis in heel Londen', 'zat de koning een maand lang zonder bier', 'brandde de hele brouwerij af door de gistdampen'], fact: 'De London Beer Flood: meer dan een miljoen liter bier.' },
  { q: 'In 1945 hakte een Amerikaanse boer de kop van zijn kip Mike af. Mike ___.', answer: 'leefde daarna nog anderhalf jaar zonder kop', decoys: ['werd daarna opgezet en tentoongesteld in een museum', 'rende nog een week rond en ging toen pas dood', 'bleek een haan te zijn en werd beroemd op de radio'], fact: 'Een stukje hersenstam bleef heel. De boer gaf hem eten via een pipetje.' },
  { q: 'Napoleon organiseerde in 1807 een konijnenjacht om een overwinning te vieren. Maar ___.', answer: 'de tamme konijnen stormden op hem af en hij moest vluchten', decoys: ['er bleek geen enkel konijn te zijn uitgezet', 'Napoleon schoot per ongeluk zijn eigen paard neer', 'de konijnen bleken hazen te zijn en renden het bos in'], fact: 'De konijnen waren tam en dachten dat ze gevoerd werden.' },
  { q: 'Bij de Olympische marathon van 1904 kwam Fred Lorz als eerste over de finish. Maar ___.', answer: 'hij had een groot stuk van de route in een auto gezeten', decoys: ['hij bleek de verkeerde route te hebben gelopen', 'hij liep de hele race op blote voeten en werd gediskwalificeerd', 'hij was eigenlijk een toeschouwer die zomaar was meegerend'], fact: 'De echte winnaar kreeg onderweg strychnine met cognac als "oppepper".' },
  { q: 'In 897 groef paus Stefanus VI zijn overleden voorganger Formosus op en ___.', answer: 'zette hem op een troon voor een rechtszaak', decoys: ['liet hem opnieuw begraven onder het altaar van de Sint-Pieter', 'verkocht zijn botten als heilige relikwieën', 'liet hem bijzetten in de catacomben van Rome'], spice: 2, fact: 'De Kadaversynode. Het lijk werd schuldig bevonden.' },
  { q: 'In 1876 viel er in Kentucky op een zonnige dag een vreemde regen naar beneden: ___.', answer: 'stukjes vlees', decoys: ['levende kikkers', 'roze sneeuw', 'kleine visjes'], fact: 'De Kentucky Meat Shower. Volgens een verklaring hadden gieren hun maaltijd uitgekotst.' },
  { q: 'In 1962 moesten in Tanzania (toen Tanganyika) scholen dicht omdat ___.', answer: 'leerlingen niet meer konden stoppen met lachen', decoys: ['alle leraren tegelijk in staking gingen', 'een zwerm bijen de scholen had overgenomen', 'de regering alle schoolboeken had verboden'], fact: 'De lachepidemie duurde maanden en verspreidde zich naar andere dorpen.' },
  { q: 'In de Zweedse stad Gävle wordt elke kerst een enorme bok van stro gebouwd. Die wordt bijna elk jaar ___.', answer: 'in brand gestoken', decoys: ['door elanden opgegeten', 'gestolen en in een ander land teruggevonden', 'door een storm omgeblazen'], fact: 'Sinds 1966 is hij tientallen keren afgefikt.' },
  { q: 'Op het hoogtepunt van de tulpenmanie in 1637 was één tulpenbol volgens verhalen ___.', answer: 'evenveel waard als een grachtenpand in Amsterdam', decoys: ['evenveel waard als een koe', 'meer waard dan alle schepen van de VOC samen', 'alleen te koop voor mensen van adel'], fact: 'Kort daarna stortte de markt in.' },
  { q: 'In 2012 zat een Zweedse man twee maanden vast in zijn ingesneeuwde auto. Hij overleefde door ___.', answer: 'alleen sneeuw te eten', accept: ['sneeuw te eten'], decoys: ['zijn autostoelen op te eten', 'een eland te vangen door het raam', 'de motor elke dag een uurtje aan te zetten'], fact: 'Hij werd sterk vermagerd maar levend gevonden.' },
  { q: 'In 1964 wilde de Australiër Reg Spiers van Londen naar huis, maar hij had geen geld. Dus ___.', answer: 'verstuurde hij zichzelf in een houten kist als vrachtpost', decoys: ['liep hij de hele weg via Azië terug', 'trouwde hij met een stewardess', 'verstopte hij zich in de bagageruimte van de koningin'], fact: 'Hij zat drie dagen in de kist, met een paar blikjes eten.' },
  { q: 'Tijdens de Tweede Wereldoorlog had het Amerikaanse leger een geheime eenheid, het Ghost Army, met ___.', answer: 'opblaasbare tanks en nepgeluiden om de Duitsers te misleiden', decoys: ['soldaten die alleen \'s nachts vochten', 'helderzienden die voorspelden waar de Duitsers zouden aanvallen', 'soldaten die als boeren verkleed achter de linies werkten'], fact: 'Veel kunstenaars en ontwerpers dienden in die eenheid.' },
  { q: 'De Japanse soldaat Hiroo Onoda vocht in de jungle van de Filipijnen door tot ___.', answer: '1974, omdat hij niet geloofde dat de oorlog voorbij was', decoys: ['1946, toen hij werd gebeten door een slang', '1950, toen hij verliefd werd op een boerendochter', '1963, toen hij een krant uit Tokio vond'], fact: 'Pas toen zijn oude commandant hem kwam halen, gaf hij zich over.' },
  { q: 'De kat Stubbs was twintig jaar lang ___.', answer: 'erebugemeester van het dorp Talkeetna in Alaska', decoys: ['de mascotte van een Engelse voetbalclub', 'de enige kat met een eigen paspoort', 'de officiële muizenvanger van het Witte Huis'], fact: 'Hij ging elke dag naar zijn vaste café.' },
  { q: 'De Amerikaan Charles Osborne had 68 jaar lang ___.', answer: 'de hik', decoys: ['dezelfde onderbroek aan', 'elke dag dezelfde maaltijd', 'geen woord gezegd'], fact: 'Van 1922 tot 1990. Volgens Guinness een record.' },
  { q: 'In 1848 schoot er bij een ontploffing een ijzeren staaf dwars door het hoofd van spoorwerker Phineas Gage. Hij ___.', answer: 'bleef leven, al veranderde zijn karakter', decoys: ['overleed pas na een week, terwijl hij gewoon praatte', 'werkte de volgende dag gewoon weer', 'kon daarna ineens vloeiend Frans spreken'], spice: 2, fact: 'Hij werd een beroemd geval in de hersenwetenschap.' },
  { q: 'Stewardess Violet Jessop staat bekend als "Miss Onzinkbaar" omdat ze ___.', answer: 'de rampen met de Titanic én haar zusterschip de Britannic overleefde', decoys: ['zeven keer van een cruiseschip viel en het overleefde', 'als enige een schip vol tyfus overleefde', 'een week op een vlot in de oceaan overleefde'], fact: 'Ze zat ook op de Olympic toen die in 1911 een botsing kreeg.' },
  { q: 'Joseph Pujol trad rond 1890 op in de Moulin Rouge in Parijs als ___.', answer: 'artiest die liedjes speelde met zijn scheten', decoys: ['de man die levende muizen at', 'de sterkste man van Frankrijk', 'goochelaar die zichzelf in tweeën zaagde'], fact: 'Le Pétomane was een tijdlang beter betaald dan de grootste sterren.' },
  { q: 'In 2011 kreeg de Zweed Richard Handl bezoek van de politie omdat hij ___.', answer: 'in zijn keuken een kernreactor probeerde te bouwen', decoys: ['zijn huis vol had gezet met tienduizend tuinkabouters', 'een levende eland in zijn badkamer hield', 'in zijn kelder zijn eigen munten aan het slaan was'], fact: 'Hij had het zelf gevraagd aan de stralingsinstantie, of het wel mocht.' },
  { q: 'In de Middeleeuwen werden in Europa soms ___ voor de rechter gebracht.', answer: 'dieren, zoals varkens, die werden berecht en soms opgehangen', decoys: ['heksen die vervolgens werden vrijgesproken', 'lijken die nog belasting moesten betalen', 'kinderen omdat ze te hard lachten in de kerk'], spice: 2, fact: 'In 1386 werd in Falaise een varken in mensenkleren opgehangen.' },
  { q: 'Op 1 april 1957 zond de BBC een reportage uit over ___.', answer: 'de spaghettioogst in Zwitserland, en kijkers belden hoe ze zelf spaghetti konden kweken', decoys: ['de eerste mens op de maan, die nog moest gebeuren', 'pinguïns die naar Engeland vlogen', 'een koe die kon praten'], fact: 'De BBC zei dat je een takje spaghetti in een blik tomatensaus moest zetten en hopen.' },
  { q: 'Na de dood van Albert Einstein in 1955 nam de patholoog die hem onderzocht ___.', answer: 'stiekem zijn hersenen mee naar huis', decoys: ['zijn viool mee en verkocht die op een veiling', 'een afdruk van zijn gezicht', 'zijn bril als souvenir'], spice: 2, fact: 'Thomas Harvey bewaarde ze tientallen jaren, deels in potten.' },
  { q: 'De Deense sterrenkundige Tycho Brahe had volgens de verhalen een tamme eland die ___.', answer: 'dronken van de trap viel en stierf', decoys: ['zijn telescoop omver liep', 'meeging naar het hof van de koning', 'op zijn begrafenis voorop liep'], fact: 'Het beest had op een feest te veel bier gedronken.' },
  { q: 'In 1672 werden de gebroeders De Witt in Den Haag door een woedende menigte vermoord. Daarna ___.', answer: 'werden stukken van hun lichaam verkocht en zelfs opgegeten', decoys: ['werden ze tot heiligen verklaard', 'werd de menigte opgehangen op de Vijverberg', 'werd hun huis een museum'], spice: 2, fact: 'Een van hun tongen en een vinger liggen nog in het Haags Historisch Museum.' },
  { q: 'De oude Romeinen gebruikten ___ als mondwater.', answer: 'urine', accept: ['plas', 'pis'], decoys: ['wijnazijn met zout', 'zeewater', 'olijfolie'], spice: 3, fact: 'Ammoniak maakt tanden witter. Er werd zelfs urine uit Portugal ingevoerd.' },
  { q: 'In 1977 werd op een veiling in Parijs een bijzonder lichaamsdeel van Napoleon verkocht: ___.', answer: 'zijn penis', decoys: ['zijn verstandskies', 'een lok van zijn haar', 'zijn grote teen'], spice: 3, fact: 'Een Amerikaanse uroloog kocht hem. Zijn dochter heeft hem nog.' },
];
