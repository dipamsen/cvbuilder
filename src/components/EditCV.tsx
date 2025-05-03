import { useCVContext } from "../contexts/CVContext";
import { CVData } from "../models/template";
import TextInput, { Label } from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EditCV() {
  const { state, setState, template, setTemplate, compiler } = useCVContext();

  const changeHandler =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };

  const mutableChangeHandler =
    (mut: (prevState: CVData, val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState((prevState) => {
        const newState = structuredClone(prevState);
        mut(newState, value);
        return newState;
      });
    };

  const downloadPdf = async () => {
    console.log("Downloading PDF...", compiler);
    const res = await compiler?.compile({
      format: "pdf",
      mainFilePath: "/main.typ",
    });
    if (res && res.result) {
      const blob = new Blob([res.result], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const labelStyle = "block text-md font-medium text-gray-300";

  return (
    <div className="edit-cv-container bg-gray-800 p-8 shadow-lg rounded-lg md:w-1/2 flex flex-col">
      <h2 className="text-3xl font-semibold mb-6 shrink-0">Edit Your CV</h2>
      <form className="space-y-4 flex flex-col  overflow-hidden">
        <div className="overflow-y-auto h-full space-y-2 flex flex-col flex-1 px-2">
          <div>
            <label htmlFor="template" className={labelStyle}>
              Choose Template
            </label>
            <input
              type="radio"
              name="template"
              value="iitk"
              checked={template === "iitk"}
              onChange={(e) => setTemplate(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="iitk" className="mr-4">
              IITK
            </label>
          </div>
          <TextInput
            id="name"
            label="Name"
            value={state.name}
            onChange={changeHandler("name")}
          />
          <TextInput
            id="tagline"
            label="Tagline"
            value={state.tagline}
            onChange={changeHandler("tagline")}
          />
          <TextInput
            id="department"
            label="Department"
            value={state.department}
            onChange={changeHandler("department")}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <TextInput
              id="email"
              label="Email"
              value={state.email}
              onChange={changeHandler("email")}
              type="email"
            />
            <TextInput
              id="phone"
              label="Phone"
              value={state.phone}
              onChange={changeHandler("phone")}
              type="tel"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TextInput
              id="github"
              label="GitHub"
              value={state.githubUrl}
              onChange={changeHandler("githubUrl")}
              type="url"
            />
            <TextInput
              id="github-username"
              label="GitHub Username"
              value={state.githubUsername}
              onChange={changeHandler("githubUsername")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TextInput
              id="linkedin"
              label="LinkedIn"
              value={state.linkedinUrl}
              onChange={changeHandler("linkedinUrl")}
              type="url"
            />
            <TextInput
              id="linkedin-username"
              label="LinkedIn Username"
              value={state.linkedinUsername}
              onChange={changeHandler("linkedinUsername")}
            />
          </div>
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-300">
                Academic Qualifications
              </h3>
              <button
                type="button"
                className="cursor-pointer hover:text-blue-500"
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    education: [
                      ...prevState.education,
                      { year: "", degree: "", institute: "", cgpa: "" },
                    ],
                  }));
                }}
                title="Add Entry"
                aria-label="Add Entry"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
              </button>
            </div>
            <div>
              <div className="flex items-center">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 lg:mb-2 flex-1">
                  <Label label="Year" />
                  <Label label="Degree/Certificate" />
                  <Label label="Institute/School" />
                  <Label label="CPI/%" />
                </div>
                <button type="button" className="invisible">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              {state.education.map((edu, index) => (
                <div key={index} className="flex items-center">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 lg:mb-2 flex-1">
                    <TextInput
                      id={`year-${index}`}
                      placeholder="Year"
                      value={edu.year}
                      onChange={mutableChangeHandler((prevState, val) => {
                        prevState.education[index].year = val;
                      })}
                    />
                    <TextInput
                      id={`degree-${index}`}
                      placeholder="Degree/Certificate"
                      value={edu.degree}
                      onChange={mutableChangeHandler((prevState, val) => {
                        prevState.education[index].degree = val;
                      })}
                    />
                    <TextInput
                      id={`institute-${index}`}
                      placeholder="Institute/School"
                      value={edu.institute}
                      onChange={mutableChangeHandler((prevState, val) => {
                        prevState.education[index].institute = val;
                      })}
                    />
                    <TextInput
                      id={`cgpa-${index}`}
                      placeholder="CPI/%"
                      value={edu.cgpa}
                      onChange={mutableChangeHandler((prevState, val) => {
                        prevState.education[index].cgpa = val;
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className=" hover:text-red-500 px-2"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        education: prevState.education.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                    title="Remove Entry"
                    aria-label="Remove Entry"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* end: scroll */}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            downloadPdf();
          }}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </form>
    </div>
  );
}
