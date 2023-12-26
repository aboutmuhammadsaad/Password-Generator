"use client";
import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

export default function Home() {
  const [length, setLength]=useState("8");
  const [numberallowed, setNumberallowed]=useState(false);
  const [charallowed, setCharallowed]=useState(false);
  const [password, setPassword]=useState("");
  const passwordgenerator= useCallback(()=>{
  
    let pass:string="";
    let str:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz"
    if (numberallowed) str+="0123456789";
    if (charallowed) str+="~!@#$%^&*()";
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, numberallowed, charallowed, setPassword])

  const passwordRef:any=useRef(null);
  
  const copyPassword= useCallback(()=>{
    passwordRef.current?.select(); // to select the password
    passwordRef.current?.setSelectionRange(0,99);//use set how many characters to copy from the current selection
    navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{
    passwordgenerator();
  },[length, numberallowed, charallowed])

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg text-red-600 bg-gray-700 px-4 py-3 my-8">
        <h1 className='text-4xl text-center'>Password Genrator</h1>
        <div className="flex my-4 rounded-lg overflow-hidden">
          <input type="text"
          value={password}
          className="outline-none py-1 px-2 w-full"
          placeholder="Password"
          ref={passwordRef}
          readOnly         
          />
          <button className="bg-blue-700 py-1 px-2 text-white shrink-0 outline-none" onClick={copyPassword}>Copy</button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-x-2 items-center">
            <input 
            type="range" 
            min={8} 
            max={100} 
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberallowed}
            id="numInput"
            onChange={()=>{
              setNumberallowed((prev)=>!prev);
            }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charallowed}
            id="charInput"
            onChange={()=>{
              setCharallowed((prev)=>!prev);
            }}
            />
            <label htmlFor="charInput">Charaters</label>
          </div>
        </div>
      </div>

    </>
  )
}
