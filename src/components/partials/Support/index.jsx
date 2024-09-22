import React, { useState, useEffect } from "react";
import { Input } from "antd";
import supportImage from "../../../assets/img/support_1.png";
import supportImage2 from "../../../assets/img/support_2.png"; // Importing second image

const Support = () => {
  // Temporary static array for common questions (you will replace this with fetch logic later)
  const [questions, setQuestions] = useState([
    "Cau hoi gi do ngan ngan",
    "Cau hoi gi do dai oi la dai dai qua troi qua dat",
    "Hok bik hoi gi",
  ]);

  // Later you can replace this useEffect with a fetch API call
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Image Section with Text Positioned on the Left, Slightly Higher */}
      <div className="relative w-full h-96">
        <img
          src={supportImage}
          alt="Support"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-start justify-start ml-10 mt-10">
          <h1 className="text-white text-8xl font-bold">Support</h1>
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-white p-6 w-11/12 max-w-4xl mt-10">
        <h2
          className="text-4xl font-semibold text-center mb-6"
          style={{ color: "#4949E9" }}
        >
          Common questions
        </h2>
        <div className="flex flex-col space-y-4">
          {questions.map((question, index) => (
            <button
              key={index}
              className="text-white py-2 px-4 rounded-lg text-left hover:bg-blue-600"
              style={{ backgroundColor: "#4949E9" }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 w-11/12 max-w-4xl text-center pb-2">
        <h2
          className="text-4xl font-semibold mb-6"
          style={{ color: "#4949E9" }}
        >
          Search for other topics
        </h2>
        <div className="pb-4">
          <Input.Search placeholder="Search for other topics..." size="large" />
        </div>
      </div>

      {/* Thicker Blue Line */}
      <div
        className="w-full mt-1 mb-2"
        style={{ borderTop: "20px solid #4949E9" }} 
      ></div>

      <div className="w-full bg-white">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-4xl font-bold" style={{ color: "#4949E9" }}>
            Get support
          </h2>
          <p
            className="text-center mt-4 px-8 max-w-2xl"
            style={{ color: "#4949E9" }}
          >
            Please provide some detailed information so we can provide the best
            solution for you. Connect via phone, chat, email, and more.
          </p>
          <button
            className="mt-6 bg-lime-400 hover:bg-lime-500 font-bold py-3 px-8 rounded-full text-2xl"
            style={{ color: "#4949E9" }} // Changed button text color to blue
          >
            Start now
          </button>
        </div>
        <div className="w-full">
          <img
            src={supportImage2}
            alt="Support"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
