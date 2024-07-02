import { Test, TestingModule } from '@nestjs/testing';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { Resource } from '../entity/resource.entity';

describe('AdviceController', () => {
  let adviceController: AdviceController;
  let adviceService: AdviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdviceController],
      providers: [
        {
          provide: AdviceService,
          useValue: {
            create: jest.fn().mockResolvedValue(new Resource()),
            findAll: jest.fn().mockResolvedValue([new Resource()]),
            findOne: jest.fn().mockResolvedValue(new Resource()),
            update: jest.fn().mockResolvedValue(new Resource()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    adviceController = module.get<AdviceController>(AdviceController);
    adviceService = module.get<AdviceService>(AdviceService);
  });

  it('should be defined', () => {
    expect(adviceController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      const createAdviceDto: CreateAdviceDto = {
        title: 'Advice Title',
        description: 'Advice Description',
        content: 'Advice Content',
        url: 'http://example.com',
        category: 'General',
      };
      const result = await adviceController.create(createAdviceDto);
      expect(result).toBeInstanceOf(Resource);
      expect(adviceService.create).toHaveBeenCalledWith(createAdviceDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      const result = await adviceController.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(adviceService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single resource', async () => {
      const id = '1';
      const result = await adviceController.findOne(+id);
      expect(result).toBeInstanceOf(Resource);
      expect(adviceService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a resource', async () => {
      const id = '1';
      const updateAdviceDto: UpdateAdviceDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        content: 'Updated Content',
        url: 'http://updated-example.com',
        category: 'Updated Category',
      };
      const result = await adviceController.update(+id, updateAdviceDto);
      expect(result).toBeInstanceOf(Resource);
      expect(adviceService.update).toHaveBeenCalledWith(+id, updateAdviceDto);
    });
  });

  describe('remove', () => {
    it('should remove a resource', async () => {
      const id = '1';
      const result = await adviceController.remove(+id);
      expect(result).toBeUndefined();
      expect(adviceService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
