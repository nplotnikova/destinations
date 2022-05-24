export interface City {
    continent: string;
    country: string;
    founded: string;
    landmarks: string[];
    latitude: number;
    longitude: number;
    name_native: string;
    population: number;

    name: string;
    image: string;
}

export type CityShortInfo = Pick<City, 'name' | 'image'>

