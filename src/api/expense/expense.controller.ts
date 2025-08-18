// src/expense/expense.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseService } from './expense.service';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Expense created successfully.' })
  create(@Body() dto: CreateExpenseDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'List all expenses' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get single expense' })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Expense updated' })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Expense deleted' })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
