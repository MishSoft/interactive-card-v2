// import React from 'react'
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";

function InputForm() {
  // const context = useContext(FormContext);

  const { inputData, handleInputData, setIsFlipped } = useContext(FormContext);

  return (
    <form id="inputs-form">
      <div className="name-input-container">
        <div className="name-input">
          <label htmlFor="">cardholder name</label>
          <input
            onChange={handleInputData}
            value={inputData.cardname}
            name="cardname"
            type="text"
            placeholder="e.g Jane Appleseed"
          />
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>

      <div className="number-input-container">
        <div className="number-input">
          <label htmlFor="">cardholder number</label>
          <input
            onChange={handleInputData}
            value={inputData.cardnumber}
            maxLength={19}
            type="text"
            name="cardnumber"
            placeholder="e.g 1234 5678 9000"
          />
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>

      <div className="detail-inputs-container">
        <div className="date-input-container">
          <label htmlFor="">exp. date(mm/yy)</label>
          <div className="date-inputs">
            <input
              onChange={handleInputData}
              value={inputData.mm}
              type="text"
              name="mm"
              placeholder="MM"
              maxLength={2}
            />
            <input
              onChange={handleInputData}
              value={inputData.yy}
              type="text"
              name="yy"
              placeholder="YY"
              maxLength={2}
            />
          </div>
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
        <div className="cvc-input container">
          <div className="cvc-input">
            <label htmlFor="">cvc</label>
            <input
              onChange={handleInputData}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              value={inputData.cvc}
              type="text"
              name="cvc"
              placeholder="e.g 123"
              maxLength={3}
            />
          </div>
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>
      <button disabled className="defaultbtn" type="submit">
        Confirm
      </button>
    </form>
  );
}

export default InputForm;
