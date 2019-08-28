const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const nock = require('nock');

const getUser = require('../index').getUser;
const server = require('../index').app;
const response = require('./response');

chai.use(chaiHttp);

describe('Get User tests', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get('/users/octocat')
      .reply(200, response);
  });

  it('Get a user by username', () => {
    return getUser('octocat')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
        // process.exit(0)
      });
  });
});

describe('test api local', () => {
  beforeEach(() => {
    nock('localhost')
      .get('/')
      .reply(200, {status: "UP"});
  })

  it('GET', () => {
    //https://www.chaijs.com/plugins/chai-http/
    chai.request(server)
      .get('/').then(response => console.log(response))
  })
})
