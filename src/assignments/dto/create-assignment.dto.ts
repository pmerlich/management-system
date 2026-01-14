import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateAssignmentDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    shiftId: number;
}
