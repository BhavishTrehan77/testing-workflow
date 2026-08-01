
describe("Authentication Tests", () => {

    test("should check true value", () => {
        expect(true).toBe(true);
    });

    test("should check string", () => {
        expect("auth").toBe("auth");
    });

    test("should check number", () => {
        expect(10).toBeGreaterThan(5);
    });

});