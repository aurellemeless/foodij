import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('plannings')
@UseGuards(JwtAuthGuard)
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  async create(@Body() createPlanningDto: CreatePlanningDto, @Request() req) {
    try {
      await this.planningService.create({
        ...createPlanningDto,
        user: req.user,
      });

      return {
        success: true,
        message: 'Planning Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }

  @Get()
  findAll() {
    return this.planningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planningService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanningDto: UpdatePlanningDto,
    @Request() req,
  ) {
    return this.planningService.update(+id, {
      ...updatePlanningDto,
      user: req.user,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planningService.remove(+id);
  }
}
