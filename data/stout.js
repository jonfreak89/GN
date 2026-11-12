/* Stout (spice 3): Het lichaam, Liefde & seks, Dating-ellende.
   Deze vragen kunnen spelers altijd anoniem overslaan. */

GN.addQuestions('lichaam', [
  { type: 'mc', q: 'Wat is "borborygmus"?', a: ['Gerommel in je buik', 'Een harde boer', 'Oorsmeer', 'Een ingegroeide teennagel'] },
  { type: 'mc', q: 'Waar komt de geur van een scheet vooral door?', a: ['Zwavelverbindingen', 'Methaan', 'Koolzuur', 'Ammoniak'], fact: 'Methaan en de meeste andere darmgassen ruiken nergens naar.' },
  { type: 'mc', q: 'Welk deel van het lichaam heeft geen bloedvaten?', a: ['Het hoornvlies', 'De tong', 'Het oorlelletje', 'De lippen'] },
  { type: 'mc', q: 'Hoe heet de angst om naakt gezien te worden?', a: ['Gymnofobie', 'Nudofobie', 'Dermatofobie', 'Exofobie'] },
  { type: 'mc', q: 'Wat betekent "eructatie"?', a: ['Boeren', 'Niezen', 'Hikken', 'Gapen'] },
  { type: 'mc', q: 'Welk plekje heeft ongeveer 8.000 zenuwuiteinden, meer dan welk ander lichaamsdeel ook?', a: ['De clitoris', 'De lippen', 'De vingertoppen', 'De tong'], fact: 'Een recent onderzoek kwam zelfs uit op ruim 10.000.' },
  { type: 'mc', q: 'Wat is de medische term voor kippenvel?', a: ['Piloerectie', 'Dermagrafie', 'Cutisplasie', 'Folliculitis'] },
  { type: 'mc', q: 'Waar zitten de meeste zweetklieren per vierkante centimeter?', a: ['Onder je voeten', 'In je oksels', 'Op je rug', 'Op je voorhoofd'], d: 2 },
  { type: 'mc', q: 'Wat is "cerumen"?', a: ['Oorsmeer', 'Neusvocht', 'Traanvocht', 'Navelpluis'], d: 2 },
  { type: 'mc', q: 'Wat is een "queef"?', a: ['Lucht die uit de vagina ontsnapt', 'Een knakkende knie', 'Een hikkende baby', 'Kraken van de kaak'] },
  { type: 'mc', q: 'Hoe lang is de dunne darm van een volwassene ongeveer?', a: ['Zo\'n 6 meter', 'Zo\'n 1 meter', 'Zo\'n 20 meter', 'Zo\'n 50 centimeter'] },
  { type: 'num', q: 'Hoeveel keer laat een mens gemiddeld per dag een wind?', answer: 15, unit: 'keer', fact: 'Ergens tussen de 5 en 25 keer is volkomen normaal.' },
  { type: 'num', q: 'Hoeveel liter speeksel maak je ongeveer per dag?', answer: 1, unit: 'liter', fact: 'Tussen een halve en anderhalve liter.' },
  { type: 'num', q: 'Hoeveel haren verlies je gemiddeld per dag?', answer: 75, unit: 'haren', fact: 'Tussen de 50 en 100 is normaal.' },
  { type: 'bluff', q: 'In de 18e eeuw bliezen Britse artsen ___ in de anus van drenkelingen om ze te reanimeren.', answer: 'tabaksrook', accept: ['tabak', 'rook', 'sigarenrook'], decoys: ['warme lucht', 'stoom', 'peperpoeder'], fact: 'Langs de Theems hingen er zelfs speciale kits voor. Vandaar: "blowing smoke up someone\'s ass".' },
  { type: 'bluff', q: 'De wetenschappelijke term voor ijshoofdpijn ("brain freeze") is ___.', answer: 'sfenopalatine ganglioneuralgie', accept: ['sphenopalatine ganglioneuralgia', 'sfenopalatine ganglioneuralgia'], decoys: ['cryocefalie', 'frigoritis cerebri', 'gelatomigraine'] },
  { type: 'bluff', q: 'In je navel leven gemiddeld ___ verschillende soorten bacteriën.', answer: '67', accept: ['zevenenzestig', 'ruim 60'], decoys: ['3', '12', '1500'], fact: 'Uit het Belly Button Biodiversity-project: gemiddeld 67 soorten per navel, sommige nog nooit eerder gezien.' },
  {
    type: 'order', q: 'Zet deze organen op gewicht', lo: 'Lichtst', hi: 'Zwaarst', fmt: '± {v} gram',
    items: [['Milt', 150], ['Hart', 300], ['Hersenen', 1350], ['Lever', 1500], ['Huid', 4000]],
  },
]);

