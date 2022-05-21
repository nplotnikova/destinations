import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CitiesResponse } from './entities/cities-response.entity';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
    private readonly SOURCE_FILE = `${__dirname}/sources/cities.json`;

    // create(createCityDto: CreateCityDto) {
    //     return 'This action adds a new city';
    // }

    findAll() {
        return this.fromFile;
    }

    findOne(name: string) {
        const cities = this.findAll();
        return cities?.find((city: City) => city.name.toLowerCase() === name.toLowerCase());
    }

    // update(id: number, updateCityDto: UpdateCityDto) {
    //     return `This action updates a #${id} city`;
    // }
    //
    // remove(id: number) {
    //     return `This action removes a #${id} city`;
    // }

    private get fromFile(): City[] {
        let citiesResponse: CitiesResponse;
        try {
            const buffer = fs.readFileSync(this.SOURCE_FILE);
            citiesResponse = JSON.parse(buffer.toString()) as CitiesResponse;
        } catch (error) {
            throw Error(`Could not read from file: ${this.SOURCE_FILE}. ${error}`);
        }

        if (!citiesResponse?.cities) {
            throw Error(`Unexpected structure of the source file`);
        }

        return citiesResponse.cities;
    }
}
