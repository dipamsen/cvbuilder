import { CVData } from "../models/template";

export function typstSanitize(input: string): string {
  return `\`${input.replace(/-/g, "–")}\`.text`;
}

/** returns value in code mode */
export function typify(input: unknown): string {
  if (typeof input === "string") {
    return typstSanitize(input);
  } else if (typeof input === "number") {
    return `${input}`;
  } else if (Array.isArray(input)) {
    // returns array
    return `(${input.map(typify).join(", ")})`;
  } else if (typeof input === "object" && input !== null) {
    // returns dict
    return `(${Object.entries(input)
      .map(([key, value]) => `${key}: ${typify(value)}`)
      .join(", ")})`;
  }
  return `none`;
}

/**
 * Template literal tag function for Typst.
 */
export function typ(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += typify(values[i]) + strings[i + 1];
  }
  return result;
}

export function generateTypstCV(data: CVData, template: string): string {
  if (template === "iitk")
    return typ`
#import "@preview/fontawesome:0.5.0": fa-icon


#let section(title: "", body) = {
  heading(title, level: 2)
  body
}

#let project(body, ..args) = {
  let title = args.at("title")
  let url = args.at("url", default: none)
  let attr = args.at("attr", default: none)
  let dur = args.at("dur", default: none)
  let from = args.at("from", default: none)
  let to = args.at("to", default: none)
  if url == none {
    strong(title)
  } else {
    show: link.with(url)
    strong(title)
    [ ]
    box(fa-icon("github"))
  }
  if attr != none {
    [ | ]
    attr
  }
  if dur != none {
    h(1fr)
    emph(dur)
  } else if from != none and to != none {
    h(1fr)
    emph[#from #sym.dash.en #to]
  }
  body
}

#let resume(body, ..args) = {
  set text(font: "New Computer Modern", 11pt)
  
  set page(margin: 0.7cm)

  let name = args.at("name")
  let tagline = args.at("tagline")
  let dept = args.at("dept")
  let email = args.at("email", default: none)
  let phone = args.at("phone", default: none)
  let github = args.at("github", default: none)
  let linkedin = args.at("linkedin", default: none)

  set table(inset: 0.4em, stroke: 0.5pt)

  show heading.where(level: 2): it => {
    set block(above: 0.5em, below: 0.5em)
    block(it.body, fill: luma(210), width: 100%, inset: (x: 0.3em, y: 0.4em))
  }

  set list(marker: ([\\u{25cf}], [\\u{26AC}]))

  let name-el = {
    set text(1.67em, weight: "bold", bottom-edge: "descender")
    block(name)
  }
  let email-el = if email != none {link("mailto:" + email)[#fa-icon("envelope", solid: true) #email]}
  let phone-el = if phone != none [#fa-icon("phone", solid: true) #phone]
  let github-el = if github != none { link(github.at("url"))[#fa-icon("github") #github.at("username")] }
  let linkedin-el = if linkedin != none {link(linkedin.at("url"))[#fa-icon("linkedin") #linkedin.at("username")]}

  let contacts1 = (email-el, phone-el).filter(i => i != none).join([ | ])
  let contacts2 = (github-el, linkedin-el).filter(i => i != none).join([ | ])
  
  grid(
    columns: (1fr, auto), 
    row-gutter: 0.65em, 
    align: (left, right),
    grid.cell(colspan: 2, name-el), 
    tagline, 
    contacts1,
    dept,
    contacts2
  )
  {
    set block(spacing: 0.65em)
    line(length: 100%)
  }
  
  
  body
} 


#show: resume.with(
  ..${{
    name: data.name,
    tagline: data.tagline,
    dept: data.department,
    email: data.email || undefined,
    phone: data.phone || undefined,
    github:
      data.githubUrl || data.githubUsername
        ? {
            username: data.githubUsername,
            url: data.githubUrl,
          }
        : undefined,
    linkedin:
      data.linkedinUrl || data.linkedinUsername
        ? {
            username: data.linkedinUsername,
            url: data.linkedinUrl,
          }
        : undefined,
  }}
)

#section(title: "Academic Qualifications")[
  #show table.cell.where(y: 0): strong
  #table(
    columns: (3.5fr, 7fr, 10fr, 2.5fr),
    align: (center, center, center, left),
    table.header(
      [Year], [Degree/Certificate], [Institute/School], [CPI/\\%]
    ),
    ..${data.education
      .map((edu) => [edu.year, edu.degree, edu.institute, edu.cgpa])
      .flat()}
  )
]

#section(title: "Scholastic Achievements")[
  - Received the *Academic Excellence Award* for exceptional academic performance in 2022-23 session.
  - Secured *All India Rank XXX* in *Joint Entrance Exam (Advanced) 2023* among the 250,000 candidates.
  - Secured *All India Rank XXX* in *Joint Entrance Exam (Mains) 2023* among the 1,200,00 candidates.
  - Qualified for *National Talent Search Exam* among XXXXXX candidates conducted by CBSE in 2020.
]

#section(title: "Key Projects")[
  - #project(
      title: "Very Cool Todo App", 
      url: "https://github.com",
      attr: [Coding Club, IIT Kanpur],
      from: "Jan'23", to: "Mar'23"
    )[
    - Designed and developed a *modern, responsive task management web app* with a focus on *performance* and *user experience*.
    - Implemented a *dynamic state management system* enabling real-time task updates without *page reloads*.
    - Integrated *persistent storage* using *browser APIs* to ensure data durability without a backend.
  ]
  
  - #project(
      title: "MyCompiler", 
      attr: [Course Project | Prof. Arghya Das],
      from: "Jan'24", to: "Mar'24"
    )[
    - Built a *compiler from scratch* for a custom programming language, including *lexer,* *parser* and *type checker*
    - Implemented *recursive descent parsing* and *AST generation* for full *language grammar support*, including *control flow, expressions, and user-defined functions*.
    - Designed and enforced a *static type system* with support for *type inference*, *scoping,* and *error reporting*.
  ]

]


#section(title: "Technical Skills")[
  - *Programming Languages:* C, C++, Java, Python, JavaScript, Ruby, Rust, Go, Haskell, OCaml, LaTeX
  - *Software and Libraries:* Git, GitHub, Docker, React, Express, Node.js, MongoDB
]


#section(title: "Relevant Coursework")[
  #table(columns: (1fr, 1fr, auto))[
    Data Structure and Algorithms\\ 
    Fundamentals of Computing \\
    Computer Organisation
  ][
    Discrete Mathematics \\
    Logic for Computer Science\\ 
    Probability for Computer Science
  ][
    Linear Algebra and ODE \\
    Real Analysis and Multivariate Calculus \\
    Software Development 
  ]
]


#section(title: "Positions of Responsibility")[
  - *Member, Coding Club, IIT Kanpur* #h(1fr) #emph[Jul'23 #sym.dash Present]
    - Hosted and managed events organised by the Coding Club
]

#section(title: "Extra Curriculars")[
  - Participated in Inter-IIT Tech Meet 11 (Feb 2024)
]
  `;
  return ``;
}
