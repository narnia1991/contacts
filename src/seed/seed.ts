import { faker } from "@faker-js/faker";
import { generateKeywords } from "../components/helpers";

export const createDummyData = (count: number) =>
  Array.from(Array(count)).map(() => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: Math.random() > 0.4 ? faker.image.avatar() : "",
      email: faker.internet.email(),
      contact: faker.phone.phoneNumber(),
      note: faker.lorem.paragraph(),
      isStarred: Math.random() > 0.4 ? true : false,
    };

    (data as Record<string, string | Array<string> | boolean>).keywords =
      generateKeywords([data.firstName, data.lastName]);
    return data;
  });
