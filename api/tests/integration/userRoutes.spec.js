let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

describe('user endpoints', () => {
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

    it('should return a list of all users in database', async () => {
        const res = await request(api).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    })
    
    it('should return forbidden (403) if a request is sent without a token', async () => {
        const res = await request(api).get('/users/bill');
        expect(res.statusCode).toEqual(403);
    }) 

    it('should return not found (404) if user does not exists ', async () => {
        const res = await request(api).get('/users/notanuser').set('Authorization', `Bearer ${token}`);;
        expect(res.statusCode).toEqual(403);
    }) 

    it('should return anuthorized (401) if wrong token is sent ', async () => {
        const res = await request(api).get('/users/bill').set('Authorization', `Bearer notAtoken`);;
        expect(res.statusCode).toEqual(403);
    }) 



    it('should return a single user by name', async () => {
        const res = await request(api).get('/users/jon').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    }) 
})
