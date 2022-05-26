import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

describe('CitiesController', () => {
    let controller: CitiesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CitiesController],
            providers: [CitiesService],
        }).compile();

        controller = module.get<CitiesController>(CitiesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('retrieve existing city by its name', () => {
        it('should return proper entity', () => {
            const mock = City.fromRawObject({
                name: 'Sydney',
                name_native: 'Sydney',
                country: 'Australia',
                continent: 'Australia',
                latitude: -33.865143,
                longitude: 151.2099,
                population: 5312000,
                founded: '1788',
                image: '/api/images/sydney.jpeg',
                landmarks: ['Sydney Opera House', 'Sydney Harbour Bridge', 'Queen Victoria Building'],
            });
            const city = controller.findOne('Sydney');
            expect(city.name).toBe(mock.name);
            expect(city.name_native).toBe(mock.name_native);
            expect(city.country).toBe(mock.country);
            expect(city.continent).toBe(mock.continent);
            expect(city.latitude).toBe(mock.latitude);
            expect(city.longitude).toBe(mock.longitude);
            expect(city.population).toBe(mock.population);
            expect(city.founded).toBe(mock.founded);
            expect(city.image).toBe(mock.image);
            expect(city.landmarks).toHaveLength(mock.landmarks.length);
            mock.landmarks.forEach((landmark: string) => {
                expect(city.landmarks).toContain(landmark);
            });
        });
    });

    describe('retrieve not existing city by its name', () => {
        it('should return 404 error', () => {
            try {
                controller.findOne('Dummy');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('retrieve all cities', () => {
        it('should return array of cities with short info', () => {
            const cities = controller.findAll();
            expect(cities.length).toBeGreaterThan(0);
            expect(cities[0]).toHaveProperty('name');
            expect(cities[0]).toHaveProperty('image');
            expect(Object.keys(cities[0])).toHaveLength(2);
        });
    });
});
