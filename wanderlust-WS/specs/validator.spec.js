const validator = require('../src/utilities/validator')

describe("Validating EmailId and Password",() => {
    it("Test Case 1 : Valid EmailId", () => {
        expect(validator.validateEmailId('demo@infy.com')).toBeTruthy();
    });
    it("Test Case 2 : Invalid EmailId", () => {
        expect(validator.validateEmailId('@infy.co')).toBeFalsy();
    });
    it("Test Case 3 : Valid Password", () => {
        expect(validator.validatePassword('krishN@12')).toBeTruthy();
    });
    it("Test Case 4 : Invalid Password", () => {
        expect(validator.validatePassword('kris')).toBeFalsy();
    });
    it("Test Case 5 : Valid Contact Number", () => {
        expect(validator.validateContactNo(6895698569)).toBeTruthy();
    });
    it("Test Case 6 : Invalid Contact Number", () => {
        expect(validator.validateContactNo(1236541236)).toBeFalsy();
    });
})