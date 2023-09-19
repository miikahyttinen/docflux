import { parseFinnishDate } from "../src/utils";

describe("test utility functions", () => {
  const ISO_DATE = "2023-09-30T00:00:00.000Z";
  it("parses finnish date right", () => {
    expect(parseFinnishDate(ISO_DATE)).toEqual("30.09.2023");
  });
});
