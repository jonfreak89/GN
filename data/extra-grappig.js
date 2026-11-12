/* Aanvulling 1: Grappig & raar */

GN.addQuestions('weetjes', [
  { type: 'mc', q: 'Hoe heet de angst voor clowns?', a: ['Coulrofobie', 'Clownofobie', 'Pierrofobie', 'Arlequinofobie'] },
  { type: 'mc', q: 'Welke taal hebben de meeste mensen als moedertaal?', a: ['Mandarijn-Chinees', 'Engels', 'Spaans', 'Hindi'] },
  { type: 'mc', q: 'Hoeveel tijdzones gebruikt China officieel?', a: ['1', '3', '5', '7'], fact: 'Terwijl het land eigenlijk vijf tijdzones breed is.' },
  { type: 'mc', q: 'Wat zat er oorspronkelijk in Coca-Cola?', a: ['Cocaïne uit cocabladeren', 'Absint', 'Opium', 'Kinine'] },
  { type: 'mc', q: 'Hoeveel procent van de mensen is ongeveer linkshandig?', a: ['10%', '25%', '2%', '33%'] },
  { type: 'mc', q: 'Welk land heeft een vlag die niet rechthoekig is?', a: ['Nepal', 'Zwitserland', 'Bhutan', 'Japan'], fact: 'Zwitserland heeft een vierkante vlag, maar dat telt nog als rechthoek.' },
  { type: 'mc', q: 'Welke dag van de week is genoemd naar de god Thor?', a: ['Donderdag', 'Dinsdag', 'Woensdag', 'Vrijdag'] },
  { type: 'mc', q: 'Hoeveel letters telt het Hawaïaanse alfabet?', a: ['13', '18', '26', '9'], d: 3, fact: 'Vijf klinkers, acht medeklinkers (inclusief de ʻokina).' },
  { type: 'mc', q: 'Waaraan is de dag "zaterdag" vernoemd?', a: ['De Romeinse god Saturnus', 'De zaaitijd', 'Het woord "zat"', 'Een Germaanse godin'] },
  { type: 'num', q: 'Hoeveel botten heeft een pasgeboren baby ongeveer?', answer: 300, fact: 'Zo\'n 270 tot 300: veel botten groeien later samen tot de 206 van een volwassene.' },
  { type: 'num', q: 'Hoeveel liter water past er in een olympisch zwembad?', answer: 2500000, unit: 'liter' },
  { type: 'bluff', q: 'De "zwarte doos" van een vliegtuig is eigenlijk ___.', answer: 'oranje', accept: ['fel oranje'], decoys: ['rood', 'geel', 'grijs'], fact: 'Zodat je hem makkelijker terugvindt.' },
  { type: 'bluff', q: 'Shakespeare wordt gezien als de bedenker van het Engelse woord "___".', answer: 'swagger', decoys: ['awesome', 'gadget', 'selfie'] },
  {
    type: 'order', q: 'Zet deze talen op aantal moedertaalsprekers', lo: 'Minste', hi: 'Meeste', fmt: '± {v} miljoen',
    items: [['Nederlands', 25], ['Japans', 123], ['Hindi', 345], ['Spaans', 485], ['Mandarijn', 940]],
  },
]);

