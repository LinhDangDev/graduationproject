import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChiTietDeThi } from './chi-tiet-de-thi.entity';
import { MonHoc } from './mon-hoc.entity';

@Entity('DeThi')
export class DeThi {
    @PrimaryGeneratedColumn('uuid')
    MaDeThi: string;

    @Column({ type: 'uuid' })
    MaMonHoc: string;

    @Column({ type: 'nvarchar', length: 250 })
    TenDeThi: string;

    @Column({ type: 'datetime' })
    NgayTao: Date;

    @Column({ nullable: true })
    DaDuyet: boolean;

    @ManyToOne(() => MonHoc, monHoc => monHoc.DeThi)
    @JoinColumn({ name: 'MaMonHoc' })
    MonHoc: MonHoc;

    @OneToMany(() => ChiTietDeThi, chiTietDeThi => chiTietDeThi.DeThi)
    ChiTietDeThi: ChiTietDeThi[];
}
