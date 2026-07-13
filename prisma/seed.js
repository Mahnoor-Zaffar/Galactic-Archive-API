const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const speciesData = [
  { name: 'Human', language: 'Galactic Basic', lifespan: 120, description: 'The most common and versatile species in the galaxy.' },
  { name: 'Wookiee', language: 'Shyriiwook', lifespan: 400, description: 'Tall, hairy, and fiercely loyal beings from Kashyyyk.' },
  { name: 'Droid', language: 'Binary', lifespan: null, description: 'Mechanical beings with varying levels of sentience.' },
  { name: 'Twi\'lek', language: 'Ryl', lifespan: 90, description: 'Humanoids with distinctive head-tails called lekku.' },
  { name: 'Rodian', language: 'Rodian', lifespan: 80, description: 'Green-skinned reptilian humanoids known for bounty hunting.' },
  { name: 'Hutt', language: 'Huttese', lifespan: 1000, description: 'Large, slug-like crime lords.' },
  { name: 'Mon Calamari', language: 'Mon Calamarian', lifespan: 100, description: 'Fish-like humanoids with bulbous heads.' },
  { name: 'Ewok', language: 'Ewokese', lifespan: 60, description: 'Small, furry sentient beings from Endor\'s forest moon.' },
  { name: 'Zabrak', language: 'Zabraki', lifespan: 100, description: 'Humanoids with facial tattoos and cranial horns.' },
  { name: 'Togruta', language: 'Togruti', lifespan: 110, description: 'Humanoids with montrals and head-tails, known for strong community bonds.' },
];

const planetData = [
  { name: 'Tatooine', climate: 'Arid', terrain: 'Desert', population: 200000, description: 'A harsh desert world orbiting twin suns.' },
  { name: 'Alderaan', climate: 'Temperate', terrain: 'Mountains, Forests', population: 2000000000, description: 'A peaceful planet known for its beauty, destroyed by the Death Star.' },
  { name: 'Coruscant', climate: 'Temperate', terrain: 'Cityscape', population: 1000000000000, description: 'The galactic capital, an ecumenopolis covering the entire surface.' },
  { name: 'Naboo', climate: 'Temperate', terrain: 'Forests, Swamps, Plains', population: 4500000000, description: 'A lush, peaceful planet with both human and Gungan inhabitants.' },
  { name: 'Endor', climate: 'Temperate', terrain: 'Forests', population: 30000000, description: 'A forest moon, home to the Ewoks.' },
  { name: 'Hoth', climate: 'Frozen', terrain: 'Ice, Tundra', population: 0, description: 'An icy, desolate world used by the Rebellion as a base.' },
  { name: 'Dagobah', climate: 'Swamp', terrain: 'Swamp, Jungles', population: 0, description: 'A remote, murky swamp planet strong with the Force.' },
  { name: 'Kashyyyk', climate: 'Temperate', terrain: 'Forests, Jungles', population: 45000000, description: 'A lush forest world, home to the Wookiees.' },
  { name: 'Mustafar', climate: 'Volcanic', terrain: 'Volcanoes, Lava', population: 0, description: 'A fiery volcanic planet rich in minerals.' },
  { name: 'Scarif', climate: 'Tropical', terrain: 'Beaches, Oceans', population: 5000000, description: 'A tropical planet housing the Imperial data archive.' },
];

const factionData = [
  { name: 'Galactic Republic', alignment: 'LIGHT', description: 'The democratic government that governed the galaxy for centuries before the Empire.' },
  { name: 'Galactic Empire', alignment: 'DARK', description: 'The autocratic regime that replaced the Republic, ruling through fear.' },
  { name: 'Rebel Alliance', alignment: 'LIGHT', description: 'The resistance movement fighting to restore freedom to the galaxy.' },
  { name: 'Jedi Order', alignment: 'LIGHT', description: 'Guardians of peace and justice, Force-wielders who served the Republic.' },
  { name: 'Sith', alignment: 'DARK', description: 'Dark side Force wielders seeking power and domination.' },
  { name: 'Neutral', alignment: 'NEUTRAL', description: 'Independent factions and criminal organizations.' },
  { name: 'First Order', alignment: 'DARK', description: 'The Imperial remnant that rose to power decades after the Empire\'s fall.' },
  { name: 'The Resistance', alignment: 'LIGHT', description: 'The military force formed to oppose the First Order.' },
];

