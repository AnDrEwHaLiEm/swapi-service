import supertest from 'supertest';
import app from '..';
const request = supertest(app);

describe('Api test', () => {
    it('check healthy', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.body).toBe('hello world!');
    });

    it('migration', async () => {
        const response = await request.post('/films/migration');
        expect(response.status).toEqual(200);
        expect(response.body.newFilms).toHaveSize(6);
        expect(response.body.savedFilmsTitles).toBeNull();
        expect(response.body.unSavedFilmsTitles).toHaveSize(0);
    });

    it('migrate again', async () => {
        const response = await request.post('/films/migration');
        expect(response.status).toEqual(200);
        expect(response.body.newFilms).toHaveSize(0);
        expect(response.body.savedFilmsTitles).toHaveSize(6);
        expect(response.body.unSavedFilmsTitles).toHaveSize(0);
    });

    it('search films', async () => {
        const response = await request.get('/films/r');
        expect(response.status).toEqual(200);
        expect(response.body.count).toBe(3);
        expect(response.body.results).toHaveSize(3);
    });

    it('search people', async () => {
        const response = await request.get('/people/-');
        expect(response.status).toEqual(200);
        expect(response.body.count).toBe(8);
        expect(response.body.results).toHaveSize(8);
    });


});

