import { Table, Column, Model,ForeignKey } from 'sequelize-typescript';
import { Shift } from 'src/shifts/entities/shift.entity';
import { User } from 'src/users/entities/user.entity';


@Table({
    timestamps: false,
})
export class Assignment extends Model{
    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @ForeignKey(() => Shift)
    @Column
    declare shiftId: number;
}
