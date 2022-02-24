let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

describe('habit endpoints', () => {
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
    /////////////////////////////////////////////////////////////////////////////////////////
    // GET

    it('should show all habits', async () => {
        const res = await request(api).get('/habits')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        })

    it('no token/403 forbidden/show habits not allowed', async () => {
        const res = await request(api).get('/habits')
        .set('Authorization', `Bearer notAtoken`);
        expect(res.statusCode).toEqual(403);
        })

    it('should show habits by email', async () => {
        const res = await request(api).get('/habits/bill@gmail.com')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        })

    it('no token/403 forbidden/show habits not allowed', async () => {
        const res = await request(api).get('/habits/bill@gmail.com')
        .set('Authorization', `Bearer notAtoken`);
        expect(res.statusCode).toEqual(403);
        })

    it('expect no data is returned if email not stored in db', async () => {
        const res = await request(api).get('/habits/bill2@gmail.com')
        .set('Authorization', `Bearer ${token}`);
        expect(res.body.length).toEqual(0);
        })


     // /habits/habits/:id/:username (uses .getHabitsPlusStreaks)

     it('should show habits and streaks by username with status code 200', async () => {
        const res = await request(api).get('/habits/habits/0/bill')
        //.set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        })

    it('returns 404 - Not Found if username not in DB', async () => {
        const res = await request(api).get('/habits/habits/0/billly')
        //.set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        })


    // habits/graph-data/:email 

    it('returns graph-data by email with status code 200', async () => {
        const res = await request(api).get('/habits/graph-data/bill@gmail.com')
        //.set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        })

    it('returns 404 - No graph data found if username not in DB', async () => {
        const res = await request(api).get('/habits/graph-data/billly@gmail.com')
        //.set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        })

    ////////////////////////////////////////////////////////////////////////////////////
     // POST routes

    let newHabitData = {"habit": "running", "frequency":2, "username":"bill"}
   

    it('return 201 - Created - posts a new habit by username', async () => {
        const res = await request(api).post('/habits/bill').send(newHabitData)
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        })

    it('returns 500 - cannot create habit for username not registered', async () => {
        const res = await request(api).post('/habits/billy')
        //.set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(500);
        })
    
    /// router.post('/:username/habits/entries', habitController.updateHabitCounter)

    let updateHabitObj = {"username":"jon", "habit_id":"2"}

    it('return 201 - updates habit by username', async () => {
            const res = await request(api).post('/habits/bill/habits/entries').send(updateHabitObj)
            .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(201);
            })
    
    it('returns 500 - cannot update habit if username not registered', async () => {
            const res = await request(api).post('/habits/billy/habits/entries').send(updateHabitObj)
            expect(res.statusCode).toEqual(500);
            })

     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DELETE habit by habit id

    it('return 202 - habit deleted by habit id', async () => {
        const res = await request(api).delete('/habits/delete/1')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(202);
        })

    it('returns 403 - forbidden - cannot delete without auth', async () => {
            const res = await request(api).delete('/habits/delete/10')
            expect(res.statusCode).toEqual(403);
            })

    it('returns 500 - cannot delete habit that does not exist', async () => {
        const res = await request(api).delete('/habits/delete/100').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(500);
        })

  

})
