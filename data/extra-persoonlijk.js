/* Aanvulling 1: persoonlijke vragen */

GN.addPrompts([
  // Hoe goed ken je… (braaf)
  { type: 'ken', spice: 1, q: 'Wat zou {naam} kiezen als gratis abonnement voor het leven?', options: ['Streamingdienst', 'Sportschool', 'Restaurant', 'Pretpark'] },
  { type: 'ken', spice: 1, q: 'Welk huishoudelijk klusje zou {naam} het liefst nooit meer doen?', options: ['Afwassen', 'Stofzuigen', 'Wc schoonmaken', 'Strijken'] },
  { type: 'ken', spice: 1, q: 'Wat zou {naam} meenemen naar een onbewoond eiland?', options: ['Een mes', 'Een boek', 'Een geliefde', 'Zonnebrand'] },
  { type: 'ken', spice: 1, q: 'Hoe zou {naam} het liefst reizen?', options: ['Auto', 'Trein', 'Vliegtuig', 'Fiets'] },
  { type: 'ken', spice: 1, q: 'Welke snack zou {naam} om middernacht pakken?', options: ['Chips', 'Chocola', 'Kaas', 'Iets uit de snackbar'] },
  { type: 'ken', spice: 1, q: 'Welk beroep zou {naam} kiezen als geld niet uitmaakt?', options: ['Kunstenaar', 'Reiziger', 'Kok', 'Niks, gewoon genieten'] },
  { type: 'ken', spice: 1, q: 'Wat zou {naam} doen tijdens een stroomstoring?', options: ['Kaarsen aan en gezellig', 'Meteen naar bed', 'In paniek de buren bellen', 'Een bordspel pakken'] },
  { type: 'ken', spice: 1, q: 'Welk seizoen zou {naam} kiezen als het altijd hetzelfde seizoen moest zijn?', options: ['Lente', 'Zomer', 'Herfst', 'Winter'] },
  // pittig
  { type: 'ken', spice: 2, q: 'Wat zou {naam} doen als de bank per ongeluk een miljoen stort?', options: ['Meteen melden', 'Stil afwachten', 'Alles uitgeven', 'Vluchten naar het buitenland'] },
  { type: 'ken', spice: 2, q: 'Wie zou {naam} als eerste bellen na het plegen van een misdaad?', options: ['Een advocaat', 'Mama', 'Een beste vriend', 'Niemand, gewoon zwijgen'] },
  { type: 'ken', spice: 2, q: 'Welke rol zou {naam} hebben in een horrorfilm?', options: ['De eerste die doodgaat', 'De overlever', 'De moordenaar', 'Degene die "hallo?" roept in de kelder'] },
  { type: 'ken', spice: 2, q: 'Wat zou {naam} het eerst doen na een week in de gevangenis?', options: ['Een flinke maaltijd', 'Douchen', 'Wraak nemen', 'Social media checken'] },
  { type: 'ken', spice: 2, q: 'Hoe zou {naam} een vervelende buurman aanpakken?', options: ['Netjes aanspreken', 'Passief-agressief briefje', 'Wraak via het tuinpad', 'Gewoon verhuizen'] },
  // stout
  { type: 'ken', spice: 3, q: 'Wat zou {naam} het eerst doen op een naaktstrand?', options: ['Meteen omdraaien', 'Gewoon meedoen', 'Stiekem kijken', 'Een foto maken'] },
  { type: 'ken', spice: 3, q: 'Wat zou {naam} doen als iemand in de trein met hem of haar flirt?', self: 'Wat zou jij doen als iemand in de trein met je flirt?', options: ['Terugflirten', 'Doen alsof je slaapt', 'Rood worden', 'Nummer vragen'] },
  { type: 'ken', spice: 3, q: 'Welke kamer zou {naam} kiezen voor een spannend avondje?', options: ['De slaapkamer', 'De badkamer', 'De keuken', 'De achterbank'] },
  { type: 'ken', spice: 3, q: 'Wat zou {naam} het gênantst vinden om in zijn of haar zoekgeschiedenis te laten zien?', self: 'Wat zou jij het gênantst vinden om in je zoekgeschiedenis te laten zien?', options: ['Symptomen googelen', 'Exen opzoeken', 'Stoute filmpjes', 'Rare vragen aan AI'] },

  // Wie van ons…
  { type: 'wie', spice: 1, q: 'Wie van ons zou het eerst verdwalen in IKEA?' },
  { type: 'wie', spice: 1, q: 'Wie van ons heeft de meeste tabbladen open?' },
  { type: 'wie', spice: 1, q: 'Wie van ons zou de beste sinterklaas zijn?' },
  { type: 'wie', spice: 1, q: 'Wie van ons blijft het langst hangen op een feestje?' },
  { type: 'wie', spice: 1, q: 'Wie van ons wordt een gezellige, maar bemoeizuchtige buurman of buurvrouw?' },
  { type: 'wie', spice: 1, q: 'Wie van ons zou als eerste afhaken bij een survivalweekend?' },
  { type: 'wie', spice: 2, q: 'Wie van ons zou een bank kunnen beroven en ermee wegkomen?' },
  { type: 'wie', spice: 2, q: 'Wie van ons heeft het slechtste gedrag na drie wijntjes?' },
  { type: 'wie', spice: 2, q: 'Wie van ons verkoopt zijn familie voor een gratis wereldreis?' },
  { type: 'wie', spice: 2, q: 'Wie van ons wordt ooit de baas van een louche bedrijf?' },
  { type: 'wie', spice: 3, q: 'Wie van ons heeft het vaakst een ex teruggenomen?' },
  { type: 'wie', spice: 3, q: 'Wie van ons flirt het meest zonder het door te hebben?' },
  { type: 'wie', spice: 3, q: 'Wie van ons zou het eerst een date hebben met iemand die hij of zij online net kent?' },

  // Gênante enquête
  { type: 'poll', spice: 1, q: 'Hoeveel van jullie hebben ooit een hele serie in één weekend gekeken?' },
  { type: 'poll', spice: 1, q: 'Hoeveel van jullie hebben ooit gezwaaid naar iemand die naar een ander zwaaide?' },
  { type: 'poll', spice: 1, q: 'Hoeveel van jullie hebben ooit een ander de schuld gegeven van een scheet?' },
  { type: 'poll', spice: 1, q: 'Hoeveel van jullie lezen weleens stiekem de laatste bladzijde van een boek eerst?' },
  { type: 'poll', spice: 2, q: 'Hoeveel van jullie hebben ooit gelogen in een sollicitatiegesprek?' },
  { type: 'poll', spice: 2, q: 'Hoeveel van jullie zijn ooit door de politie aangehouden?' },
  { type: 'poll', spice: 2, q: 'Hoeveel van jullie hebben ooit iemand geghost?' },
  { type: 'poll', spice: 2, q: 'Hoeveel van jullie hebben ooit een cadeau gekregen en het meteen doorverkocht?' },
  { type: 'poll', spice: 3, q: 'Hoeveel van jullie hebben ooit met een collega gezoend?' },
  { type: 'poll', spice: 3, q: 'Hoeveel van jullie hebben ooit op een eerste date al de nacht doorgebracht?' },
  { type: 'poll', spice: 3, q: 'Hoeveel van jullie hebben ooit een stout speeltje gekocht?' },
  { type: 'poll', spice: 3, q: 'Hoeveel van jullie hebben ooit naakt gezwommen?' },
]);