GN.addQuestions('echtgebeurd', [
  { type: 'mc', q: 'Welke vogel probeerde China in 1958 uit te roeien, met een hongersnood als gevolg?', a: ['De mus', 'De duif', 'De kraai', 'De ekster'], fact: 'Zonder mussen kregen insecten vrij spel op de oogst.' },
  { type: 'mc', q: 'Wat brak er in 1962 uit in Tanganyika (nu Tanzania)?', a: ['Een lachepidemie', 'Een hikepidemie', 'Een danspest', 'Een slaapziekte zonder oorzaak'], fact: 'Scholen moesten maandenlang dicht.' },
  { type: 'mc', q: 'Welk land had in 2010-2011 een wereldrecord aantal dagen geen nieuwe regering?', a: ['België', 'Italië', 'Nederland', 'Spanje'] },
  { type: 'mc', q: 'Waarom moest een Air Canada-vliegtuig in 1983 zonder brandstof zweven naar een landing?', a: ['Iemand rekende met ponden in plaats van kilo\'s', 'De tank lekte door een kogel', 'De piloot vergat te tanken', 'Een vogel blokkeerde de leiding'] },
  { type: 'mc', q: 'Waarmee vloog Larry Walters in 1982 tot ruim 4 kilometer hoogte?', a: ['Een tuinstoel met heliumballonnen', 'Een zelfgebouwde helikopter', 'Een vlieger', 'Een paraplu'] },
  { type: 'mc', q: 'Tot welk jaar bleef de Japanse soldaat Hiroo Onoda doorvechten, omdat hij niet geloofde dat WOII voorbij was?', a: ['1974', '1950', '1962', '1989'] },
  { type: 'mc', q: 'Welk dier voorspelde in 2010 alle WK-wedstrijden van Duitsland goed?', a: ['Een octopus', 'Een papegaai', 'Een cavia', 'Een olifant'] },
  { type: 'num', q: 'Hoeveel dagen zat België in 2010-2011 zonder nieuwe regering?', answer: 541, unit: 'dagen' },
  { type: 'num', q: 'Hoeveel jaar na het einde van WOII gaf Hiroo Onoda zich over?', answer: 29, unit: 'jaar' },
  { type: 'num', q: 'Hoe hoog vloog Larry Walters ongeveer met zijn tuinstoel?', answer: 4900, unit: 'meter' },
  { type: 'bluff', q: 'De Air Canada-vlucht die in 1983 zonder brandstof kwam te zitten, kreeg de bijnaam "de ___ Glider".', answer: 'Gimli', decoys: ['Toronto', 'Maple', 'Moose'], fact: 'Hij landde veilig op een oude luchtmachtbasis in Gimli, waar net een autorace bezig was.' },
  { type: 'bluff', q: 'Larry Walters wilde na zijn tuinstoelvlucht weer naar beneden door ___.', answer: 'ballonnen kapot te schieten', accept: ['ballonnen stuk te schieten', 'met een luchtbuks ballonnen kapot te schieten', 'op de ballonnen te schieten'], decoys: ['te springen met een parachute', 'zand uit te gooien', 'een anker uit te werpen'] },
  {
    type: 'order', q: 'Zet deze gebeurtenissen in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['De mussenoorlog in China', 1958], ['De lachepidemie in Tanganyika', 1962], ['Onoda geeft zich over', 1974], ['De tuinstoelvlucht', 1982], ['Octopus Paul voorspelt het WK', 2010], ['België 541 dagen zonder regering', 2011]],
  },
]);

GN.addQuestions('flop', [
  { type: 'mc', q: 'Welk videoformaat van Sony verloor de strijd van VHS?', a: ['Betamax', 'Video 2000', 'LaserDisc', 'MiniDisc'] },
  { type: 'mc', q: 'Welk Nederlands bedrijf flopte in de jaren 90 met de CD-i?', a: ['Philips', 'Grundig', 'TomTom', 'Océ'] },
  { type: 'mc', q: 'Welk HD-formaat verloor de strijd van Blu-ray?', a: ['HD DVD', 'Super DVD', 'Video CD', 'UMD'] },
  { type: 'mc', q: 'Wat was Quibi (2020)?', a: ['Een streamingdienst met korte filmpjes voor de telefoon', 'Een opvouwbare telefoon', 'Een maaltijdbox', 'Een elektrische step'], fact: 'Het haalde bijna 2 miljard dollar op en stopte na ongeveer een half jaar.' },
  { type: 'mc', q: 'In welke "lelijkste auto ooit" reed Walter White in Breaking Bad?', a: ['Pontiac Aztek', 'Fiat Multipla', 'Reliant Robin', 'AMC Gremlin'] },
  { type: 'mc', q: 'Wat was de laatste spelcomputer van Sega?', a: ['De Dreamcast', 'De Saturn', 'De Mega Drive', 'De Game Gear'] },
  { type: 'mc', q: 'Welk sociaal netwerk van Apple flopte in 2010?', a: ['Ping', 'iConnect', 'AppleBook', 'FaceTime Social'], d: 3 },
  { type: 'mc', q: 'Wat was de "Google Glass"-concurrent van Snapchat?', a: ['Spectacles', 'Snapglass', 'SnapEyes', 'Ghostlens'], d: 2 },
  { type: 'mc', q: 'Welke bekende telefoonfabrikant miste de smartphone-boot en verkocht zijn telefoontak aan Microsoft?', a: ['Nokia', 'Siemens', 'Ericsson', 'Motorola'] },
  { type: 'mc', q: 'Waarom flopte de Fiat Multipla volgens veel autofans?', a: ['Hij was spectaculair lelijk', 'Hij kon niet achteruit', 'Hij was te snel', 'Hij had maar drie wielen'] },
  { type: 'num', q: 'In welk jaar bracht Philips de CD-i uit?', answer: 1991 },
  { type: 'num', q: 'Hoeveel miljard dollar haalde Quibi op voordat het na een half jaar stopte?', answer: 1.75, unit: 'miljard dollar' },
  { type: 'bluff', q: 'Clairol bracht in 1979 een shampoo uit met ___ erin.', answer: 'yoghurt', decoys: ['mosterd', 'augurk', 'cola'] },
  { type: 'bluff', q: 'De Nokia N-Gage, een telefoon die ook spelcomputer was, kreeg vanwege zijn vorm de bijnaam "___ phone".', answer: 'taco', decoys: ['banana', 'sandwich', 'frisbee'], fact: 'Je moest hem ook nog op zijn kant tegen je oor houden om te bellen.' },
  {
    type: 'order', q: 'Zet deze flops in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Betamax', 1975], ['Philips CD-i', 1991], ['Sega Dreamcast', 1998], ['Nokia N-Gage', 2003], ['HD DVD', 2006], ['Quibi', 2020]],
  },
]);

