import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

@Controller('api/cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    // @Post()
    // create(@Body() createCityDto: CreateCityDto) {
    //     return this.citiesService.create(createCityDto);
    // }

    @Get()
    findAll() {
        return this.citiesService.findAll()?.map((city: City) => city.shortInfo);
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        const city = this.citiesService.findOne(name);
        if (!city) {
            throw new NotFoundException(`City ${name} could not be found`);
        }

        return city;
    }

    // @Get(':name/picture')
    // findPicture(@Param('name') name: string) {
    //     const city = this.citiesService.findOne(name);
    //     if (!city) {
    //         throw new NotFoundException(`City ${name} could not be found`);
    //     }
    //
    //     return ;
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    //     return this.citiesService.update(+id, updateCityDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.citiesService.remove(+id);
    // }
}
