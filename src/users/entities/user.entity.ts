import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Shift } from 'src/shifts/entities/shift.entity';

@Table
export class User extends Model {
    @Column
    name: string;
    
    @Column
    email: string;

    @Column
    password: string;

    @Column
    role: string;

    @BelongsToMany(() => Shift, () => Assignment)
    shifts: Shift[]
}
