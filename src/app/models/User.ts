// model
export interface User {
    id: string;
    name: string;
    email: string;
    role: "seeker" | "recruiter";
    postedJobsIds: User["role"] extends "seeker" ? string[] : null;
    appliedJobsIds: User["role"] extends "recruiter" ? string[] : null;
}

// DTO
