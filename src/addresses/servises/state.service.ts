import { Injectable } from '@nestjs/common';
import { State } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { StateCreateData } from '../interfaces/create';
import { StateFilter } from '../interfaces/filter';

@Injectable()
export class StatesService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number): Promise<State | null> {
    return await this.repo.state.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: StateFilter): Promise<State[]> {
    return this.repo.state.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.state.delete({
      where: {
        id: id,
      },
    });
  }

  create(state: StateCreateData) {
    return this.repo.state.create(state);
  }

  update(id: number, state: StateCreateData) {
    return this.repo.state.update({
      where: {
        id: id,
      },
      data: state.data,
    });
  }
}