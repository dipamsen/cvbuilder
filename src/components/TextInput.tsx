export default function TextInput({
  id,
  label = undefined,
  placeholder = undefined,
  value = "",
  onChange = () => {},
  type = "text",
}: {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}) {
  if (!placeholder) {
    placeholder = label;
  }

  return (
    <div>
      {label && <Label id={id} label={label} />}
      <input
        type={type}
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-md sm:text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function Label({
  id = undefined,
  label,
}: {
  id?: string;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className="block text-md font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
  );
}

export function TextArea({
  id,
  label = undefined,
  placeholder = undefined,
  value = "",
  onChange = () => {},
  className = "",
}: {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}) {
  if (!placeholder) {
    placeholder = label;
  }

  return (
    <div className={className}>
      {label && <Label id={id} label={label} />}
      <textarea
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        className="block w-full resize-none font-mono border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-md sm:text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
