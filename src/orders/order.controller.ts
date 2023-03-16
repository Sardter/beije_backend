import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { FilterProcessor, InputFilter } from 'src/interfaces/filter';
import { OrderCreateInputData } from './interfaces/create';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private service: OrdersService) {}
  @Get()
  async filter(@Query() params: InputFilter): Promise<Order[]> {
    const proccessor = new FilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Post()
  async create(@Body() body: OrderCreateInputData): Promise<Order> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.remove(parsed);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: OrderCreateInputData,
  ): Promise<Order> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
