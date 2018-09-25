const mockExpress = require('jest-mock-express');
const checkAuth = require('./checkAuth');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

describe('Check auth', () => {
  let mockedRequest = {};
  let mockedResponse = {};
  let mockedNext = () => {};
  beforeEach(() => {
    mockedNext = jest.fn();
    mockedResponse = mockExpress.response();
    jwt.verify = jest.fn().mockReturnValue('Nice');
    Token.find = jest.fn().mockReturnValue({exec: () => [{token: 'model'}]});
    mockedRequest = {
      header: jest.fn().mockReturnValue('A token'),
    };

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
  it('should call next if there is a token in the DB and the token is valid', async () => {
    await checkAuth(mockedRequest, mockedResponse, mockedNext);
    expect(mockedNext).toHaveBeenCalled(); 
  });

  it('should respond with 401 if there is a token in the DB but it is invalid', async () => {
    jwt.verify = jest.fn().mockImplementation(() => { 
      throw new Error('Error');
    }); 
    await checkAuth(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(401); 
    expect(mockedResponse.json).toHaveBeenCalledWith({message: 'Ooops'}); 
  });
});