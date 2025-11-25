import { CVData } from "../models/template";

export function typstSanitize(input: string): string {
  return `\`${input}\`.text`;
}

/** returns value in code mode */
export function typify(input: unknown): string {
  if (typeof input === "string") {
    return typstSanitize(input);
  } else if (typeof input === "number") {
    return `${input}`;
  } else if (Array.isArray(input)) {
    // returns array
    if (input.length == 1) return `(${typify(input[0])},)`;
    return `(${input.map(typify).join(", ")})`;
  } else if (input instanceof TypstElt) {
    return input.toCode();
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
    result +=
      typeof values[i] === "string"
        ? values[i]
        : typify(values[i]) + strings[i + 1];
  }
  return result;
}

abstract class TypstElt {
  abstract toCode(): string;
}

export class FC extends TypstElt {
  constructor(
    public name: string,
    public args: unknown[] = [],
    public kwargs: Record<string, unknown> = {}
  ) {
    super();
  }

  toCode() {
    // const argsStr = typify(this.args);
    // const kwargsStr = typify(this.kwargs);
    // return `${this.name}(..${kwargsStr}, ..${argsStr})`;
    const argsStr = this.args.map(typify).join(", ");
    const kwargsStr = Object.entries(this.kwargs)
      .map(([key, value]) => `${key}: ${typify(value)}`)
      .join(", ");

    return `${this.name}(${[kwargsStr, argsStr].filter(Boolean).join(", ")})`;
  }
}

export class Content extends TypstElt {
  constructor(public str: string) {
    super();
  }
  toCode() {
    return `[\n${this.str}\n]`;
  }
}


const common = `
#import "@preview/fontawesome:0.5.0": fa-icon

#let section(title: "", body) = {
  heading(title, level: 2)
  body
}

#let entry(title: "", from: "", to: "", duration: "") = {
  [#strong(title) #h(1fr) #emph[#from #sym.dash.en #to]]
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
`


export function generateTypstCV(data: CVData, template: string): string {
  let out;
  if (template === "iitk") {
    out = common + typ`

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
`
  } else if (template === "iitkgp") {
    out = common + typ`
    
#let resume(body, ..args) = {
  set text(font: "PT Sans", 11pt)
  
  set page(margin: 0.7cm)

  let name = args.at("name")
  let roll = args.at("roll", default: none)
  let tagline = args.at("tagline")
  let dept = args.at("dept")
  let email = args.at("email", default: none)
  let phone = args.at("phone", default: none)
  let github = args.at("github", default: none)
  let linkedin = args.at("linkedin", default: none)

  set table(inset: 0.4em, stroke: 0.5pt)

  show heading.where(level: 2): it => {
    set block(above: 0.5em, below: 0.5em)
    set align(center)
    block(upper(it.body), fill: rgb("#e1e9f0"), width: 100%, inset: (x: 0.3em, y: 0.4em), stroke: (y: gray))
  }

  set list(marker: ([\u{25cf}], [\u{26AC}]))

  let name-el = {
    set block(spacing: 0.2em)
    set text(1.4em, weight: "bold", bottom-edge: "descender")
    block(
      (upper(name), roll).filter(x => x != none).join([#h(0.7em)|#h(0.7em)])
    )
  }
  let email-el = if email != none {link("mailto:" + email)[#fa-icon("envelope", solid: true) #email]}
  let phone-el = if phone != none [#fa-icon("phone", solid: true) #phone]
  let github-el = if github != none { link(github.at("url"))[#fa-icon("github") #github.at("username")] }
  let linkedin-el = if linkedin != none {link(linkedin.at("url"))[#fa-icon("linkedin") #linkedin.at("username")]}

  let contacts = (email-el, phone-el, github-el, linkedin-el).filter(i => i != none).join([ | ])
  
  grid(
    columns: (50pt, 1fr, 50pt), 
    row-gutter: 0.65em, 
    align: (left, center + horizon, right),
    // image("../images/iitkgp.svg", width: 100%),
    block(height: 60pt)[],
    [
      #set par(spacing: 0.65em)
      #name-el
      #dept
      
      #contacts
    ]
  )
  
  
  
  body
} 
`
  } else {
    return "";
  }
  out += typ`

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

#section(title: "Scholastic Achievements", ${new Content(data.achievements)})

#section(title: "Key Projects", list(..${data.projects.map(
      (proj) =>
        new FC("project", [new Content(proj.description)], {
          title: proj.title,
          url: proj.url || undefined,
          attr: proj.attr,
          from: proj.from,
          to: proj.to,
        })
    )}))


#section(title: "Technical Skills", ${new Content(data.skills)})

#section(title: "Relevant Coursework")[
  #table(
    columns: (1fr, 1fr, 1fr), 
    ${new Content(data.coursework[0])}, 
    ${new Content(data.coursework[1])},
    ${new Content(data.coursework[2])}
  )
]


#section(title: "Positions of Responsibility", ${new Content(data.por)})

#section(title: "Extra Curriculars", ${new Content(data.extracurriculars)})
  `;
    return out;
}
