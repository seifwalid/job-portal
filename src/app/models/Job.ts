// model
export interface Job {
    id: string;
    title: string;
    description: string;
    location: "remote" | "hybrid" | "onsite";
    salary: number;
    requirements: string[];
    applicants: string[];
    postedBy: string;
}

// DTO