GN.addQuestions('uitvindingen', [
  { type: 'mc', q: 'Hoeveel wielen had de futuristische Dymaxion-auto uit 1933?', a: ['3', '2', '5', '6'] },
  { type: 'mc', q: 'Wat was het Sovjet-"Kaspische Zeemonster"?', a: ['Een gigantisch vliegtuig dat vlak boven het water vloog', 'Een onderzeeër met poten', 'Een drijvende stad', 'Een robotwalvis'] },
  { type: 'mc', q: 'Waarom ging luchtschip Hindenburg zo snel in vlammen op?', a: ['Het was gevuld met waterstof', 'Het had een benzinetank op het dak', 'Het werd beschoten', 'Er brandde een open haard aan boord'] },
  { type: 'mc', q: 'Hoe kwam de eigenaar van het Segway-bedrijf in 2010 om het leven?', a: ['Hij reed met een Segway van een klif', 'Hij werd aangereden door een Segway', 'Hij viel van de trap', 'Bij een vliegtuigcrash'] },
  { type: 'mc', q: 'Wat was de Concorde?', a: ['Een supersonisch passagiersvliegtuig', 'Een hogesnelheidstrein', 'Een ruimteveer', 'Een luchtschip'] },
  { type: 'mc', q: 'Waarom stopte de Concorde in 2003?', a: ['Te duur en minder passagiers na een crash in 2000', 'Hij was te luid voor Parijs', 'De piloten staakten', 'Er waren geen onderdelen meer'] },
  { type: 'num', q: 'Hoeveel uur vloog de Concorde ongeveer van Londen naar New York?', answer: 3.5, unit: 'uur' },
  { type: 'num', q: 'Hoeveel echte, rijdende Ford Nucleons (een auto met kernreactor) zijn er gebouwd?', answer: 0, fact: 'Er bestond alleen een schaalmodel. Gelukkig.' },
  { type: 'bluff', q: 'Het Amerikaanse Project Orion (1958) wilde een ruimteschip voortstuwen met ___.', answer: 'ontploffende atoombommen', accept: ['atoombommen', 'kernexplosies', 'kernbommen'], decoys: ['zonnezeilen', 'kanonskogels', 'stoom'] },
  { type: 'bluff', q: 'De conceptauto Ford Nucleon (1958) zou rijden op een ___.', answer: 'kernreactor', accept: ['atoomreactor', 'kernenergie', 'reactor'], decoys: ['stoomketel', 'waterstoftank', 'zonnepaneel'] },
  {
    type: 'order', q: 'Zet deze uitvindingen in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Dymaxion-auto', 1933], ['Hindenburg', 1937], ['Ford Nucleon', 1958], ['Het Kaspische Zeemonster', 1966], ['Eerste vlucht Concorde', 1969], ['Segway', 2001]],
  },
]);

