import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/deactivate')
  async deactivate(@Param('id') id: number) {
    return this.accountService.deactivate(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/activate')
  async activate(@Param('id') id: number) {
    return this.accountService.activate(id);
  }
}
