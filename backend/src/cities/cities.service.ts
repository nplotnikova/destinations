import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { CitiesResponse } from './entities/cities-response.entity';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
    private readonly SOURCE_FILE = join(__dirname, '/sources/cities.json');

    findAll() {
        return this.fromFile;
    }

    findOne(name: string) {
        if (!name) {
            throw Error('City name is not provided');
        }

        const cities = this.findAll();
        return cities?.find((city: City) => city.name.toLowerCase() === name.toLowerCase());
    }

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

        return citiesResponse.cities?.map((city) => City.fromRawObject(city));
    }
}
