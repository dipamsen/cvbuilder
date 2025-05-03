import { useCVContext } from "../contexts/CVContext";

export default function EditCV() {
  const { state, setState, template, setTemplate, compiler } = useCVContext();

  const changeHandler =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState((prevState) => ({ ...prevState, [name]: value }));
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
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const inputStyle =
    "mt-2 block w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-md sm:text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-md font-medium text-gray-300";

  return (
    <div className="edit-cv-container bg-gray-800 p-8 shadow-lg rounded-lg md:w-1/2 flex flex-col">
      <h2 className="text-3xl font-semibold mb-6 shrink-0">Edit Your CV</h2>
      <form className="space-y-4 flex flex-col  overflow-hidden">
        <div className="overflow-y-auto h-full space-y-2 px-0.5 flex flex-col flex-1">
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
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={state.name}
              onChange={changeHandler("name")}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="tagline" className={labelStyle}>
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              required
              value={state.tagline}
              onChange={changeHandler("tagline")}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="department" className={labelStyle}>
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              required
              value={state.department}
              onChange={changeHandler("department")}
              className={inputStyle}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={state.email}
                onChange={changeHandler("email")}
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelStyle}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={state.phone}
                onChange={changeHandler("phone")}
                className={inputStyle}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="github" className={labelStyle}>
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="github"
                required
                value={state.githubUrl}
                onChange={changeHandler("githubUrl")}
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="github-username" className={labelStyle}>
                GitHub Username
              </label>
              <input
                type="text"
                id="github-username"
                name="github-username"
                required
                value={state.githubUsername}
                onChange={changeHandler("githubUsername")}
                className={inputStyle}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkedin" className={labelStyle}>
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                required
                value={state.linkedinUrl}
                onChange={changeHandler("linkedinUrl")}
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="linkedin-username" className={labelStyle}>
                LinkedIn Username
              </label>
              <input
                type="text"
                id="linkedin-username"
                name="linkedin-username"
                required
                value={state.linkedinUsername}
                onChange={changeHandler("linkedinUsername")}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

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
