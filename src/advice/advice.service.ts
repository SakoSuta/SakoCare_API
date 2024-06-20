import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entity/resource.entity';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';

@Injectable()
export class AdviceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async create(createAdviceDto: CreateAdviceDto): Promise<Resource> {
    const resource = this.resourceRepository.create(createAdviceDto);
    return this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  async findOne(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return resource;
  }

  async update(
    id: number,
    updateAdviceDto: UpdateAdviceDto,
  ): Promise<Resource> {
    const resource = await this.findOne(id);
    Object.assign(resource, updateAdviceDto);
    return this.resourceRepository.save(resource);
  }

  async remove(id: number): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepository.remove(resource);
  }
}
