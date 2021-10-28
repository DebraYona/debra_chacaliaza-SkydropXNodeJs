const {
  isValidId,
  isValidEmail,
  isValidUrl,
} = require('../../src/users/validators/users.validators');

describe('users validators', () => {
  describe('id validator', () => {
    it('should return true if id = 1', () => {
      expect.assertions(1);
      expect(isValidId(1)).toBe(true);
    });
    it('should return false if id = -1', () => {
      expect.assertions(1);
      expect(isValidId(-1)).toBe(false);
    });
    it('should return false if id = a', () => {
      expect.assertions(1);
      expect(isValidId('a')).toBe(false);
    });
    it('should return true if id = "1"', () => {
      expect.assertions(1);
      expect(isValidId('1')).toBe(true);
    });
  });

  describe('email validator', () => {
    it("should return false for 'a@a'", () => {
      expect.assertions(1);
      expect(isValidEmail('a@a')).toBe(false);
    });
    it("should return true for 'test@test.com'", () => {
      expect.assertions(1);
      expect(isValidEmail('test@test.com')).toBe(true);
    });
  });

  describe('url validator', () => {
    it("should return false for '.to'", () => {
      expect.assertions(1);
      expect(isValidUrl('.to')).toBe(false);
    });
    it("should return true for 'https://www.test.com'", () => {
      expect.assertions(2);
      expect(isValidUrl('https://www.test.com')).toBe(true);
      expect(isValidUrl('https://www.test.com')).toBe(true);
    });
  });
});
