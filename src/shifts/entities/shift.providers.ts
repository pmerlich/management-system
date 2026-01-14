import { Shift } from "./shift.entity";

export const shiftProviders = [
    {
        provide: 'SHIFT_REPOSITORY',
        useValue: Shift
    }
]
