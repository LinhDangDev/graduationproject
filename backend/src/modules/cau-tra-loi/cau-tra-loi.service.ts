import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';
import { CauTraLoi } from '../../entities/cau-tra-loi.entity';
import { CreateCauTraLoiDto, UpdateCauTraLoiDto } from '../../dto/cau-tra-loi.dto';
import { PaginationDto } from '../../dto/pagination.dto';
import { PAGINATION_CONSTANTS } from '../../constants/pagination.constants';
import { randomUUID } from 'crypto';

@Injectable()
export class CauTraLoiService extends BaseService<CauTraLoi> {
    constructor(
        @InjectRepository(CauTraLoi)
        private readonly cauTraLoiRepository: Repository<CauTraLoi>,
    ) {
        super(cauTraLoiRepository, 'MaCauTraLoi');
    }

    async findByMaCauHoi(maCauHoi: string, paginationDto?: PaginationDto) {
        if (!paginationDto) {
            return await this.cauTraLoiRepository.find({
                where: { MaCauHoi: maCauHoi },
                relations: ['Files'],
                order: { ThuTu: 'ASC' },
            });
        }
        const { page = PAGINATION_CONSTANTS.DEFAULT_PAGE, limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT } = paginationDto;
        const [items, total] = await this.cauTraLoiRepository.findAndCount({
            where: { MaCauHoi: maCauHoi },
            relations: ['Files'],
            order: { ThuTu: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                availableLimits: PAGINATION_CONSTANTS.AVAILABLE_LIMITS
            }
        };
    }

    async createCauTraLoi(createCauTraLoiDto: CreateCauTraLoiDto): Promise<CauTraLoi> {
        const cauTraLoi = this.cauTraLoiRepository.create({
            ...createCauTraLoiDto,
            MaCauTraLoi: randomUUID()
        });
        return await this.cauTraLoiRepository.save(cauTraLoi);
    }

    async updateCauTraLoi(maCauTraLoi: string, updateCauTraLoiDto: UpdateCauTraLoiDto): Promise<CauTraLoi> {
        await this.cauTraLoiRepository.update(maCauTraLoi, updateCauTraLoiDto);
        return await this.findOne(maCauTraLoi);
    }
}
