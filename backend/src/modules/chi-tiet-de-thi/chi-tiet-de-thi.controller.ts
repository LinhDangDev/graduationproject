import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChiTietDeThiService } from './chi-tiet-de-thi.service';
import { CreateChiTietDeThiDto, UpdateChiTietDeThiDto } from '../../dto';
import { PaginationDto } from '../../dto/pagination.dto';
import { ChiTietDeThi } from '../../entities/chi-tiet-de-thi.entity';

@Controller('chi-tiet-de-thi')
export class ChiTietDeThiController {
    constructor(private readonly chiTietDeThiService: ChiTietDeThiService) { }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.chiTietDeThiService.findAll(paginationDto);
    }

    @Get('de-thi/:maDeThi')
    async findByMaDeThi(
        @Param('maDeThi') maDeThi: string,
        @Query() paginationDto: PaginationDto
    ) {
        return await this.chiTietDeThiService.findByMaDeThi(maDeThi, paginationDto);
    }

    @Get('phan/:maPhan')
    async findByMaPhan(
        @Param('maPhan') maPhan: string,
        @Query() paginationDto: PaginationDto
    ) {
        return await this.chiTietDeThiService.findByMaPhan(maPhan, paginationDto);
    }

    @Post()
    async create(@Body() createChiTietDeThiDto: CreateChiTietDeThiDto) {
        return await this.chiTietDeThiService.createChiTietDeThi(createChiTietDeThiDto);
    }

    @Put(':maDeThi/:maPhan/:maCauHoi')
    async update(
        @Param('maDeThi') maDeThi: string,
        @Param('maPhan') maPhan: string,
        @Param('maCauHoi') maCauHoi: string,
        @Body() updateChiTietDeThiDto: UpdateChiTietDeThiDto,
    ) {
        return await this.chiTietDeThiService.updateChiTietDeThi(
            maDeThi,
            maPhan,
            maCauHoi,
            updateChiTietDeThiDto,
        );
    }

    @Delete(':maDeThi/:maPhan/:maCauHoi')
    async remove(
        @Param('maDeThi') maDeThi: string,
        @Param('maPhan') maPhan: string,
        @Param('maCauHoi') maCauHoi: string,
    ): Promise<void> {
        return await this.chiTietDeThiService.deleteChiTietDeThi(maDeThi, maPhan, maCauHoi);
    }
}
