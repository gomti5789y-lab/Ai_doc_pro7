import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const token = localStorage.getItem("token");

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("http://localhost:5000/api/doc/upload", form, {
      headers: { Authorization: token }
    });

    setText(res.data.text);
  };

  const summarize = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/doc/summary",
      { text },
      { headers: { Authorization: token } }
    );

    setSummary(res.data.summary);
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h2>AI Doc Pro</h2>

      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={upload}>Upload</button>

      <textarea value={text} onChange={(e)=>setText(e.target.value)} />

      <button onClick={summarize}>Summary</button>
      <button onClick={speak}>Voice</button>

      <h3>{summary}</h3>
    </div>
  );
}

export default App;
