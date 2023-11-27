import { Module } from '@nestjs/common';
import { databaseProviders } from './database.config';
@Module({
    controllers: [],
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule {}