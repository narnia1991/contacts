import { createKeywords, generateKeywords, dataToContacts } from "../helpers";

describe("Testing Helper functions", () => {
  test("create keywords should work correctly", () => {
    const keywords = createKeywords("Citlalli Tromp");

    expect(keywords).toEqual([
      "",
      "C",
      "Ci",
      "Cit",
      "Citl",
      "Citla",
      "Citlal",
      "Citlall",
      "Citlalli",
      "Citlalli ",
      "Citlalli T",
      "Citlalli Tr",
      "Citlalli Tro",
      "Citlalli Trom",
      "Citlalli Tromp",
    ]);
  });

  test("generate keywords should work correctly", () => {
    const keywords = generateKeywords(["Citlalli", "Tromp"]);
    expect(keywords).toEqual([
      "",
      "C",
      "Ci",
      "Cit",
      "Citl",
      "Citla",
      "Citlal",
      "Citlall",
      "Citlalli",
      "Citlalli ",
      "Citlalli T",
      "Citlalli Tr",
      "Citlalli Tro",
      "Citlalli Trom",
      "Citlalli Tromp",
      "T",
      "Tr",
      "Tro",
      "Trom",
      "Tromp",
      "Tromp ",
      "Tromp C",
      "Tromp Ci",
      "Tromp Cit",
      "Tromp Citl",
      "Tromp Citla",
      "Tromp Citlal",
      "Tromp Citlall",
      "Tromp Citlalli",
    ]);
  });

  test("data to contacts should work correctly", () => {
    const data = {
      email: "Judge_Olson@yahoo.com",
      isStarred: true,
      note: "Et non qui. Nemo est quia doloremque. Enim minima dicta dolorem velit. Doloribus aliquam quae. Enim sit et. Maxime commodi doloremque voluptatem doloribus atque asperiores quam unde eum.",
      contact: "(687) 815-9173 x74802",
      firstName: "Abagail",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/637.jpg",
      keywords: [
        "",
        "A",
        "Ab",
        "Aba",
        "Abag",
        "Abaga",
        "Abagai",
        "Abagail",
        "Abagail ",
        "Abagail K",
        "Abagail Ku",
        "Abagail Kul",
        "Abagail Kula",
        "Abagail Kulas",
        "K",
        "Ku",
        "Kul",
        "Kula",
        "Kulas",
        "Kulas ",
        "Kulas A",
        "Kulas Ab",
        "Kulas Aba",
        "Kulas Abag",
        "Kulas Abaga",
        "Kulas Abagai",
        "Kulas Abagail",
      ],
      lastName: "Kulas",
    };
    expect(dataToContacts(data, "38BZbmRIJk5rQpv8K85X")).toEqual({
      id: "38BZbmRIJk5rQpv8K85X",
      email: "Judge_Olson@yahoo.com",
      isStarred: true,
      note: "Et non qui. Nemo est quia doloremque. Enim minima dicta dolorem velit. Doloribus aliquam quae. Enim sit et. Maxime commodi doloremque voluptatem doloribus atque asperiores quam unde eum.",
      contact: "(687) 815-9173 x74802",
      firstName: "Abagail",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/637.jpg",
      lastName: "Kulas",
    });
  });
});
