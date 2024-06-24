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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindMaterialsDTO } from './dto/find-material.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Material')
@UseGuards(AuthGuard('jwt'))
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    console.log('createMaterialDto', createMaterialDto);
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  findAll(@Query(new ValidationPipe()) query: FindMaterialsDTO) {
    return this.materialService.findAllWithRatingsBy(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }

  @Post(':id/rate')
  rateMaterial(
    @Request() req,
    @Param('id') id: string,
    @Body('value') value: number
  ) {
    const userId = req.user.userId;
    return this.materialService.rateMaterial({
      materialId: +id,
      userId,
      value,
    });
  }
}
