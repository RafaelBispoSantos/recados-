import { ParseIntPipe } from './../common/pipes/parse-int-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Query,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
//import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { Request } from 'express';
//CRUD
// Create -> POST -> Criar um recado
// READ  -> GEt -> Ler todos os recados
// READ -> GET -> Ler apenas um recado
// Update -> PATH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

//DTO - Data Transfer object -> Objeto de tranferencia de dados
@UseInterceptors(AuthTokenInterceptor)
@Controller('recados')
@UsePipes(ParseIntPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    //console.log('RecadosController findAll executado');
    console.log('RecadosController', req['user']);
    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
