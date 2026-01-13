import { Assignment } from "./assignment.entity" 

export const assignmentProviders = [
    {
        provide: 'ASSIGNMENT_REPOSITORY',
        useValue: Assignment
    }
]