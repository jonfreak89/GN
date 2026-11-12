/* Waar of nep: stellingen voor de bestaande categorieën.
   (Daarnaast maken de generatoren automatisch stellingen van bluf-vragen.) */

GN.addQuestions('nederland', [
  { type: 'tf', q: 'Den Haag is de hoofdstad van Nederland.', a: false, fact: 'Amsterdam is de hoofdstad; Den Haag is de regeringsstad.' },
  { type: 'tf', q: 'Flevoland lag ooit onder water.', a: true },
  { type: 'tf', q: 'Ongeveer een kwart van Nederland ligt onder zeeniveau.', a: true },
  { type: 'tf', q: 'Texel is het grootste Waddeneiland.', a: true },
  { type: 'tf', q: 'De Domtoren in Utrecht is hoger dan de Euromast.', a: false, fact: 'Domtoren 112 meter, Euromast 185 meter.' },
  { type: 'tf', q: 'Nederland heeft meer fietsen dan inwoners.', a: true },
]);
GN.addQuestions('geschiedenis', [
  { type: 'tf', q: 'De Honderdjarige Oorlog duurde precies 100 jaar.', a: false, fact: 'Het waren er 116.' },
  { type: 'tf', q: 'Napoleon was opvallend klein voor zijn tijd.', a: false },
  { type: 'tf', q: 'De VOC werd opgericht in 1602.', a: true },
  { type: 'tf', q: 'Cleopatra was van Egyptische afkomst.', a: false, fact: 'Ze stamde uit een Macedonisch-Griekse familie.' },
  { type: 'tf', q: 'Vikingen droegen helmen met hoorns.', a: false, fact: 'Dat beeld komt uit 19e-eeuwse opera\'s.' },
  { type: 'tf', q: 'De piramides werden gebouwd door slaven.', a: false, fact: 'Volgens archeologen vooral door betaalde arbeiders.' },
]);
GN.addQuestions('aardrijkskunde', [
  { type: 'tf', q: 'Australië is breder dan de maan.', a: true, fact: 'Australië is zo\'n 4.000 km breed, de maan 3.474 km.' },
  { type: 'tf', q: 'De Sahara is de grootste woestijn ter wereld.', a: false, fact: 'Antarctica is groter: ook een woestijn.' },
  { type: 'tf', q: 'Rusland grenst aan Noorwegen.', a: true },
  { type: 'tf', q: 'De Mount Everest is de hoogste berg, gemeten vanaf de voet op de zeebodem.', a: false, fact: 'Dat is de Mauna Kea op Hawaï.' },
  { type: 'tf', q: 'Istanbul is de hoofdstad van Turkije.', a: false, fact: 'Dat is Ankara.' },
  { type: 'tf', q: 'Er zijn meer dan 190 landen lid van de Verenigde Naties.', a: true },
]);
GN.addQuestions('wetenschap', [
  { type: 'tf', q: 'Bliksem slaat nooit twee keer op dezelfde plek in.', a: false, fact: 'Het Empire State Building wordt zo\'n 20 keer per jaar geraakt.' },
  { type: 'tf', q: 'Mensen gebruiken maar 10% van hun hersenen.', a: false },
  { type: 'tf', q: 'Op de maan kun je geen geluid horen.', a: true },
  { type: 'tf', q: 'Diamant bestaat uit koolstof.', a: true },
  { type: 'tf', q: 'Het is in de zomer warmer omdat de aarde dan dichter bij de zon staat.', a: false, fact: 'Het komt door de schuine stand van de aardas.' },
  { type: 'tf', q: 'Venus is de heetste planeet van ons zonnestelsel.', a: true, fact: 'Heter dan Mercurius, door een enorm broeikaseffect.' },
]);
GN.addQuestions('dieren', [
  { type: 'tf', q: 'Goudvissen hebben een geheugen van drie seconden.', a: false, fact: 'Ze onthouden dingen maandenlang.' },
  { type: 'tf', q: 'Struisvogels steken hun kop in het zand als ze bang zijn.', a: false },
  { type: 'tf', q: 'Haaien bestonden al voordat er bomen waren.', a: true },
  { type: 'tf', q: 'Vleermuizen zijn blind.', a: false },
  { type: 'tf', q: 'Een octopus heeft drie harten.', a: true },
  { type: 'tf', q: 'Koala\'s zijn beren.', a: false, fact: 'Het zijn buideldieren.' },
]);
GN.addQuestions('eten', [
  { type: 'tf', q: 'Witte chocolade bevat geen cacaopoeder.', a: true, fact: 'Alleen cacaoboter.' },
  { type: 'tf', q: 'Honing kan in principe nooit bederven.', a: true },
  { type: 'tf', q: 'Sushi betekent "rauwe vis".', a: false, fact: 'Het gaat om de rijst met azijn.' },
  { type: 'tf', q: 'Een tomaat is botanisch gezien een vrucht.', a: true },
  { type: 'tf', q: 'Een banaan groeit aan een boom.', a: false, fact: 'De bananenplant is een reuzenkruid.' },
]);
GN.addQuestions('film', [
  { type: 'tf', q: 'Darth Vader zegt in Star Wars letterlijk "Luke, I am your father".', a: false, fact: 'Hij zegt "No, I am your father".' },
  { type: 'tf', q: 'Jurassic Park kwam uit in 1993.', a: true },
  { type: 'tf', q: 'Titanic won 11 Oscars.', a: true },
  { type: 'tf', q: 'Rutger Hauer speelde mee in Blade Runner.', a: true },
  { type: 'tf', q: 'Friends had 12 seizoenen.', a: false, fact: 'Het waren er 10.' },
]);
GN.addQuestions('weetjes', [
  { type: 'tf', q: 'De Chinese Muur is met het blote oog vanuit de ruimte te zien.', a: false },
  { type: 'tf', q: 'Er leven meer kippen dan mensen op aarde.', a: true },
  { type: 'tf', q: 'Donderdag is vernoemd naar de god Thor.', a: true },
  { type: 'tf', q: 'China gebruikt vijf tijdzones.', a: false, fact: 'Officieel maar één.' },
  { type: 'tf', q: 'De zwarte doos van een vliegtuig is oranje.', a: true },
]);
GN.addQuestions('echtgebeurd', [
  { type: 'tf', q: 'Het Australische leger verloor in 1932 een "oorlog" tegen emoes.', a: true },
  { type: 'tf', q: 'Een kip leefde ooit anderhalf jaar zonder kop.', a: true },
  { type: 'tf', q: 'Larry Walters vloog in 1982 met een tuinstoel en ballonnen hoger dan 4 kilometer.', a: true },
  { type: 'tf', q: 'België had in 2010-2011 ruim een jaar geen nieuwe regering.', a: true, fact: '541 dagen.' },
]);
GN.addQuestions('flop', [
  { type: 'tf', q: 'New Coke werd binnen een week weer van de markt gehaald.', a: false, fact: 'Het duurde 79 dagen.' },
  { type: 'tf', q: 'Philips maakte de CD-i.', a: true },
  { type: 'tf', q: 'Betamax won de strijd van VHS.', a: false },
  { type: 'tf', q: 'Quibi bestond ruim vijf jaar.', a: false, fact: 'Nog geen jaar.' },
]);
GN.addQuestions('uitvindingen', [
  { type: 'tf', q: 'De Segway werd uitgevonden door Steve Jobs.', a: false, fact: 'Door Dean Kamen.' },
  { type: 'tf', q: 'De Concorde vloog sneller dan het geluid.', a: true },
  { type: 'tf', q: 'De Spruce Goose heeft maar één keer gevlogen.', a: true },
  { type: 'tf', q: 'Er is ooit een echte auto met een kernreactor gebouwd.', a: false },
]);
GN.addQuestions('internet', [
  { type: 'tf', q: 'De eerste YouTube-video speelt zich af in een dierentuin.', a: true },
  { type: 'tf', q: 'Het eerste wat op eBay werd verkocht, was een iPhone.', a: false, fact: 'Een kapotte laserpointer, in 1995.' },
  { type: 'tf', q: '"The Dress" was in het echt blauw met zwart.', a: true },
  { type: 'tf', q: 'Een tweet mocht oorspronkelijk 280 tekens lang zijn.', a: false, fact: 'Eerst 140, sinds 2017 280.' },
]);
GN.addQuestions('records', [
  { type: 'tf', q: 'De oudste mens ooit werd 122 jaar.', a: true },
  { type: 'tf', q: 'Usain Bolt liep de 100 meter in minder dan 9,5 seconden.', a: false, fact: '9,58 seconden.' },
  { type: 'tf', q: 'De Burj Khalifa is meer dan 800 meter hoog.', a: true },
  { type: 'tf', q: 'Ireen Wüst won meer olympisch goud dan Sven Kramer.', a: true },
]);
GN.addQuestions('morbide', [
  { type: 'tf', q: 'Haar en nagels groeien door na de dood.', a: false },
  { type: 'tf', q: 'De mug is het dodelijkste dier voor mensen.', a: true },
  { type: 'tf', q: 'In de catacomben van Parijs liggen miljoenen mensen.', a: true },
  { type: 'tf', q: 'Einsteins hersenen werden na zijn dood zonder toestemming bewaard.', a: true },
]);
GN.addQuestions('middeleeuwen', [
  { type: 'tf', q: 'Mensen in de middeleeuwen dachten dat de aarde plat was.', a: false, fact: 'Geleerden wisten allang dat de aarde rond is.' },
  { type: 'tf', q: 'In de middeleeuwen konden dieren voor de rechter komen.', a: true },
  { type: 'tf', q: 'Ridders in harnas konden niet zelf opstaan als ze vielen.', a: false, fact: 'Een goed harnas was verrassend beweeglijk.' },
  { type: 'tf', q: 'De Zwarte Dood bereikte Europa in 1347.', a: true },
]);
GN.addQuestions('rampen', [
  { type: 'tf', q: 'De Titanic had genoeg reddingssloepen voor iedereen aan boord.', a: false },
  { type: 'tf', q: 'De toren van Pisa zakte al tijdens de bouw scheef.', a: true },
  { type: 'tf', q: 'De Grote Brand van Londen begon in een bakkerij.', a: true },
  { type: 'tf', q: 'De Watersnoodramp was in 1963.', a: false, fact: 'In 1953.' },
]);
GN.addQuestions('truecrime', [
  { type: 'tf', q: 'Al Capone werd veroordeeld voor belastingontduiking.', a: true },
  { type: 'tf', q: 'De Mona Lisa is ooit gestolen.', a: true },
  { type: 'tf', q: 'Jack the Ripper werd uiteindelijk gepakt.', a: false },
  { type: 'tf', q: 'D.B. Cooper is nooit gevonden.', a: true },
]);
GN.addQuestions('lichaam', [
  { type: 'tf', q: 'De tong is de sterkste spier van je lichaam.', a: false },
  { type: 'tf', q: 'Baby\'s hebben meer botten dan volwassenen.', a: true },
  { type: 'tf', q: 'Je kunt niet niezen met je ogen open.', a: false, fact: 'Het kan wel, het is alleen een reflex om ze te sluiten.' },
  { type: 'tf', q: 'Een scheet ruikt vooral door methaan.', a: false, fact: 'Methaan is reukloos; zwavelverbindingen maken de geur.' },
]);
GN.addQuestions('liefde', [
  { type: 'tf', q: 'Oxytocine wordt ook wel het knuffelhormoon genoemd.', a: true },
  { type: 'tf', q: 'De Kama Sutra gaat alleen over seksstandjes.', a: false, fact: 'Het grootste deel gaat over liefde, relaties en goed leven.' },
  { type: 'tf', q: 'Viagra was eerst bedoeld als medicijn tegen hartklachten.', a: true },
]);
GN.addQuestions('dating', [
  { type: 'tf', q: 'Tinder werd gelanceerd in 2012.', a: true },
  { type: 'tf', q: 'Bij Bumble stuurt bij een man-vrouw-match de man het eerste bericht.', a: false },
  { type: 'tf', q: 'Match.com bestaat al sinds de jaren 90.', a: true },
]);
