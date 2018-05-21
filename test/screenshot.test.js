'use strict';

const mock = require('egg-mock');

describe('test/screenshot.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/screenshot-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, screenshot')
      .expect(200);
  });
});
