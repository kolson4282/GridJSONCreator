import { useRef, useState } from "react";

type Field = {
  name: string;
  title: string;
  width: number;
  showGridSummary: boolean;
  showGroupSummary: boolean;
  hidden: boolean;
};
type DSField = {
  name: string;
  type: "text" | "date" | "integer" | "float" | "boolean";
};

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [width, setWidth] = useState(100);
  const [hidden, setHidden] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [type, setType] = useState<DSField["type"]>("text");
  const [fields, setFields] = useState<Field[]>([]);
  const [dsFields, setDSFields] = useState<DSField[]>([]);

  const focusRef = useRef<HTMLInputElement>(null);

  const onJSON = () => {
    console.log("Fields: ", JSON.stringify(fields));
    console.log("DSFields: ", JSON.stringify(dsFields));
  };

  const onRemove = (fieldName: string) => {
    setFields((prev) => prev.filter((f) => f.name !== fieldName));
    setDSFields((prev) => prev.filter((f) => f.name !== fieldName));
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    focusRef?.current?.focus();
    setFields((prev) =>
      [
        ...prev,
        {
          name,
          title,
          width,
          hidden,
          showGridSummary: false,
          showGroupSummary: false,
        },
      ].sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))
    );
    setDSFields((prev) =>
      [
        ...prev,
        {
          name,
          type,
        },
      ].sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))
    );
    setName("");
    setTitle("");
  };

  return (
    <div className="App">
      <button onClick={onJSON}>Create JSON</button>
      <form>
        <label>Name: </label>
        <input
          ref={focusRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <label>Width: </label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.currentTarget.value))}
        />
        <label>Show Summary: </label>
        <input
          type="checkbox"
          checked={showSummary}
          onChange={(e) => setShowSummary(e.currentTarget.checked)}
        />
        <label>Hidden: </label>
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => setHidden(e.currentTarget.checked)}
        />
        <label>Type: </label>
        <select
          value={type}
          onChange={(e) => setType(e.currentTarget.value as DSField["type"])}
        >
          <option value="text">text</option>
          <option value="date">date</option>
          <option value="integer">integer</option>
          <option value="float">float</option>
          <option value="boolean">boolean</option>
        </select>
        <button type="submit" onClick={onSubmit}>
          Add
        </button>
      </form>
      <div>
        FIELDS
        <ul>
          {fields.map((f) => (
            <li key={f.name}>
              {f.name} - {f.title} - {f.width} - {f.hidden}
              <button onClick={() => onRemove(f.name)}>Remove</button>
            </li>
          ))}
        </ul>
        DS FIELDS
        <ul>
          {dsFields.map((f) => (
            <li key={f.name}>
              {f.name} - {f.type}
              <button onClick={() => onRemove(f.name)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
