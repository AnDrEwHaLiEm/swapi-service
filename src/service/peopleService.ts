// src/services/peopleService.ts
import { IPeopleSearchResponse } from '../types/IPeopleSchema';
import loggerHandler from '../utils/logger/loggerHandler';
import AxiosService from './axiosSetup';

class PeopleService extends AxiosService {
    async searchPeople(key: string): Promise<IPeopleSearchResponse> {
        try {
            return await this.instance.get(`/people/?search=${key}`);
        } catch (error) {
            loggerHandler.errorLogger('Error in searchPeople service', error as Error);
            throw error;
        }
    }
}

const peopleService = new PeopleService();
export default peopleService;
