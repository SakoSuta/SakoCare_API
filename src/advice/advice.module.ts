import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdviceService } from './advice.service';
import { AdviceController } from './advice.controller';
import { Resource } from '../entity/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [AdviceService],
  controllers: [AdviceController],
})
export class AdviceModule {}
