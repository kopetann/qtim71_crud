import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "crud",
            password: "123456",
            database: "crud",
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            synchronize: true,
            migrations: [__dirname + "/migrations/*{.ts,.js}"],
        }
    }
}