const movieData = [
  { title: 'The Phantom Menace', episode: 1, releaseDate: new Date('1999-05-19'), description: 'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force.' },
  { title: 'Attack of the Clones', episode: 2, releaseDate: new Date('2002-05-16'), description: 'Anakin Skywalker breaks the Jedi Code when he falls in love with Padmé Amidala.' },
  { title: 'Revenge of the Sith', episode: 3, releaseDate: new Date('2005-05-19'), description: 'The Jedi are betrayed and the Republic falls as Anakin Skywalker becomes Darth Vader.' },
  { title: 'A New Hope', episode: 4, releaseDate: new Date('1977-05-25'), description: 'Luke Skywalker joins the Rebel Alliance to destroy the Empire\'s ultimate weapon.' },
  { title: 'The Empire Strikes Back', episode: 5, releaseDate: new Date('1980-05-21'), description: 'The Empire strikes back as Luke trains with Yoda while his friends flee Darth Vader.' },
  { title: 'Return of the Jedi', episode: 6, releaseDate: new Date('1983-05-25'), description: 'The Rebel Alliance mounts a final assault on the Empire as Luke confronts his father.' },
  { title: 'The Force Awakens', episode: 7, releaseDate: new Date('2015-12-18'), description: 'A new threat emerges as Rey, Finn, and Poe Dameron rise against the First Order.' },
  { title: 'The Last Jedi', episode: 8, releaseDate: new Date('2017-12-15'), description: 'Rey seeks guidance from Luke Skywalker while the Resistance fights for survival.' },
  { title: 'The Rise of Skywalker', episode: 9, releaseDate: new Date('2019-12-20'), description: 'The Resistance faces the resurrected Emperor Palpatine in a final battle.' },
];

