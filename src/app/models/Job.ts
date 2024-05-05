// model
export interface Job {
    id: string;
    title: string;
    description: string;
    location: "remote" | "hybrid" | "onsite";
    salary: number;
    status:string;
    benefits:string;
    responsibilities:string;
    qualifications:string ;
    // companyName: string;
    applicants: string[];
    postedBy: string;
}

// DTO
