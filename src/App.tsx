import CardSection from "./components/CardSection/CardSection";
import InputForm from "./components/InputFormSection/InputForm";
import { FormContext } from "./context/FormContext";
import { useContext } from "react";
import ResultPopUp from "./components/ResultPopUp/ResultPopUp";
function App() {
  const { showPopUp } = useContext(FormContext);
  return (
    <div className="container">
      <CardSection />
      <InputForm />
      {showPopUp && <ResultPopUp />}
    </div>
  );
}

export default App;
