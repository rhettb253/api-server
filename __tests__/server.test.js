'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(app);
const { sequelize } = require('../src/auth/models/index.model');

const user1 = {username:'rhett', password:'piggy'};
const user2 = {username:'mallory', password:'piglet'};

//beforeEach, afterEach, beforeAll & afterAll can handle asynchronous code by either taking a done parameter or return a promise.
beforeAll( async () => {
    return await sequelize.sync();
});
afterAll( async () => {
    return await sequelize.drop();
});

describe('test the server routes and database', () => {
    test('we can post a new user to /signup', async () => {
        const res = await mockReq.post('/signup').send(user1);
        console.log(res);
        expect(res.status).toBe(201);
        expect(res._body.username).toBe('rhett');
        expect(res._body.password).toBeTruthy();
    });

    test('we can sign in a user via basicAuth through /signin', async () => {
        
    });
});