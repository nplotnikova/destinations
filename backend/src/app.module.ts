import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';

@Module({
    imports: [
        CitiesModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '/assets/images'),
            serveRoot: '/api/images',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
