import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`#include <graphics.h>

int main() {
    line(100,100,300,300);
    return 0;
}`);

  const [output, setOutput] = useState("Cheater's Turbo Ready...");

  const runCode = async () => {
    setOutput("Running...");

    const payload = {
      code: code
    };

    try {
      const resp = await axios.post("http://localhost:5000/run", payload);
      setOutput(resp.data.output);
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      setOutput("ERROR AA GYA 😭");
    }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-white flex flex-col">

      {/* Topbar */}
      <div className="h-14 border-b border-gray-700 flex items-center justify-between px-4">

        <h1 className="text-xl font-bold text-cyan-400">
          CHEATER's Turbo C
        </h1>

        <button
          onClick={runCode}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
        >
          Run
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editor */}
        <Editor
          height="100%"
          width="70%"
          defaultLanguage="c"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
          }}
        />

        {/* Output Panel */}
        <div className="w-[30%] bg-black p-4 overflow-auto">

          <h2 className="text-cyan-400 font-bold mb-3">
            OUTPUT
          </h2>

          <pre className="text-sm text-green-300 whitespace-pre-wrap">
            {output}
          </pre>

        </div>
      </div>
    </div>
  );
}

export default App;