import faker from 'faker';

const fakerMail = faker.internet.email();
const fakerPassword = faker.internet.password(8, true);
const users = [

  // ############# Signup users ################

  // 0 Correct user info
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

  // 1 Correct user info
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

  // 2 User with invalid email
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

  // 3 User with incomplete info
  {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: fakerPassword,
    address: faker.address.cityPrefix(),
    bio: faker.name.jobDescriptor(),
    occupation: faker.name.jobArea(),
  },

  // 4 User with incomplte password
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
  // ############# Signin users ################
  // 5 Correct registered credentials
  {
    email: fakerMail,
    password: fakerPassword,
  },
  // 6 Incorrect password
  {
    email: fakerMail,
    password: 'faker_password',
  },
  // 7 email missing
  {
    password: fakerPassword,
  },
  // 8 Password missing
  {
    email: fakerMail,
  },

  // 9 Invalid email
  {
    email: `${fakerMail}@gmail`,
    password: fakerPassword,
  },
  // 10 first name with whitespace
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
  // 11 last name with whitespace
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
  // 12 password with whitespace
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
];
export default users;
