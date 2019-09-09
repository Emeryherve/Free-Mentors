import faker from 'faker';

const fakerMail = faker.internet.email();
const fakerPassword = faker.internet.password(8, true);
const users = [

  {
    email: fakerMail,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: fakerPassword,
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },

  {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(8, true),
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },

  {
    email: faker.name.lastName,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(8, true),
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },

  {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: fakerPassword,
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
  },
  {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(3, true),
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },
  {
    email: fakerMail,
    password: fakerPassword,
  },
  {
    email: fakerMail,
    password: 'faker_password',
  },
  {
    password: fakerPassword,
  },
  {
    email: fakerMail,
  },

  {
    email: `${fakerMail}@gmail`,
    password: fakerPassword,
  },
  {
    email: faker.internet.email(),
    firstName: ' ',
    lastName: faker.name.lastName(),
    password: fakerPassword,
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },
  {
    email: faker.internet.email(),
    lastName: ' ',
    firstName: faker.name.firstName(),
    password: fakerPassword,
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },
  {
    email: faker.internet.email(),
    password: ' ',
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
    expertise: faker.name.jobTitle(),
  },
  {
    id: 2,
    firstName: 'KIREZI',
    lastName: 'Herve',
    email: 'herve@gmail.com',
    password: ' ',
    address: 'Kigali,Rwanda',
    bio: 'Passion and interest is the key for success',
    occupation: 'Backend Developer',
    expertise: 'Software engineering',
    isAdmin: false,
    isMentor: true,

  },
  {
    id: 3,
    firstName: 'KIREZI',
    lastName: 'Herve',
    email: 'herve3@gmail.com',
    password: 'password',
    address: 'Kigali,Rwanda',
    bio: 'Passion and interest is the key for success',
    occupation: 'Backend Developer',
    expertise: 'Software engineering',
    isAdmin: false,
    isMentor: false,

  },
];
export default users;
