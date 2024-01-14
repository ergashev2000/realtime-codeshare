import { useState } from "react";

export default function ConsolePanel({ consoleCode }) {
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  const executeCode = () => {
    try {
      const codeResult = eval(consoleCode);
      setResult(String(codeResult));
      setError("");
    } catch (error) {
      setError(error.message || "An error occurred");
      setResult("");
    }
  };

  return (
    <div className="w-1/3 max-h-full p-2">
      <button
        onClick={executeCode}
        className="h-7 px-3 rounded text-sm bg-green-600 active:bg-green-400 hover:bg-green-500 transition-all duration-300"
      >
        Run
      </button>
      <div className="pt-5">
        {error && <div className="text-red-600">Error: {error}</div>}
        {!error && <div>Output: {result}</div>}
      </div>
    </div>
  );
}
