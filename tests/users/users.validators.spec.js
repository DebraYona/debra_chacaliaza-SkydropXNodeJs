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
  });

  describe('email validator', () => {
    it("should return false for 'a@a'", () => {
      expect.assertions(1);
      expect(isValidEmail('a@a')).toBe(false);
    });
  });

  describe('url validator', () => {
    it("should return false for 'httttp://eri.to'", () => {
      expect.assertions(1);
      expect(isValidUrl('httttp://eri.to')).toBe(false);
    });
  });
});
