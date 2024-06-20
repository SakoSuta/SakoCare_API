import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { Resource } from '../entity/resource.entity';

@Controller('resources')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  @Post()
  create(@Body() createAdviceDto: CreateAdviceDto): Promise<Resource> {
    return this.adviceService.create(createAdviceDto);
  }

  @Get()
  findAll(): Promise<Resource[]> {
    return this.adviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Resource> {
    return this.adviceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAdviceDto: UpdateAdviceDto,
  ): Promise<Resource> {
    return this.adviceService.update(id, updateAdviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.adviceService.remove(id);
  }
}