const characterData = [
  { name: 'Luke Skywalker', height: 172, age: 23, gender: 'Male', speciesSlug: 'human', planetSlug: 'tatooine', factionSlug: 'rebel-alliance', movies: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A farm boy who became a Jedi Knight and helped defeat the Empire.' },
  { name: 'Darth Vader', height: 202, age: 45, gender: 'Male', speciesSlug: 'human', planetSlug: 'tatooine', factionSlug: 'sith', movies: ['Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'], description: 'The dark lord of the Sith, formerly Anakin Skywalker.' },
  { name: 'Leia Organa', height: 150, age: 23, gender: 'Female', speciesSlug: 'human', planetSlug: 'alderaan', factionSlug: 'rebel-alliance', movies: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A princess, Rebel leader, and later General of the Resistance.' },
  { name: 'Han Solo', height: 180, age: 34, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'rebel-alliance', movies: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens'], description: 'A charming smuggler who became a key leader in the Rebellion.' },
  { name: 'Obi-Wan Kenobi', height: 182, age: 57, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'jedi-order', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope'], description: 'A wise Jedi Master who trained both Anakin and Luke Skywalker.' },
  { name: 'Yoda', height: 66, age: 900, gender: 'Male', speciesSlug: 'human', planetSlug: 'dagobah', factionSlug: 'jedi-order', movies: ['Attack of the Clones', 'Revenge of the Sith', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace', 'The Last Jedi'], description: 'The Grand Master of the Jedi Order, wise and powerful in the Force.' },
  { name: 'Padmé Amidala', height: 165, age: 27, gender: 'Female', speciesSlug: 'human', planetSlug: 'naboo', factionSlug: 'galactic-republic', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'], description: 'A courageous queen and senator of Naboo.' },
  { name: 'Chewbacca', height: 228, age: 234, gender: 'Male', speciesSlug: 'wookiee', planetSlug: 'kashyyyk', factionSlug: 'rebel-alliance', movies: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A loyal Wookiee co-pilot of the Millennium Falcon.' },
  { name: 'R2-D2', height: 96, age: 70, gender: null, speciesSlug: 'droid', planetSlug: 'naboo', factionSlug: 'galactic-republic', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A resourceful astromech droid who has saved the day countless times.' },
  { name: 'C-3PO', height: 167, age: 70, gender: null, speciesSlug: 'droid', planetSlug: 'coruscant', factionSlug: 'galactic-republic', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A protocol droid fluent in over six million forms of communication.' },
  { name: 'Darth Maul', height: 175, age: 36, gender: 'Male', speciesSlug: 'zabrak', planetSlug: 'mustafar', factionSlug: 'sith', movies: ['The Phantom Menace'], description: 'A Zabrak Sith Lord with a double-bladed lightsaber.' },
  { name: 'Mace Windu', height: 188, age: 53, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'jedi-order', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'], description: 'A stern Jedi Master and member of the Jedi Council.' },
  { name: 'Boba Fett', height: 183, age: 35, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'neutral', movies: ['Attack of the Clones', 'The Empire Strikes Back', 'Return of the Jedi'], description: 'The galaxy\'s most feared bounty hunter.' },
  { name: 'Emperor Palpatine', height: 173, age: 88, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'sith', movies: ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'The Empire Strikes Back', 'Return of the Jedi', 'The Rise of Skywalker'], description: 'The Sith Lord who orchestrated the fall of the Republic.' },
  { name: 'Rey', height: 170, age: 19, gender: 'Female', speciesSlug: 'human', planetSlug: 'tatooine', factionSlug: 'the-resistance', movies: ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A scavenger from Jakku who discovers her powerful connection to the Force.' },
  { name: 'Kylo Ren', height: 189, age: 29, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'first-order', movies: ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'The master of the Knights of Ren, son of Han Solo and Leia Organa.' },
  { name: 'Finn', height: 178, age: 23, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'the-resistance', movies: ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'A former stormtrooper who defects and joins the Resistance.' },
  { name: 'Poe Dameron', height: 172, age: 32, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'the-resistance', movies: ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'], description: 'The best pilot in the Resistance.' },
  { name: 'Jabba the Hutt', height: 380, age: 600, gender: 'Male', speciesSlug: 'hutt', planetSlug: 'tatooine', factionSlug: 'neutral', movies: ['A New Hope', 'Return of the Jedi', 'The Phantom Menace'], description: 'A notorious Hutt crime lord ruling Tatooine\'s underworld.' },
  { name: 'Lando Calrissian', height: 178, age: 45, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'rebel-alliance', movies: ['The Empire Strikes Back', 'Return of the Jedi', 'The Rise of Skywalker'], description: 'A smooth-talking scoundrel and former administrator of Cloud City.' },
  { name: 'Ahsoka Tano', height: 166, age: 32, gender: 'Female', speciesSlug: 'togruta', planetSlug: 'coruscant', factionSlug: 'jedi-order', movies: [], description: 'An energetic Togruta who was Anakin Skywalker\'s Padawan.' },
  { name: 'Qui-Gon Jinn', height: 193, age: 60, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'jedi-order', movies: ['The Phantom Menace'], description: 'A maverick Jedi Master who discovered Anakin Skywalker.' },
  { name: 'Count Dooku', height: 193, age: 83, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'sith', movies: ['Attack of the Clones', 'Revenge of the Sith'], description: 'A fallen Jedi who became a Sith Lord and leader of the Separatists.' },
  { name: 'General Grievous', height: 216, age: 40, gender: 'Male', speciesSlug: 'human', planetSlug: 'coruscant', factionSlug: 'galactic-republic', movies: ['Revenge of the Sith'], description: 'A cyborg Separatist general who collects lightsabers.' },
  { name: 'Jyn Erso', height: 160, age: 21, gender: 'Female', speciesSlug: 'human', planetSlug: 'scarrif', factionSlug: 'rebel-alliance', movies: [], description: 'A rebellious young woman who led the mission to steal the Death Star plans.' },
];

const starshipData = [
  { name: 'Millennium Falcon', model: 'YT-1300 light freighter', manufacturer: 'Corellian Engineering Corporation', crewCapacity: 4, speed: 1050, description: 'The fastest hunk of junk in the galaxy.' },
  { name: 'X-Wing Starfighter', model: 'T-65B X-wing', manufacturer: 'Incom Corporation', crewCapacity: 1, speed: 1050, description: 'The Rebel Alliance\'s primary starfighter.' },
  { name: 'TIE Fighter', model: 'TIE/ln starfighter', manufacturer: 'Sienar Fleet Systems', crewCapacity: 1, speed: 1200, description: 'The Empire\'s iconic twin ion engine starfighter.' },
  { name: 'Star Destroyer', model: 'Imperial-class Star Destroyer', manufacturer: 'Kuat Drive Yards', crewCapacity: 37000, speed: 975, description: 'The Empire\'s capital ship, a symbol of Imperial might.' },
  { name: 'Slave I', model: 'Firespray-31-class patrol craft', manufacturer: 'Kuat Systems Engineering', crewCapacity: 1, speed: 1000, description: 'Boba Fett\'s heavily modified patrol ship.' },
  { name: 'Death Star', model: 'DS-1 Orbital Battle Station', manufacturer: 'Imperial Department of Military Research', crewCapacity: 1200000, speed: null, description: 'The Empire\'s planet-destroying superweapon.' },
  { name: 'Naboo N-1 Starfighter', model: 'N-1 starfighter', manufacturer: 'Theed Palace Space Vessel Engineering Corps', crewCapacity: 1, speed: 1100, description: 'The elegant starfighter of the Royal Naboo Security Forces.' },
  { name: 'A-Wing', model: 'RZ-1 A-wing interceptor', manufacturer: 'Alliance Engineering', crewCapacity: 1, speed: 1300, description: 'The fastest starfighter in the Rebel fleet.' },
  { name: 'Super Star Destroyer', model: 'Executor-class Star Dreadnought', manufacturer: 'Kuat Drive Yards', crewCapacity: 280000, speed: 850, description: 'Darth Vader\'s massive personal flagship.' },
  { name: 'Razor Crest', model: 'ST-70 assault ship', manufacturer: 'Corellian Engineering Corporation', crewCapacity: 2, speed: 900, description: 'A gunship used by the Mandalorian bounty hunter.' },
];

async function main() {
  console.log('Seeding database...');

  await prisma.characterMovie.deleteMany();
  await prisma.character.deleteMany();
  await prisma.starship.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.faction.deleteMany();
  await prisma.species.deleteMany();
  await prisma.planet.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data.');

  const adminHash = await bcrypt.hash('admin1234', 12);
  const userHash = await bcrypt.hash('user1234', 12);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@galacticarchive.com',
        passwordHash: adminHash,
        role: Role.ADMIN,
      },
      {
        email: 'user@galacticarchive.com',
        passwordHash: userHash,
        role: Role.USER,
      },
    ],
  });

  console.log('Created users.');

  const speciesMap = {};
  for (const s of speciesData) {
    const created = await prisma.species.create({ data: s });
    speciesMap[s.name.toLowerCase()] = created.id;
  }
  console.log(`Created ${speciesData.length} species.`);

  const planetMap = {};
  for (const p of planetData) {
    const created = await prisma.planet.create({ data: p });
    planetMap[p.name.toLowerCase()] = created.id;
  }
  console.log(`Created ${planetData.length} planets.`);

  const factionMap = {};
  for (const f of factionData) {
    const created = await prisma.faction.create({ data: f });
    factionMap[f.name.toLowerCase()] = created.id;
  }
  console.log(`Created ${factionData.length} factions.`);

  const movieMap = {};
  for (const m of movieData) {
    const created = await prisma.movie.create({ data: m });
    movieMap[m.title.toLowerCase()] = created.id;
  }
  console.log(`Created ${movieData.length} movies.`);

  const starshipRecords = [];
  for (const s of starshipData) {
    starshipRecords.push(await prisma.starship.create({ data: s }));
  }
  console.log(`Created ${starshipData.length} starships.`);

  for (const c of characterData) {
    const movieConnections = c.movies.map((title) => ({
      movieId: movieMap[title.toLowerCase()],
    }));

    await prisma.character.create({
      data: {
        name: c.name,
        height: c.height,
        age: c.age,
        gender: c.gender,
        speciesId: speciesMap[c.speciesSlug],
        planetId: planetMap[c.planetSlug],
        factionId: factionMap[c.factionSlug],
        description: c.description,
        movies: {
          create: movieConnections,
        },
      },
    });
  }
  console.log(`Created ${characterData.length} characters.`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
