/* Game Night – extra quizvragen (deel 5): rare, grappige en zwarte weetjes, veel om te bluffen. */
(function (root) {
  const GN = root.GN;

  GN.addQuestions('doden', [
    { type: 'bluff', q: 'In 1871 schoot de Amerikaanse advocaat Clement Vallandigham zichzelf per ongeluk dood terwijl hij ___.', answer: 'in de rechtszaal liet zien hoe het slachtoffer zichzelf per ongeluk had kunnen neerschieten', decoys: ['een pistool schoonmaakte in de rechtbankkantine', 'een weddenschap won dat het wapen niet geladen was', 'op zijn verjaardag in de lucht schoot'], fact: 'Zijn cliënt werd vrijgesproken: hij had bewezen dat het kon.' },
    { type: 'bluff', q: 'De Engelse koning George II overleed in 1760 op ___.', answer: 'de wc', decoys: ['zijn paard', 'het jachtveld', 'de troon tijdens een toespraak'] },
    { type: 'tf', q: 'De Griekse filosoof Chrysippus zou zich doodgelachen hebben om een ezel die vijgen at.', a: true, fact: 'Hij gaf de ezel ook nog wijn en lachte zo hard dat hij stierf, volgens de verhalen.' },
    { type: 'mc', q: 'Waaraan overleed paus Adrianus IV volgens de overlevering in 1159?', a: ['Hij stikte in een vlieg in zijn wijn', 'Hij viel van zijn ezel', 'Hij at bedorven mosselen', 'Een kerkklok viel op zijn hoofd'] },
    { type: 'bluff', q: 'De astronoom Tycho Brahe overleed in 1601 omdat hij uit beleefdheid niet wilde ___.', answer: 'van tafel opstaan om naar de wc te gaan', decoys: ['de wijn van de koning weigeren', 'zijn handschoenen uittrekken in de kou', 'de keizer onderbreken tijdens zijn speech'], fact: 'Waarschijnlijk had hij een blaasprobleem. Hij stierf elf dagen later.' },
    { type: 'tf', q: 'Volgens Ottomaanse documenten kwam in 1888 in het huidige Irak een man om door een meteoriet.', a: true, fact: 'Ann Hodges werd in 1954 in de VS op haar bank door een meteoriet geraakt, maar zij overleefde het.' },
    { type: 'bluff', q: 'In 2005 overleed een Zuid-Koreaanse man nadat hij ___ achter elkaar had gegamed.', answer: '50 uur', decoys: ['7 dagen', '20 uur', '3 weken'] },
    { type: 'tf', q: 'Er zijn mensen omgekomen door te veel water drinken bij een drinkwedstrijd.', a: true, fact: 'Bij een radiowedstrijd in Californië in 2007 overleed een vrouw aan watervergiftiging.' },
    { type: 'bluff', q: 'Volgens de verhalen overleed de Franse koning Karel VIII in 1498 nadat hij ___.', answer: 'zijn hoofd stootte tegen een deurpost', decoys: ['in een tennisbal stikte', 'van zijn troon viel tijdens een feest', 'door zijn eigen hond werd gebeten'] },
    { type: 'bluff', q: 'De Amerikaanse uitvinder William Bullock, van de rotatiepers, overleed nadat hij ___.', answer: 'met zijn been in zijn eigen drukpers terechtkwam', decoys: ['een vel papier inslikte', 'door een vallende stapel kranten werd geplet', 'zich sneed aan een vers gedrukt boek'] },
  ]);

  GN.addQuestions('weetjes', [
    { type: 'tf', q: 'Een wolk kan honderden tonnen wegen.', a: true },
    { type: 'bluff', q: 'Het Engelse woord "nice" betekende vroeger ___.', answer: 'dom of onwetend', decoys: ['heel duur', 'snel', 'verdrietig'] },
    { type: 'mc', q: 'Wat is "hygge"?', a: ['Het Deense gevoel van knusse gezelligheid', 'Een Zweeds gebakje', 'Een Noorse sport op ijs', 'Een IJslands volksliedje'] },
    { type: 'tf', q: 'In Japan bestaat een eiland waar vooral katten wonen.', a: true },
    { type: 'bluff', q: 'Een "jiffy" is een echte tijdseenheid: zo\'n ___.', answer: 'honderdste seconde (in de elektronica)', decoys: ['minuut', 'dag', 'tiende jaar'] },
    { type: 'bluff', q: 'In Frankrijk is het wettelijk toegestaan om ___ te trouwen, als je bewijst dat je dat samen van plan was.', answer: 'met een overleden partner', decoys: ['met jezelf', 'met je huisdier', 'met een boom'], fact: 'Het heet "mariage posthume" en de president moet toestemming geven.' },
  ]);

  GN.addQuestions('echtgebeurd', [
    { type: 'bluff', q: 'In 2018 verkocht kunstenaar Banksy een schilderij op een veiling voor ruim een miljoen pond. Direct na de verkoop ___.', answer: 'werd het door een verstopte papierversnipperaar in de lijst half versnipperd', decoys: ['viel het van de muur en brak de lijst', 'bleek het een vervalsing te zijn', 'ging het brandalarm af en werd het nat'], fact: 'Het werk heet nu "Love is in the Bin" en werd later voor veel meer verkocht.' },
    { type: 'tf', q: 'Een Nieuw-Zeelandse schaap genaamd Shrek ontsnapte zes jaar lang en had daarna zo\'n 27 kilo wol.', a: true },
    { type: 'bluff', q: 'In 1983 ging de Duitse Stern-redactie diep door het stof omdat ze ___ hadden gepubliceerd.', answer: 'vervalste dagboeken van Hitler', decoys: ['een nepinterview met de paus', 'een verzonnen ontdekking van Atlantis', 'nepfoto\'s van een ufo boven Berlijn'] },
    { type: 'tf', q: 'Een Amerikaanse man reed ooit met een grasmaaier honderden kilometers om zijn zieke broer te bezoeken.', a: true, fact: 'Alvin Straight, 1994. Er is zelfs een film over: "The Straight Story".' },
    { type: 'tf', q: 'Er is een Noors stadje waar je niet begraven mag worden, omdat lichamen er in de bevroren grond niet vergaan.', a: true, fact: 'Longyearbyen op Spitsbergen. Wie ernstig ziek is, wordt naar het vasteland gebracht.' },
  ]);

  GN.addQuestions('kater', [
    { type: 'bluff', q: 'In Polen drinken sommigen tegen een kater ___.', answer: 'het zuur van ingemaakte augurken', decoys: ['warme melk met peper', 'koude koffie met citroen', 'rauw ei met wodka'] },
    { type: 'bluff', q: 'In Mongolië is een traditioneel katermiddel ___.', answer: 'een ingelegd schapenoog in tomatensap', decoys: ['gebakken sprinkhanen', 'paardenmelk met zout', 'yakboter op toast'] },
  ]);

  GN.addQuestions('bier', [
    { type: 'bluff', q: 'Het sterkste bier ter wereld heeft ongeveer ___ alcohol.', answer: '67%', decoys: ['15%', '25%', '40%'], fact: 'Het Schotse "Snake Venom" en vergelijkbare bieren worden ingevroren om water te verwijderen.' },
    { type: 'mc', q: 'Wat is een "rondje geven"?', a: ['Iedereen in je gezelschap een drankje betalen', 'Een dansje rond de bar', 'Je glas leegdrinken in één keer', 'Een toost uitbrengen'] },
  ]);

  GN.addQuestions('criminelen', [
    { type: 'tf', q: 'Er zijn inbrekers gepakt omdat ze tijdens de inbraak in slaap vielen in het bed van de bewoners.', a: true },
    { type: 'bluff', q: 'In 2016 stalen drie mensen in Texas een ___ uit een aquarium en reden ermee weg in een kinderwagen.', answer: 'levende haai', decoys: ['zeeleeuw', 'pinguïn', 'reuzenschildpad'], fact: 'De haai werd later teruggevonden en maakte het goed.' },
  ]);

  GN.addQuestions('stoutgeschiedenis', [
    { type: 'bluff', q: 'In het oude Rome werd ___ als lustopwekkend middel gebruikt.', answer: 'gekookte rucola', decoys: ['gebakken uien', 'gezouten haring', 'rauwe knoflook'] },
    { type: 'tf', q: 'Koningin Victoria kreeg negen kinderen.', a: true },
    { type: 'bluff', q: 'Een 17e-eeuwse Franse modetrend voor rijke vrouwen was ___.', answer: 'nepschoonheidsvlekjes van zwart fluweel op het gezicht', decoys: ['haren in de vorm van een schip', 'tandvlees blauw verven', 'oorringen van levende kevers'], fact: 'De "mouches" verborgen ook pokputten. Waar je ze plakte, zei iets over je bedoelingen.' },
    { type: 'tf', q: 'Bij het oude Romeinse feest Lupercalia renden jonge mannen halfnaakt door de stad en sloegen vrouwen met reepjes geitenvel.', a: true, fact: 'Dat zou helpen om zwanger te worden.' },
    { type: 'mc', q: 'Waarvoor werden ouderwetse "kuisheidsgordels" vooral bekend, ook al zijn de meeste waarschijnlijk later nagemaakt?', a: ['Om vrouwen "trouw" te houden terwijl ridders weg waren', 'Om ridders te beschermen tegen pijlen', 'Om rugpijn te voorkomen', 'Als sieraad op bruiloften'] },
  ]);

  GN.addQuestions('lichaam', [
    { type: 'bluff', q: 'De gemiddelde mens brengt in zijn leven zo\'n ___ door op de wc.', answer: 'anderhalf jaar', decoys: ['twee weken', 'zes jaar', 'twee maanden'] },
    { type: 'bluff', q: 'Je maag maakt elke ___ een nieuwe slijmlaag aan, anders zou het zuur hem verteren.', answer: 'paar dagen', decoys: ['minuut', 'jaar', 'maand'] },
    { type: 'bluff', q: 'Het geluid van knakkende knokkels komt door ___.', answer: 'gasbelletjes in het gewrichtsvocht', decoys: ['botten die tegen elkaar schuren', 'pezen die over elkaar springen', 'lucht die uit je spieren ontsnapt'] },
    { type: 'tf', q: 'Ruim de helft van de cellen in je lichaam is geen menselijke cel, maar bacterie.', a: true, fact: 'Ongeveer half-half volgens nieuwe tellingen. In gewicht is het maar zo\'n 200 gram.' },
    { type: 'mc', q: 'Welk orgaan kun je voor een groot deel weghalen en groeit weer aan?', a: ['De lever', 'De nier', 'Het hart', 'De long'] },
  ]);

  GN.addQuestions('liefde', [
    { type: 'bluff', q: 'Volgens onderzoek is de meest voorkomende plek waar stellen elkaar tegenwoordig leren kennen ___.', answer: 'online', decoys: ['op het werk', 'in de kroeg', 'via vrienden'] },
    { type: 'tf', q: 'Het "seven-year itch" (zevenjaarsjeuk) is een uitdrukking voor relatieproblemen na een jaar of zeven.', a: true },
    { type: 'bluff', q: 'In de 19e eeuw schreven verliefden in Engeland elkaar berichtjes in ___, de taal van bloemen.', answer: 'floriografie', decoys: ['florsch', 'bloemenschrift', 'petalisch'] },
    { type: 'mc', q: 'Welke vogel wordt geassocieerd met de baby brengen?', a: ['Ooievaar', 'Zwaan', 'Uil', 'Pelikaan'] },
  ]);

  GN.addQuestions('morbide', [
    { type: 'bluff', q: 'In Victoriaans Engeland kon je een doodskist kopen met ___ voor het geval je levend begraven was.', answer: 'een belletje aan een touw naar boven', decoys: ['een luchtpijpje en een fles water', 'een raampje in het deksel', 'een ingebouwde trompet'] },
    { type: 'tf', q: 'In Madagaskar graven sommige families hun doden af en toe op om met ze te dansen.', a: true, fact: 'Het ritueel heet famadihana: het keren van de beenderen.' },
    { type: 'bluff', q: 'Een bedrijf in de VS kan je as na je dood laten verwerken tot ___.', answer: 'een diamant', decoys: ['een zak cement', 'een fietsbel', 'een tuinkabouter'] },
    { type: 'tf', q: 'Je kunt je as laten verwerken in een vinylplaat met je eigen favoriete muziek.', a: true },
  ]);

  GN.addQuestions('dating', [
    { type: 'bluff', q: 'Uit onderzoek blijkt dat de meest gelogen dingen op datingprofielen gaan over lengte, gewicht en ___.', answer: 'leeftijd', decoys: ['hobby\'s', 'woonplaats', 'huisdieren'] },
    { type: 'tf', q: 'Op de eerste date samen een spannende activiteit doen (zoals een achtbaan) kan de aantrekkingskracht vergroten.', a: true, fact: 'De spanning wordt deels aan de ander toegeschreven: het "brugexperiment" uit 1974.' },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
