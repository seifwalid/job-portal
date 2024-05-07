// model
export interface User {
    map(arg0: (jobGroup: any) => any): any;
    id: string;
    name: string;
    email: string;
    role: "seeker" | "recruiter";
    postedJobsIds: User["role"] extends "seeker" ? string[] : null;
    appliedJobsIds: User["role"] extends "recruiter" ? string[] : null;
    savedJobsIds: User["role"] extends "seeker" ? string[] : null;
    companyDescription:User["role"] extends "seeker"? string[]:null;
    companyContactInfo:User["role"] extends "seeker"? string[]:null;
    applicants:User["role"] extends "recruiter"? string[]:null;
    profilePic: string;
    resume: string;
    
}

// DTO
