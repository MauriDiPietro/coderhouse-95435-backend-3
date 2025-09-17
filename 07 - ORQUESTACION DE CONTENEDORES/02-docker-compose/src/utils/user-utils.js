export const generateUser = () => {
  const names = ["Juan", "Maria", "Pedro", "Lucia", "Ana", "Carlos", "Sofia"];
  const surnames = [
    "Perez",
    "Gomez",
    "Rodriguez",
    "Fernandez",
    "Lopez",
    "Martinez",
  ];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const name = `${random(names)} ${random(surnames)}`;
  const email = `${name.toLowerCase().replace(" ", ".")}@example.com`;
  const website = `https://www.${name.split(" ")[0].toLowerCase()}.com`;
  const image = `https://picsum.photos/200?random=${Math.floor(
    Math.random() * 1000
  )}`;

  return {
    name,
    email,
    website,
    image,
  };
};

// console.log(generateUser());

/* ------------------------------------ - ----------------------------------- */

import { build, fake } from "test-data-bot";

export const generateUserTestDataBot = () => {
  const userBuilder = build("User").fields({
    name: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
    website: fake((f) => f.internet.url()),
    image: fake((f) => f.image.avatar()),
  });

  return userBuilder();
};

// console.log(generateUserTestDataBot());

/* ------------------------------------ - ----------------------------------- */
import Chance from 'chance'
const chance = new Chance()

export const generateUserChance = () => {
  return {
    name: chance.name(),
    email: chance.email(),
    website: chance.url(),
    image: chance.avatar()
  }
};

// console.log(generateUserChance());


/* ------------------------------------ - ----------------------------------- */
import casual from 'casual'

export const generateUserCasual = () => {
  return {
    name: casual.full_name,
    email: casual.email,
    website: casual.url,
    image: `https://picsum.photos/200?random=${casual.integer(1, 1000)}`
  }
};

// console.log(generateUserCasual());

/* ------------------------------------ - ----------------------------------- */
import { faker } from '@faker-js/faker'
faker.location = 'es'

export const generateUserFaker = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.urlPicsumPhotos()
  }
};

// console.log(generateUserFaker());

