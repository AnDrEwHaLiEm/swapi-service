import filmService from "../service/filmService"
import peopleService from "../service/peopleService";

describe('Service test', () => {
    it('search films', async () => {
        const response = await filmService.searchFilms('r');
        expect(response.count).toBe(3);
        expect(response.results).toHaveSize(3);
    });

    it('search people', async () => {
        const response = await peopleService.searchPeople('-');
        expect(response.count).toBe(8);
        expect(response.results).toHaveSize(8);
    });

    it('get All Films', async () => {
        const response = await filmService.getAllFilms();
        expect(response.count).toBe(6);
        expect(response.results).toHaveSize(6);
    });
});