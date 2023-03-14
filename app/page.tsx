"use client";
import { useState } from "react";
export default function Home() {
  const [input, setInput] = useState("");
  const [qrImage, setQrImage] = useState("");

  const onInputChange = (s: string) => {
    setInput(s);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://api.qrserver.com/v1/create-qr-code/?size=900x900&data=${input}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setQrImage(url);
      });
  };


  return (
    <>
      <header className="flex items-center justify-between flex-wrap p-6 bg-transparent">
        <h1 className="text-2xl font-bold p-1">qr.azxyc.link</h1>
        <h1 className="font-extralight text-2xl p-1">
          lightweight QR code generator
        </h1>
      </header>
      <div className="flex flex-col gap-2 justify-center items-center mt-6">
        <form
          className="flex w-screen justify-center items-center"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            className="glass p-2 lg:w-2/3 font-mono mx:6 w-[85%] md:w-[75%] max-h-100 overflow-y-auto"
            placeholder="Data to encode"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
          ></input>
        </form>

        <button
          onClick={(e) => onSubmit(e)}
          className="font-mono text-left border glass p-2 rounded-lg text-white hover:text-black hover:bg-white lg:w-2/3 mx:6 w-[85%] md:w-[75%]"
        >
          Submit
        </button>

        <div className="glass p-2  flex justify-center lg:mt-16 md:mt-16 mt:12 h-[200px] w-[200px]">
          <img src = {qrImage}></img>
          
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
