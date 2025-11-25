import { useCVContext } from "../contexts/CVContext";
import { CVData, defaultData } from "../models/template";
import TextInput, { Label, TextArea } from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useState } from "react";

export default function EditCV() {
  const { state, setState, template, setTemplate, compiler } = useCVContext();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const changeHandler =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };

  const mutableChangeHandler =
    (mut: (prevState: CVData, val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setState((prevState) => {
        const newState = structuredClone(prevState);
        mut(newState, value);
        return newState;
      });
    };

  const downloadPdf = async () => {
    const res = await compiler?.compile({
      format: "pdf",
      mainFilePath: "/main.typ",
    });
    if (res && res.result) {
      const uint8 = new Uint8Array(res.result);
      const blob = new Blob([uint8.buffer.slice(0)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const id = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
      a.download = `resume_${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const labelStyle = "block text-md font-medium text-gray-300";

  return (
    <>
      <div className="edit-cv-container bg-gray-800 p-6 shadow-lg rounded-lg md:w-1/2 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold mb-6 shrink-0">Edit Your CV</h2>
          <div className="flex gap-5">
            <button
              type="button"
              className="hover:text-blue-500"
              title="Preferences"
              aria-label="Preferences"
              onClick={() => setSettingsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faGear} />
            </button>
          </div>
        </div>
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
                id="iitk"
                checked={template === "iitk"}
                onChange={(e) => setTemplate(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="iitk" className="mr-4">
                IITK
              </label>
              <input
                type="radio"
                name="template"
                value="iitkgp"
                id="iitkgp"
                checked={template === "iitkgp"}
                onChange={(e) => setTemplate(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="iitkgp" className="mr-4">
                IITKGP
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
            <section key="education">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-300">
                  Education
                </h3>
                <div className="flex gap-5">
                  {/* <button
                  type="button"
                  className="hover:text-blue-500"
                  title="Edit Title"
                  aria-label="Edit Title"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button> */}
                  <button
                    type="button"
                    className="hover:text-blue-500"
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
            <section key="achievements">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Achievements
              </h3>
              <TextArea
                id="achievements"
                placeholder="Achievements"
                value={state.achievements}
                onChange={mutableChangeHandler((prevState, val) => {
                  prevState.achievements = val;
                })}
                className="mb-6"
              />
            </section>
            <section key="projects">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-300">
                  Projects
                </h3>
                <div>
                  <button
                    type="button"
                    className="hover:text-blue-500"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        projects: [
                          ...prevState.projects,
                          {
                            title: "",
                            url: "",
                            attr: "",
                            to: "",
                            from: "",
                            description: "",
                          },
                        ],
                      }));
                    }}
                    title="Add Entry"
                    aria-label="Add Entry"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  </button>
                </div>
              </div>
              {state.projects.map((proj, index) => (
                <div key={index}>
                  <h4 className="text-md font-semibold text-gray-300 mb-2">
                    Project {index + 1}
                  </h4>
                  <div className="flex items-center">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 lg:mb-2 flex-1">
                      <TextInput
                        id={`name-${index}`}
                        placeholder="Project Name"
                        value={proj.title}
                        onChange={mutableChangeHandler((prevState, val) => {
                          prevState.projects[index].title = val;
                        })}
                      />
                      <TextInput
                        id={`url-${index}`}
                        placeholder="URL"
                        value={proj.url}
                        onChange={mutableChangeHandler((prevState, val) => {
                          prevState.projects[index].url = val;
                        })}
                      />
                      <TextInput
                        id={`attr-${index}`}
                        placeholder="Attribution"
                        value={proj.attr}
                        onChange={mutableChangeHandler((prevState, val) => {
                          prevState.projects[index].attr = val;
                        })}
                      />
                      <div className="flex gap-2">
                        <TextInput
                          id={`from-${index}`}
                          placeholder="From"
                          value={proj.from}
                          onChange={mutableChangeHandler((prevState, val) => {
                            prevState.projects[index].from = val;
                          })}
                        />
                        <TextInput
                          id={`to-${index}`}
                          placeholder="To"
                          value={proj.to}
                          onChange={mutableChangeHandler((prevState, val) => {
                            prevState.projects[index].to = val;
                          })}
                        />
                      </div>
                      <TextArea
                        id={`description-${index}`}
                        placeholder="Description"
                        value={proj.description}
                        onChange={mutableChangeHandler((prevState, val) => {
                          prevState.projects[index].description = val;
                        })}
                        className="col-span-4"
                      />
                    </div>
                    <button
                      type="button"
                      className=" hover:text-red-500 px-2"
                      onClick={() => {
                        setState((prevState) => ({
                          ...prevState,
                          projects: prevState.projects.filter(
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
                </div>
              ))}
            </section>
            <section key="skills">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Skills
              </h3>
              <TextArea
                id="skills"
                placeholder="Skills"
                value={state.skills}
                onChange={mutableChangeHandler((prevState, val) => {
                  prevState.skills = val;
                })}
                className="mb-6"
              />
            </section>
            <section key="coursework">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Coursework
              </h3>

              <div className="flex gap-2 mb-6 lg:mb-2 flex-1">
                <TextArea
                  id="coursework-0"
                  placeholder="Coursework"
                  value={state.coursework[0]}
                  onChange={mutableChangeHandler((prevState, val) => {
                    prevState.coursework[0] = val;
                  })}
                  className="w-full"
                />
                <TextArea
                  id="coursework-1"
                  placeholder="Coursework"
                  value={state.coursework[1]}
                  onChange={mutableChangeHandler((prevState, val) => {
                    prevState.coursework[1] = val;
                  })}
                  className="w-full"
                />
                <TextArea
                  id="coursework-2"
                  placeholder="Coursework"
                  value={state.coursework[2]}
                  onChange={mutableChangeHandler((prevState, val) => {
                    prevState.coursework[2] = val;
                  })}
                  className="w-full"
                />
              </div>
            </section>
            <section key="por">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Positions of Responsibility
              </h3>
              <TextArea
                id="por"
                placeholder="Positions of Responsibility"
                value={state.por}
                onChange={mutableChangeHandler((prevState, val) => {
                  prevState.por = val;
                })}
                className="mb-6"
              />
            </section>
            <section key="extracurriculars">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Extracurricular Activities
              </h3>
              <TextArea
                id="extracurricular"
                placeholder="Extracurricular Activities"
                value={state.extracurriculars}
                onChange={mutableChangeHandler((prevState, val) => {
                  prevState.extracurriculars = val;
                })}
                className="mb-6"
              />
            </section>
          </div>
          {/* end: scroll */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                const cnf = confirm(
                  "Are you sure you want to reset the CV to placeholder data? This will remove all your data."
                );
                if (cnf) setState(defaultData);
              }}
              className="w-full bg-amber-700  hover:bg-amber-800 text-white py-2 px-4 rounded-md"
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                downloadPdf();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Download PDF
            </button>
          </div>
        </form>
      </div>
      {/* Settings Modal */}
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </>
  );
}

function SettingsModal({
  open,
  onClose}: {
  open: boolean;
  onClose: () => void;
}) {
  const {  settings, setSettings } = useCVContext();
  
    return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Preferences</h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Font Size</h3>
          <div className="flex gap-2">
            <select className="w-full" value={settings.fontSize} onChange={(e) => setSettings(s => ({...s, fontSize: parseInt(e.target.value)}))}>
              <option value={9}>9pt</option>
              <option value={10}>10pt</option>
              <option value={11}>11pt</option>
              <option value={12}>12pt</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
