import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('api/cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    // @Post()
    // create(@Body() createCityDto: CreateCityDto) {
    //     return this.citiesService.create(createCityDto);
    // }

    @Get()
    findAll() {
        return this.citiesService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        const city = this.citiesService.findOne(name);
        if (!city) {
            throw new NotFoundException(`City ${name} could not be found`);
        }

        return city;
    }

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