GN.addQuestions('liefde', [
  { type: 'mc', q: 'Uit welk land komt de Kama Sutra?', a: ['India', 'China', 'Egypte', 'Perzië'] },
  { type: 'mc', q: 'Welk buideldiertje paart zo fanatiek dat de mannetjes eraan doodgaan?', a: ['De breedvoetbuidelmuis (antechinus)', 'De koala', 'De wombat', 'De quokka'] },
  { type: 'mc', q: 'Waarvan waren de oudste gevonden condooms in Europa (rond 1640) gemaakt?', a: ['Dierendarm', 'Linnen', 'Leer', 'Rubber'] },
  { type: 'mc', q: 'Welke groente noemden de Fransen vroeger "pomme d\'amour" (liefdesappel)?', a: ['De tomaat', 'De aubergine', 'De paprika', 'De ui'] },
  { type: 'mc', q: 'Hoe noem je het als je vooral valt op iemands intelligentie?', a: ['Sapioseksueel', 'Brainosexueel', 'Cerebrofiel', 'Logofiel'] },
  { type: 'mc', q: 'Welke beruchte versierder uit Venetië schreef memoires over zijn honderden avontuurtjes?', a: ['Giacomo Casanova', 'Don Juan', 'Lord Byron', 'Rudolph Valentino'] },
  { type: 'mc', q: 'Welk hormoon heet ook wel het "knuffelhormoon"?', a: ['Oxytocine', 'Adrenaline', 'Cortisol', 'Melatonine'] },
  { type: 'mc', q: 'Wat bedoelt iemand met "Netflix and chill?"', a: ['Zogenaamd een film kijken, eigenlijk iets anders', 'Een avond bingewatchen', 'Je abonnement opzeggen', 'Samen koken en tv kijken'] },
  { type: 'mc', q: 'Welk dier heeft relatief tot zijn lichaam de langste penis?', a: ['De zeepok', 'De olifant', 'De blauwe vinvis', 'Het paard'], fact: 'Tot acht keer zijn eigen lichaamslengte. Hij zit namelijk vast en moet ver reiken.' },
  { type: 'mc', q: 'Wat betekent het Griekse woord waar "orgasme" vandaan komt?', a: ['Opzwellen', 'Sterven', 'Zingen', 'Vliegen'], d: 2 },
  { type: 'mc', q: 'Wat was de oorspronkelijke bedoeling van de vibrator in de 19e eeuw volgens een populaire (maar betwiste) theorie?', a: ['Behandeling van "hysterie" door artsen', 'Massage van paarden', 'Verlichting van spierpijn bij soldaten', 'Het kloppen van tapijten'], d: 2 },
  { type: 'num', q: 'Hoeveel kilocalorieën verbrandden mannen gemiddeld per vrijpartij in een Canadees onderzoek (2013)?', answer: 101, unit: 'kcal', fact: 'Vrouwen kwamen gemiddeld op 69 kcal.' },
  { type: 'num', q: 'Rond welk jaar is het oudste bewaarde condoom van Europa gemaakt?', answer: 1640 },
  { type: 'num', q: 'Hoeveel minuten duurde een vrijpartij gemiddeld in een internationaal onderzoek met stopwatches (2005)?', answer: 5.4, unit: 'minuten', fact: 'De mediaan was 5,4 minuten. De spreiding: van 33 seconden tot 44 minuten.' },
  { type: 'bluff', q: 'Viagra werd oorspronkelijk getest als medicijn tegen ___.', answer: 'hartklachten', accept: ['angina', 'pijn op de borst', 'hartziekte', 'hartziektes', 'hoge bloeddruk'], decoys: ['hoofdpijn', 'kaalheid', 'hooikoorts'] },
  { type: 'bluff', q: 'Kellogg\'s cornflakes waren door de bedenker oorspronkelijk mede bedoeld om mensen ___.', answer: 'minder geil te maken', accept: ['van masturberen af te houden', 'minder te laten masturberen', 'minder zin in seks te geven'], decoys: ['sneller te laten groeien', 'beter te laten slapen', 'slimmer te maken'], fact: 'John Harvey Kellogg geloofde dat flauw eten de lust onderdrukte.' },
  { type: 'bluff', q: 'De mannetjes van de breedvoetbuidelmuis paren zo fanatiek dat ze ___.', answer: 'eraan doodgaan', accept: ['sterven', 'doodgaan', 'dood gaan'], decoys: ['blind worden', 'van kleur veranderen', 'tijdelijk vergeten hoe ze moeten eten'] },
  {
    type: 'order', q: 'Zet deze liefdes-mijlpalen in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Kama Sutra geschreven', 250, '± 250'], ['Oudste condoom van Europa', 1640, '± 1640'], ['Geboorte van Casanova', 1725], ['De pil goedgekeurd in de VS', 1960], ['Viagra op de markt', 1998], ['Tinder gelanceerd', 2012]],
  },
]);

