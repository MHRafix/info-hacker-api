import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ChatModule } from './api/chat/chat.module';
import { ExpenseModule } from './api/expense/expense.module';
import { ProductsModule } from './api/products/products.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),

    // APis implement here
    UserModule,
    ChatModule,
    ProductsModule,
    ExpenseModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
