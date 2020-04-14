import submitPayment from './submitPayment';

describe('submitPayment', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
  });
  afterEach(() => {
    localStorage.setItem.mockRestore();
  });
  it('calls remote endpoint with authorization token', done => {
    const mockToken = 'TOKEN';
    const mockResponse = { foo: 'ok' };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}`) {
            resolve({
              json: () => mockResponse
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem('CLEENG_AUTH_TOKEN', mockToken);
    submitPayment().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error('error'));
        })
    );

    submitPayment().then(res => {
      expect(res).toEqual(new Error('error'));
      done();
    });
  });
});
