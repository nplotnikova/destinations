export type CityShortInfo = Pick<City, 'name' | 'image'>;

export class City {
    continent: string;
    country: string;
    founded: string;
    image: string;
    landmarks: string[];
    latitude: number;
    longitude: number;
    name: string;
    name_native: string;
    population: number;

    static fromRawObject(init?: Partial<City>): City {
        const city = new City();
        Object.assign(city, init);

        city.latitude = +init.latitude;
        city.longitude = +init.longitude;
        city.population = +init.population;

        return city;
    }

    public get shortInfo(): CityShortInfo {
        return <CityShortInfo>{
            name: this.name,
            image: this.image,
        };
    }
}
