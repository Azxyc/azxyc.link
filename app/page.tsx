"use client";
import { useState } from "react";
export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Waiting for input...");

  const onInputChange = (s: string) => {
    setInput(s);
  };

  const onSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    setOutput("Loading...");
    fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: input,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.shortenedURL);
      });
  };

  return (
    <>
      <header className="flex items-center justify-between flex-wrap p-6 bg-transparent">
        <h1 className="text-2xl font-bold p-1">azxyc.link</h1>
        <h1 className="font-extralight text-2xl p-1">
          lightweight URL shortener.
        </h1>
      </header>
      <div className="flex flex-col gap-2 justify-center items-center mt-32">
        <form
          className="flex w-screen justify-center items-center"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            className="glass p-2 lg:w-2/3 font-mono mx:6 w-[85%] md:w-[75%] max-h-100 overflow-y-auto"
            placeholder="URL to shorten"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
          ></input>
        </form>

        <button
          onClick={(e) => onSubmit(e)}
          className="text-left border glass p-2 rounded-lg text-white hover:text-black hover:bg-white lg:w-2/3 mx:6 w-[85%] md:w-[75%]"
        >
          Submit
        </button>

        <div className="glass p-2 lg:w-2/3 font-mono mx:6 w-[85%] md:w-[75%] max-h-100 overflow-y-auto">
          {output}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 p-4 w-full footer text-white text-center">
        © {new Date().getFullYear()}{" "}
        <a className="hover-underline text-white" href="https://azxyc.xyz">
          azxyc{" "}
        </a>
      </footer>
    </>
  );
}
