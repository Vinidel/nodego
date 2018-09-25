const {generateToken} = require('./token');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Token', () => {
  beforeEach(() => {
    jwt.sign = jest.fn();
  });
  it('should call jwt.sign with the correct params', () => {
    process.env.JWT_KEY = 'test';
    generateToken({email: 'test@test.com', userId: '1234'});
    expect(jwt.sign).toHaveBeenCalledWith({email: 'test@test.com', userId: '1234'}, 'test', {expiresIn: '1h'});
  });
});