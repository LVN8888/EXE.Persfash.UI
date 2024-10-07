import React, { useState, useEffect, useContext } from "react";
import { Button, Input, message } from "antd";
import supportImage from "../../../assets/img/support_1.png";
import supportImage2 from "../../../assets/img/support_2.png"; // Importing second image
import { createSupportQuestion, RemoveSupportQuestion, viewSupportQuestion } from "../../../services/SupportQuestionApi";
import Modal from 'antd/lib/modal';
import { FaEnvelope } from 'react-icons/fa';
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthContext";

const Support = () => {
  // Temporary static array for common questions (you will replace this with fetch logic later)
  const [questions, setQuestions] = useState([
    "Cau hoi gi do ngan ngan",
    "Cau hoi gi do dai oi la dai dai qua troi qua dat",
    "Hok bik hoi gi",
  ]);

  const [question, setQuestion] = useState('');

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [supportedQuestion, setSupportedQuestion] = useState([])

  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 3;

  const {user} = useContext(AuthContext);

  // Later you can replace this useEffect with a fetch API call
  
  const fetchSupportQuestion = async () => {
    try {
      const response = await viewSupportQuestion(1, 20, null);

      console.log(response.data);
      
      setSupportedQuestion(response.data);
    
    }catch(error) {
      console.log("Failed to fetch support question", error);
    }
  }

  useEffect(() => {
    fetchSupportQuestion()
    // console.log(supportedQuestion);
    
  }, []);

  const handleShowMessages = (messages) => {
    setCurrentMessages(messages);
    setVisibleModal(true);
  };

  const handleShowCreateQuestionForm = () => {
    setVisibleCreateModal(true);
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmitSupportQuestion = async () => {
    try {

      console.log(user);
      
      const response = await createSupportQuestion(question);

      console.log(response);

      fetchSupportQuestion();
      
      message.success({
        content: "Submit support question successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });
    }catch(error) {
      console.log("Failed to submit support question", error);
      message.error({
        content: error.response.data.message,
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });
    }
  }

  const handleRemoveSupportQuestion = async (supportId) => {
    try {
      const response = await RemoveSupportQuestion(supportId);
      console.log(response);

      fetchSupportQuestion();

      message.success({
        content: "Remove support question successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });
    }catch(error) {
      console.log("Failed to remove support question", error);
      message.error({
        content: error.response.data.message,
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });
    }
  }

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = supportedQuestion ? supportedQuestion.slice(startIndex, startIndex + questionsPerPage) : [];
  // Calculate total pages
  const totalPages = Math.ceil((supportedQuestion ? supportedQuestion.length : 0) / questionsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start dark:bg-[#4949e9]">
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
      <div className="bg-white p-6 w-11/12 max-w-4xl mt-10 dark:bg-[#4949e9] rounded-lg">
        <h2 className="text-4xl font-semibold text-center mb-6 text-[#4949e9] dark:text-white">
          Common questions
        </h2>
        <div className="flex flex-col space-y-4">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question, index) => (
              <div key={index}>
          <button
            className="text-white py-2 px-4 rounded-lg text-left hover:bg-[#4949e9] w-full flex items-center justify-between bg-[#4949e9] dark:bg-white dark:text-[#4949e9]"
            // style={{ backgroundColor: "#4949E9" }}
          >
            <span className="flex-grow">{question.question}</span>
            <div className="flex items-center">
              {question.supportMessages.length > 0 && (
                <div className="cursor-pointer" onClick={() => handleShowMessages(question.supportMessages)}>
                  <FaEnvelope className="text-[#b3ff00] mx-1" size={24} />
                </div>
              )}
              {question.customer.customerId === user.userId && (
                // Button to delete the support message of the user
                <div className="cursor-pointer" onClick={() => handleRemoveSupportQuestion(question.supportId)}>
                  <FaTrashCan className="text-[#b3ff00] mx-1" size={24} />
                </div>
              )}
            </div>
          </button>
        </div>
            ))
          ) : (
            questions.map((question, index) => (
              <div key={index} className="">
                <button
                  className="text-white py-2 px-4 rounded-lg text-left hover:bg-[#4949e9] w-full flex items-center justify-between"
                  style={{ backgroundColor: "#4949E9" }}
                >
                  {question}
                
                </button>
                
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          {currentPage > 0 && (
            <button
              className="bg-[#b3ff00] text-[#4949e9] py-2 px-4 rounded-full"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              className="bg-[#b3ff00] text-[#4949e9] py-2 px-4 rounded-full"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <Modal
        centered
        title="Support Messages"
        open={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
      >
        <div>
          {currentMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p><strong>{msg.admin.username}</strong>: {msg.messageText}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
  centered
  title="Create Support Question"
  open={visibleCreateModal}
  onCancel={() => setVisibleCreateModal(false)}
  footer={null}
  className="font-medium text-[#4949e9] font-avantgarde"
>
  <div>
    <Input.TextArea
      rows={4}
      placeholder="Type your support question here..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)} // Update state on input change
      className="mb-4"
    />
    <Button
    style={{ backgroundColor: "#b3ff00", color: "#4949e9" }}
    className="bg-[#b3ff00] text-[#4949e9] py-2 px-4 rounded-full font-medium"
    disabled={!question.trim()}
      onClick={() => {
        // Handle the submit action, e.g., sending the question to your API
        console.log('Submitted Question:', question);
        handleSubmitSupportQuestion();
        
        // You may want to reset the input after submission
        setQuestion('');
        setVisibleCreateModal(false); // Close the modal after submission
      }}
    >
      Submit Question
    </Button>
  </div>
</Modal>

      <div className="mt-6 w-11/12 max-w-4xl text-center pb-2">
        {/* <h2 className="text-4xl font-semibold mb-6" style={{ color: "#4949E9" }}>
          Search for other topics
        </h2> */}
        {/* <div className="pb-4">
          <Input.Search placeholder="Search for other topics..." size="large" />
        </div> */}
      </div>

      {/* Thicker Blue Line */}
      <div className="w-full mt-1 mb-2 border-t-[20px] border-[#4949e9] dark:border-white"></div>

      <div className="w-full bg-white dark:bg-[#4949e9]">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-4xl font-bold text-[#4949e9] dark:text-white">
            Get support
          </h2>
          <p className="text-center mt-4 px-8 max-w-2xl text-[#4949e9] dark:text-white">
            Please provide some detailed information so we can provide the best
            solution for you. Connect via phone, chat, email, and more.
          </p>
          <button
            className="mt-6 bg-lime-400 hover:bg-lime-500 font-bold py-3 px-8 rounded-full text-2xl"
            style={{ color: "#4949E9" }} // Changed button text color to blue
            onClick={() => handleShowCreateQuestionForm()}
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
