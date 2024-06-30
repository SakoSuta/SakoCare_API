// src/userResources/userResources.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { Resource } from '../entity/resource.entity';
import { UserResources } from '../entity/userResources.entity';

@Injectable()
export class UserResourcesService {
  constructor(
    @InjectRepository(EmotionalJournal)
    private readonly journalRepository: Repository<EmotionalJournal>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(UserResources)
    private readonly userResourcesRepository: Repository<UserResources>,
  ) {}

  async analyzeUserJournals(userId: number, startDate: Date, endDate: Date) {
    const journals = await this.journalRepository.find({
      where: {
        user: { id: userId },
        entry_date: Between(startDate, endDate),
      },
    });

    let totalEnergy = 0,
      totalStress = 0,
      totalSocial = 0;
    let totalSleepHours = 0,
      totalExerciseTime = 0,
      count = 0;

    journals.forEach((journal) => {
      totalEnergy += journal.energy_level;
      totalStress += journal.stress_level;
      totalSocial += journal.social_level;
      totalSleepHours += journal.sleep_hours;
      totalExerciseTime += journal.exercise_time;
      count++;
    });

    const avgEnergy = totalEnergy / count;
    const avgStress = totalStress / count;
    const avgSocial = totalSocial / count;
    const avgSleepHours = totalSleepHours / count;
    const avgExerciseTime = totalExerciseTime / count;

    return {
      avgEnergy,
      avgStress,
      avgSocial,
      avgSleepHours,
      avgExerciseTime,
    };
  }

  async recommendResources(userId: number, startDate: Date, endDate: Date) {
    const analysis = await this.analyzeUserJournals(userId, startDate, endDate);

    const categoriesToRecommend = [];

    if (analysis.avgEnergy < 3) {
      categoriesToRecommend.push('energy');
    }

    if (analysis.avgStress > 3) {
      categoriesToRecommend.push('stress');
    }

    if (analysis.avgSocial < 3) {
      categoriesToRecommend.push('social');
    }

    if (analysis.avgSleepHours < 7 || analysis.avgSleepHours > 9) {
      categoriesToRecommend.push('sleep');
    }

    if (analysis.avgExerciseTime < 2.5) {
      categoriesToRecommend.push('exercise');
    }

    if (categoriesToRecommend.length === 0) {
      return { message: 'No recommendations needed at this time.' };
    }

    const lastRecommendation = await this.userResourcesRepository.findOne({
      where: {
        user: { id: userId },
        createdAt: MoreThan(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      },
      order: { createdAt: 'DESC' },
    });

    let categoryToRecommend;

    if (lastRecommendation && categoriesToRecommend.length > 1) {
      categoryToRecommend = categoriesToRecommend.find(
        (category) => category !== lastRecommendation.category,
      );

      if (!categoryToRecommend) {
        categoryToRecommend = categoriesToRecommend[0];
      }
    } else {
      categoryToRecommend = categoriesToRecommend[0];
    }

    const recommendedResources = await this.resourceRepository.find({
      where: { category: categoryToRecommend },
    });

    const alreadyRecommendedResources = await this.userResourcesRepository.find(
      {
        where: { user: { id: userId } },
        relations: ['resource'],
      },
    );

    const alreadyRecommendedResourceIds = alreadyRecommendedResources.map(
      (res) => res.resource.id,
    );

    const newRecommendedResources = recommendedResources.filter(
      (resource) => !alreadyRecommendedResourceIds.includes(resource.id),
    );

    if (newRecommendedResources.length > 0) {
      const selectedResource = newRecommendedResources[0];
      await this.userResourcesRepository.save({
        user: { id: userId },
        resource: selectedResource,
        category: categoryToRecommend,
      });
      return selectedResource;
    } else {
      return { message: 'No new resources to recommend at this time.' };
    }
  }
}
