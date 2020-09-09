import keyGenerate from "../../bin/keyGenerate";

describe("Generate a key to be used in App", () => {
  
  it("should generate an encrypted key, show it in console and return it", () => {
    const generated = keyGenerate();
    expect(generated).toHaveLength(60);
  });
})