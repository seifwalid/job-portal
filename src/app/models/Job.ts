// model
export interface Job {
    id: string;
    title: string;
    description: string;
    location: "remote" | "hybrid" | "onsite";
    salary: number;
    status: "open" | "closed";
    qualifications:string ;
    companyName: string;
    applicants: string[];
    postedBy: string;
}

// DTO
