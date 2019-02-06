const supertest = require('supertest');
const app = require('../src/app.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

describe('Check if home route return status 200', () => {
    test('GET to home should return status 200', done => {
        supertest(app)
            .get('/')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe('Check if wrong route return status 404', () => {
    test('GET to wrong route should return status 404', done => {
        supertest(app)
            .get('/tralala')
            .then(res => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});
