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
  projects: Project[];
  achievements: string;
  skills: string;
  coursework: string[];
  por: string;
  extracurriculars: string;
}

// interface Section {
//   title: string;
//   content: string;
// }

interface Education {
  year: string;
  degree: string;
  institute: string;
  cgpa: string;
}

interface Project {
  title: string;
  description: string;
  url?: string;
  attr: string;
  from: string;
  to: string;
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
  projects: [
    {
      title: "Very Cool Todo App",
      url: "https://github.com",
      description: `- Designed and developed a *modern, responsive task management web app* with a focus on *performance* and *user experience*.
- Implemented a *dynamic state management system* enabling real-time task updates without *page reloads*.
- Integrated *persistent storage* using *browser APIs* to ensure data durability without a backend.`,
      attr: "Coding Club, IIT Kanpur",
      from: "Jan'23",
      to: "Mar'23",
    },
    {
      title: "MyCompiler",
      attr: "Course Project | Prof. Arghya Das",
      from: "Jan'24",
      to: "Mar'24",
      description: `- Built a *compiler from scratch* for a custom programming language, including *lexer,* *parser* and *type checker*
- Implemented *recursive descent parsing* and *AST generation* for full *language grammar support*, including *control flow, expressions, and user-defined functions*.
- Designed and enforced a *static type system* with support for *type inference*, *scoping,* and *error reporting*.
`,
    },
  ],
  achievements: `- Received the *Academic Excellence Award* for exceptional academic performance in 2022-23 session.
- Secured *All India Rank XXX* in *Joint Entrance Exam (Advanced) 2023* among the 250,000 candidates.
- Secured *All India Rank XXX* in *Joint Entrance Exam (Mains) 2023* among the 1,200,00 candidates.
- Qualified for *National Talent Search Exam* among XXXXXX candidates conducted by CBSE in 2020.
`,
  skills: `- *Programming Languages:* C, C++, Java, Python, JavaScript, Ruby, Rust, Go, Haskell, OCaml, LaTeX
- *Software and Libraries:* Git, GitHub, Docker, React, Express, Node.js, MongoDB`,
  coursework: [
    `Data Structure and Algorithms\\
Fundamentals of Computing \\
Computer Organisation`,
    `Discrete Mathematics \\
Logic for Computer Science\\
Probability for Computer Science`,
    `Linear Algebra and ODE \\
Real Analysis \\
Software Development`,
  ],
  por: `- *Member, Coding Club, IIT Kanpur* #h(1fr) #emph[Jul'23 #sym.dash Present]
  - Hosted and managed events organised by the Coding Club`,
  extracurriculars: `- Participated in *Inter-IIT Tech Meet 11* (Feb 2024)\n`,
};
