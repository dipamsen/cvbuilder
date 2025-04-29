export interface CVData {
  name: string;
  tagline: string;
  department: string;
  email: string;
  phone: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  linkedinUsername: string;
  sections: Section[];
}

interface Section {
  title: string;
  content: string;
}

export const defaultData: CVData = {
  name: "John Doe",
  tagline: "Third Year Undergraduate, IIT Kanpur",
  department: "Department of Computer Science and Engineering",
  email: "hello@gmail.com",
  phone: "+91 39284 10829",
  githubUrl: "https://github.com",
  githubUsername: "someone",
  linkedinUrl: "https://linkedin.com/",
  linkedinUsername: "someone",
  sections: [],
};
