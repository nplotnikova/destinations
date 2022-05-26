import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
    imports: [
        CitiesModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '/assets/images'),
            serveRoot: '/api/images',
        }),
    ],
})
export class AppModule {}
