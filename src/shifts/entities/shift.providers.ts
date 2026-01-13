import { Shift } from "./shift.entity";

export const usersProviders = [
    {
        provide: 'SHIFT_REPOSITORY',
        useValue: Shift
    }
]