GN.addQuestions('dating', [
  { type: 'mc', q: 'Wat is "ghosting"?', a: ['Zonder uitleg al het contact verbreken', 'Een date bij een spookhuis', 'Iemand stalken met een nepaccount', 'Je ex op social media blokkeren'] },
  { type: 'mc', q: 'Wat is "breadcrumbing"?', a: ['Af en toe een kruimeltje aandacht geven zonder echte interesse', 'Samen ontbijten na de eerste nacht', 'Je date laten betalen', 'Kleine cadeautjes sturen'] },
  { type: 'mc', q: 'Wat is "benching"?', a: ['Iemand op de reservebank houden voor als het niets wordt met een ander', 'Daten in een park', 'Samen sporten als date', 'Je date voorstellen aan vrienden'] },
  { type: 'mc', q: 'Wat is "love bombing"?', a: ['Iemand in het begin overladen met aandacht en cadeaus', 'Een ruzie die ontploft', 'Uitgaan met meerdere mensen tegelijk', 'Je ex terugwinnen met bloemen'] },
  { type: 'mc', q: 'Wat is "kittenfishing"?', a: ['Jezelf online net iets mooier voordoen dan je bent', 'Iemand versieren met je kat', 'Een nep-profiel van een beroemdheid', 'Daten met iemand die veel jonger is'] },
  { type: 'mc', q: 'Wat is "zombieing"?', a: ['Iemand die je ghostte duikt ineens weer op', 'Daten met iemand die altijd moe is', 'Een date naar een horrorfilm', 'Een relatie die al dood is maar doorgaat'] },
  { type: 'mc', q: 'Wat is een "situationship"?', a: ['Iets tussen vriendschap en relatie, zonder label', 'Een relatie op afstand', 'Een vakantieliefde', 'Een relatie met een collega'] },
  { type: 'mc', q: 'Wat is "orbiting"?', a: ['Iemand ghost je, maar blijft je stories bekijken en liken', 'Rondjes lopen om je date te vinden', 'Iemand die je overal volgt', 'Op meerdere apps tegelijk zitten'] },
  { type: 'mc', q: 'Wat was de eerste grote datingsite (1995)?', a: ['Match.com', 'Tinder', 'OkCupid', 'Lexa'] },
  { type: 'mc', q: 'Wat betekent "swipe right" op Tinder?', a: ['Ik vind je leuk', 'Nee, bedankt', 'Blokkeren', 'Superlike'] },
  { type: 'mc', q: 'Wat is een "beer goggles"-effect?', a: ['Na een paar biertjes vind je iedereen aantrekkelijker', 'Je ziet dubbel na te veel bier', 'Je wordt chagrijnig van bier', 'Bier smaakt beter in gezelschap'] },
  { type: 'num', q: 'In welk jaar werd Tinder gelanceerd?', answer: 2012 },
  { type: 'num', q: 'In welk jaar ging Match.com online?', answer: 1995 },
  { type: 'num', q: 'Hoeveel procent van de Amerikaanse stellen ontmoette elkaar in 2017 online (Stanford-onderzoek)?', answer: 39, unit: '%', fact: 'Online daten werd daarmee de nummer één manier om iemand te leren kennen.' },
  { type: 'bluff', q: 'Het eerste computer-datingproject "Operation Match" (1965) werkte met ___.', answer: 'ponskaarten', accept: ['vragenlijsten op ponskaarten', 'ponskaart'], decoys: ['telegrammen', 'faxen', 'radio-oproepen'] },
  { type: 'bluff', q: 'Bumble onderscheidt zich van Tinder doordat bij een man-vrouw-match ___ het eerste bericht moet sturen.', answer: 'de vrouw', accept: ['vrouw', 'de vrouwen'], decoys: ['de oudste', 'de langste', 'wie het eerst swipete'] },
  {
    type: 'order', q: 'Zet deze datingdiensten op startjaar', lo: 'Oudst', hi: 'Nieuwst',
    items: [['Operation Match', 1965], ['Match.com', 1995], ['Grindr', 2009], ['Tinder', 2012], ['Bumble', 2014]],
  },
]);
