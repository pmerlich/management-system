import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Shift extends Model {
    
    @Column
    startTime: Date;

    @Column
    endTime: Date;

    @Column
    location: string;

    @BelongsToMany(() => User, () => Assignment)
    users: User[]

}