GN.addQuestions('internet', [
  { type: 'mc', q: 'Waar staat "IRL" voor?', a: ['In real life', 'I really laughed', 'Internet relay link', 'In right language'] },
  { type: 'mc', q: 'Welke app heeft een spookje als logo?', a: ['Snapchat', 'TikTok', 'Discord', 'Signal'] },
  { type: 'mc', q: 'Wie is Satoshi Nakamoto?', a: ['De onbekende bedenker van bitcoin', 'De oprichter van Nintendo', 'Een beroemde YouTuber', 'De maker van de eerste emoji'] },
  { type: 'mc', q: 'Wat betekent "FOMO"?', a: ['Fear of missing out', 'Friends of my office', 'Follow or mute out', 'Fun on Monday'] },
  { type: 'mc', q: 'Waarvoor werd met de Ice Bucket Challenge geld ingezameld?', a: ['Onderzoek naar ALS', 'Schoon drinkwater', 'Bosbranden', 'Kanker bij kinderen'] },
  { type: 'mc', q: 'Welk spel liet in 2016 massa\'s mensen buiten rondlopen met hun telefoon?', a: ['Pokémon Go', 'Candy Crush', 'Wordfeud', 'Angry Birds'] },
  { type: 'mc', q: 'Wat is "doomscrolling"?', a: ['Eindeloos door slecht nieuws scrollen', 'Een horrorgame spelen', 'Je telefoon laten vallen', 'Je oude berichten lezen'] },
  { type: 'mc', q: 'Welke kleuren had "The Dress" uit 2015 in het echt?', a: ['Blauw en zwart', 'Wit en goud', 'Paars en bruin', 'Lichtblauw en goud'] },
  { type: 'mc', q: 'Wat bedoelen mensen met een "Karen"?', a: ['Iemand die eist de manager te spreken', 'Een behulpzame buurvrouw', 'Een nep-account', 'Een moeder die veel post'] },
  { type: 'mc', q: 'Wat is een "ratio" op X/Twitter?', a: ['Meer reacties dan likes: je bericht wordt afgekraakt', 'Een verhouding tussen volgers', 'Een soort poll', 'Een betaald blauw vinkje'] },
  { type: 'num', q: 'In welk jaar ging de Ice Bucket Challenge viraal?', answer: 2014 },
  { type: 'num', q: 'In welk jaar verscheen Pokémon Go?', answer: 2016 },
  { type: 'bluff', q: 'Het allereerste ding dat op eBay werd verkocht, was een kapotte ___.', answer: 'laserpointer', accept: ['laser pointer', 'laserpen'], decoys: ['Furby', 'broodrooster', 'gitaar'], fact: 'De koper verzamelde kapotte laserpointers.' },
  { type: 'bluff', q: 'De Nyan Cat heeft een lijf van een ___.', answer: 'Pop-Tart', accept: ['poptart', 'pop tart', 'koekje'], decoys: ['donut', 'tosti', 'wafel'] },
  {
    type: 'order', q: 'Zet deze internethypes in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Rickrollen', 2007], ['Nyan Cat', 2011], ['Gangnam Style', 2012], ['Ice Bucket Challenge', 2014], ['The Dress', 2015], ['Pokémon Go', 2016]],
  },
]);

GN.addQuestions('records', [
  { type: 'mc', q: 'Wie heeft de meeste olympische medailles ooit gewonnen?', a: ['Michael Phelps', 'Usain Bolt', 'Larisa Latynina', 'Ireen Wüst'] },
  { type: 'mc', q: 'Wat is het hoogste gebouw ter wereld?', a: ['De Burj Khalifa', 'De Shanghai Tower', 'De Merdeka 118', 'One World Trade Center'] },
  { type: 'mc', q: 'Welke Nederlandse sporter heeft de meeste olympische gouden medailles?', a: ['Ireen Wüst', 'Sven Kramer', 'Fanny Blankers-Koen', 'Pieter van den Hoogenband'] },
  { type: 'mc', q: 'Wat is het grootste levende landdier?', a: ['De Afrikaanse olifant', 'De witte neushoorn', 'De giraffe', 'Het nijlpaard'] },
  { type: 'mc', q: 'Welke rivier noemt Guinness World Records de langste?', a: ['De Nijl', 'De Amazone', 'De Jangtse', 'De Mississippi'] },
  { type: 'mc', q: 'Welk dier heeft het grootste brein?', a: ['De potvis', 'De olifant', 'De blauwe vinvis', 'De mens'], d: 2 },
  { type: 'mc', q: 'Wat is het snelste dier ter wereld?', a: ['De slechtvalk (in duikvlucht)', 'De jachtluipaard', 'De zeilvis', 'De gierzwaluw'] },
  { type: 'num', q: 'Hoeveel olympische medailles won Michael Phelps in totaal?', answer: 28 },
  { type: 'num', q: 'Hoeveel daarvan waren goud?', answer: 23, fact: 'Michael Phelps won 23 keer goud.' },
  { type: 'num', q: 'Hoe oud was John Goodenough toen hij de Nobelprijs voor Scheikunde won?', answer: 97, unit: 'jaar' },
  { type: 'bluff', q: 'De vingernagels van Lee Redmond waren samen ruim ___ meter lang.', answer: '8,65', accept: ['8', '8.65', '9', 'ruim 8', 'achtenhalf'], decoys: ['2', '4', '15'] },
  {
    type: 'order', q: 'Zet deze wolkenkrabbers op hoogte', lo: 'Laagste', hi: 'Hoogste', fmt: '{v} m',
    items: [['Taipei 101', 508], ['One World Trade Center', 541], ['Abraj Al-Bait (Mekka)', 601], ['Shanghai Tower', 632], ['Merdeka 118', 679], ['Burj Khalifa', 828]],
  },
]);
