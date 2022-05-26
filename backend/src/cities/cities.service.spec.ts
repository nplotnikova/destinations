import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';

describe('CitiesService', () => {
    let service: CitiesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CitiesService],
        }).compile();

        service = module.get<CitiesService>(CitiesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('retrieve all cities from file', () => {
        it('should return array of cities with short info', () => {
            expect(service.findAll()).toHaveLength(8);
        });
    });

    describe('retrieve one city by its name in lower case', () => {
        it('should return proper entity', () => {
            const city = service.findOne('sydney');
            expect(city.name).toBe('Sydney');
        });
    });

    describe('retrieve one city by its name in upper case', () => {
        it('should return proper entity', () => {
            const city = service.findOne('SYDNEY');
            expect(city.name).toBe('Sydney');
        });
    });

    describe('retrieve city by empty name', () => {
        it('should return error', () => {
            try {
                service.findOne('');
            } catch (error) {
                expect(error).toStrictEqual(Error('City name is not provided'));
            }
        });
    });

    describe('retrieve city by not existing name', () => {
        it('should return error', () => {
            const city = service.findOne('Dummy');
            expect(city).toBeUndefined();
        });
    });
});
