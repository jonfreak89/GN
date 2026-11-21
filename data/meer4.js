/* Game Night – extra quizvragen (deel 4): minder bekende weetjes, verspreid over veel categorieën. */
(function (root) {
  const GN = root.GN;

  GN.addQuestions('geschiedenis', [
    { type: 'mc', q: 'Welke Romeinse keizer liet volgens de overlevering belasting heffen op urine (gebruikt door leerlooiers)?', a: ['Vespasianus', 'Nero', 'Hadrianus', 'Trajanus'], fact: 'Vandaar de uitdrukking "pecunia non olet": geld stinkt niet.' },
    { type: 'tf', q: 'Oxford University is ouder dan het Azteekse Rijk.', a: true, fact: 'Er werd in Oxford al les gegeven rond 1096; Tenochtitlan werd in 1325 gesticht.' },
    { type: 'mc', q: 'Welke Nederlandse ontdekkingsreiziger gaf zijn naam aan Tasmanië?', a: ['Abel Tasman', 'Willem Barentsz', 'Jan Pieterszoon Coen', 'Cornelis de Houtman'] },
  ]);

  GN.addQuestions('aardrijkskunde', [
    { type: 'mc', q: 'Welk Europees land heeft geen eigen leger?', a: ['IJsland', 'Zwitserland', 'Ierland', 'Malta'] },
  ]);

  GN.addQuestions('wetenschap', [
    { type: 'tf', q: 'Een theelepel materie uit een neutronenster weegt zo\'n miljard ton.', a: true },
  ]);

  GN.addQuestions('dieren', [
    { type: 'tf', q: 'Koeien hebben beste vriendinnen en raken gestrest als ze van elkaar gescheiden worden.', a: true },
    { type: 'mc', q: 'Welk dier kan zijn eigen ingewanden uitspugen om vijanden af te schrikken?', a: ['Zeekomkommer', 'Inktvis', 'Kogelvis', 'Zeester'] },
    { type: 'mc', q: 'Hoe communiceren bijen waar voedsel is?', a: ['Met een dansje', 'Met geluid', 'Met kleuren', 'Met geurvlaggen'] },
  ]);

  GN.addQuestions('eten', [
    { type: 'mc', q: 'Wat is "bossche bol"?', a: ['Een grote soes met slagroom en chocola', 'Een gehaktbal uit Den Bosch', 'Een bierglas', 'Een soort roggebrood'] },
    { type: 'tf', q: 'Wortels waren vroeger meestal paars of geel, en oranje werd pas later populair.', a: true },
    { type: 'mc', q: 'Wat is "hutspot" volgens de traditie het eten van?', a: ['Leidens Ontzet (3 oktober)', 'Koningsdag', 'Sinterklaas', 'Pasen'] },
  ]);

  GN.addQuestions('film', [
    { type: 'tf', q: 'De film "Amsterdamned" van Dick Maas heeft een achtervolging met speedboten door de grachten.', a: true },
    { type: 'tf', q: 'In de film "Jaws" werkte de mechanische haai tijdens het filmen vaak niet.', a: true, fact: 'Daarom zie je de haai zo weinig. Dat maakte de film juist spannender.' },
  ]);

  GN.addQuestions('games', [
  ]);

  GN.addQuestions('muziek', [
    { type: 'tf', q: 'Normaal komt uit de Achterhoek.', a: true },
    { type: 'mc', q: 'Welke artiest zong "Zij gelooft in mij"?', a: ['André Hazes', 'Frans Bauer', 'Jan Smit', 'Marco Borsato'] },
    { type: 'mc', q: 'Wat was de eerste muziekvideo op MTV in 1981?', a: ['Video Killed the Radio Star', 'Thriller', 'Take On Me', 'Billie Jean'] },
    { type: 'tf', q: 'Doe Maar stopte in 1984 en gaf daarna nog reünieconcerten.', a: true },
  ]);

  GN.addQuestions('records', [
    { type: 'tf', q: 'Het record voor de langste hik duurde 68 jaar.', a: true, fact: 'Charles Osborne hikte van 1922 tot 1990.' },
    { type: 'mc', q: 'Hoeveel hotdogs at Joey Chestnut in 2021 in tien minuten (wereldrecord)?', a: ['76', '35', '52', '101'] },
  ]);

  GN.addQuestions('internet', [
    { type: 'mc', q: 'Wat betekent "TL;DR"?', a: ['Te lang, niet gelezen', 'Tot later, dikke roddel', 'Tijd lopen, dan rennen', 'Teken lezen, daarna reageren'] },
    { type: 'mc', q: 'Wat is "rickrolling"?', a: ['Iemand een link sturen die stiekem naar Rick Astley leidt', 'Een dans uit TikTok', 'Een spel met dobbelstenen', 'Een soort sushi'] },
    { type: 'tf', q: 'Het allereerste YouTube-filmpje ging over olifanten in een dierentuin.', a: true, fact: '"Me at the zoo" uit 2005, 19 seconden lang.' },
    { type: 'mc', q: 'Wat is een "Karen" in internettaal?', a: ['Een veeleisende vrouw die de manager wil spreken', 'Een kat die op een toetsenbord loopt', 'Een slimme hacker', 'Een nepaccount'] },
  ]);

  GN.addQuestions('uitvindingen', [
    { type: 'tf', q: 'De magnetron werd uitgevonden toen een ingenieur merkte dat een radar zijn chocoladereep in zijn zak liet smelten.', a: true },
    { type: 'mc', q: 'Wat vond de Nederlander Cornelis Drebbel in de 17e eeuw uit?', a: ['Een duikboot die onder water voer', 'De microscoop', 'Het fornuis', 'De slinger-klok'] },
    { type: 'tf', q: 'De cassettebandje werd ontwikkeld door het Nederlandse bedrijf Philips.', a: true },
  ]);

  GN.addQuestions('middeleeuwen', [
    { type: 'tf', q: 'In de Middeleeuwen werden zwaarden soms een naam gegeven, net als huisdieren.', a: true },
    { type: 'mc', q: 'Wat deed een "barbier-chirurgijn"?', a: ['Haren knippen én aderlaten en tanden trekken', 'Alleen baarden scheren', 'Soldaten opereren op het slagveld', 'Paarden beslaan'] },
    { type: 'bluff', q: 'In de Middeleeuwen was een "schandmantel" ___.', answer: 'een houten ton die je als straf door de stad moest dragen', decoys: ['een mantel voor verliefde paren', 'een cape voor ridders die verloren', 'een deken voor zieken in het gasthuis'] },
  ]);

  GN.addQuestions('rampen', [
  ]);

  GN.addQuestions('hoaxes', [
    { type: 'mc', q: 'Wat was de "Piltdown-man"?', a: ['Een nep-fossiel van een oermens, gemaakt van een mensenschedel en een apenkaak', 'Een geest in een Engelse kerk', 'Een nep-buitenaards wezen', 'Een vervalst schilderij'] },
    { type: 'tf', q: 'De graancirkels in Engeland werden in 1991 door twee mannen opgeëist: ze maakten ze met een plank en touw.', a: true },
    { type: 'mc', q: 'Wat beweert de "maanlandingshoax"?', a: ['Dat de maanlanding in een studio is nagespeeld', 'Dat de maan van kaas is', 'Dat de maan niet bestaat', 'Dat de Russen eerst op de maan waren'] },
  ]);

  GN.addQuestions('spook', [
  ]);

  GN.addQuestions('truecrime', [
    { type: 'mc', q: 'Welke Nederlander ontvoerde in 1983 Freddy Heineken samen met handlangers?', a: ['Cor van Hout en Willem Holleeder (met anderen)', 'Klaas Bruinsma', 'Peter R. de Vries', 'Johan Derksen'] },
  ]);

  GN.addQuestions('schandalen', [
  ]);

  GN.addQuestions('jaren', [
    { type: 'mc', q: 'Wat was een Tamagotchi?', a: ['Een digitaal huisdiertje aan een sleutelhanger', 'Een soort sushi', 'Een Japanse spelcomputer', 'Een rekenmachine'] },
    { type: 'mc', q: 'Welk ding moest je terugspoelen met een potlood?', a: ['Een cassettebandje', 'Een cd', 'Een floppy disk', 'Een videoband'] },
    { type: 'mc', q: 'Welk spel speelde je met flippo\'s?', a: ['Ze tegen een muur gooien of op elkaar stapelen', 'Kaarten ruilen', 'Knikkeren', 'Elastieken'] },
  ]);

  GN.addQuestions('liefde', [
    { type: 'tf', q: 'Volgens onderzoek kost een gemiddelde zoen zo\'n 2 tot 6 calorieën per minuut.', a: true },
  ]);

  GN.addQuestions('dating', [
    { type: 'mc', q: 'Wat is een "red flag"?', a: ['Een waarschuwingsteken dat iemand niet deugt', 'Een sexy jurk', 'Een rode roos op de eerste date', 'Een liefdesbrief'] },
    { type: 'tf', q: 'Veel mensen beslissen al in de eerste paar minuten van een date of ze iemand leuk vinden.', a: true },
  ]);

  GN.addQuestions('stoutgeschiedenis', [
    { type: 'mc', q: 'Waarvan werden in de 18e eeuw condooms vaak gemaakt?', a: ['Schapendarmen', 'Rubber', 'Zijde', 'Leer van varkens'] },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
