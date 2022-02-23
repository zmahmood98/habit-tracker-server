describe('auth endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    let newUser1 = {
        "username": "test",
        "email": "www@gmail.com",
        "password": "www"
    }

    it('should successfully register', async () => {
        const res = await request(api).post('/auth/register').send(newUser1);
        expect(res.statusCode).toEqual(201);
        })

    let newUser2 = {
        "username": "test",
        "email": "bill@gmail.com", // email already taken
        "password": "www"
    }

    it('should return 409 conflict - not register if email is taken', async () => {
        const res = await request(api).post('/auth/register').send(newUser2);
        expect(res.statusCode).toEqual(409);
        })

    let userbill = {
        "username": "bill",
        "email": "bill@gmail.com", 
        "password": "bill1"
    }
    
    it('should login and return 200', async () => {
        const res = await request(api).post('/auth/login').send(userbill);
        expect(res.statusCode).toEqual(200);
    })

    let userbill1 = {
        "username": "bill",
        "email": "bill2@gmail.com", // no account with this email
        "password": "bill1"
    }

    it('should not login / no account with that email/ 404 not found', async () => {
        const res = await request(api).post('/auth/login').send(userbill1);
        expect(res.statusCode).toEqual(404);
    })

    let userbill2 = {
        "username": "bill",
        "email": "bill@gmail.com", 
        "password": "bill2" //wrong email
    }

    it('should not login / wrong password / 401 unauthorised', async () => {
        const res = await request(api).post('/auth/login').send(userbill2);
        expect(res.statusCode).toEqual(401);
    })

    


    

})
