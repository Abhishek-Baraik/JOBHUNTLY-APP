import React from "react";

const ResumeModel = ({ imageUrl, onClose }) => {
  return (
    <div>
      <div className="resume-modal absolute md:left-[30%] md:bottom-[40%] bottom-[48%] w-[80%] md:w-[50%] left-[10%]" >
        <div className="modal-content">
          <span className="close absolute md:-top-16 md:right-[35%] right-0 -top-14 cursor-pointer" onClick={onClose}>
          <img src="/cross.svg" alt="" width={50}/>
          </span>
          <img src={imageUrl} alt="resume"/>
        </div>
      </div>
    </div>
  );
};

export default ResumeModel;
