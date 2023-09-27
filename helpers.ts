import { faker } from '@faker-js/faker';

const generateFakeData = () => {
  return [...Array(30).keys()].map(() => ({
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      'women',
      'men',
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  }));
};

export { generateFakeData };
