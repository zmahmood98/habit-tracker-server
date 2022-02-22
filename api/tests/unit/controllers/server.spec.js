describe('home get request', () => {
    let api;
    
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })


    test('responds with status code 200 to a GET/ request', done => {
        request(api)
            .get('/')
            .expect(200, done)
    })

})

