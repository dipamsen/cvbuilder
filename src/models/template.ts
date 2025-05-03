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
  education: Education[];
  sections: Section[];
}

interface Section {
  title: string;
  content: string;
}

interface Education {
  year: string;
  degree: string;
  institute: string;
  cgpa: string;
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
  education: [
    {
      year: "2023 - Present",
      degree: "B.Tech",
      institute: "Indian Institute of Technology Kanpur",
      cgpa: "9.8/10",
    },
    {
      year: "2022",
      degree: "CBSE (XII)",
      institute: "Khalsa College Public School, Amritsar",
      cgpa: "92.8%",
    },
    {
      year: "2020",
      degree: "ICSE (X)",
      institute: "Sacred Heart Public School, Punga",
      cgpa: "94%",
    },
  ],
  sections: [],
};
