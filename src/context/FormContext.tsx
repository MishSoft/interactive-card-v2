import React, { ChangeEvent, useEffect, useState } from "react";
import CardData from "../Data/CardData.json";

interface FormContextProps {
  inputData: InitialStateProps;
  handleInputData: React.Dispatch<React.SetStateAction<InitialStateProps>>;
  caughgtData: object | null;
  choosedCard: string;
  setChoosedCard: (card: string | object) => void;
  selectedCard: string | null;
  setSelectedCard: (card: string | null) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  isFlipped: boolean;
  setIsFlipped: () => void;
  selectedCardBack: string | null;
  setSelectedCardBack: (item: string | null) => void;
  isConfirm: boolean;
  setIsConfirma: () => void;
  showPopUp: boolean;
  setShopPopUp: () => void;
}

interface InitialStateProps {
  cardname: string;
  cardnumber: string;
  mm: string;
  yy: string;
  cvc: string;
}

const InitialState: InitialStateProps = {
  cardname: "",
  cardnumber: "",
  mm: "",
  yy: "",
  cvc: "",
};

type ErrorsState = {
  cardname: boolean;
  cardnumber: boolean;
  mm: boolean;
  yy: boolean;
  cvc: boolean;
};

const getData = () => {
  return CardData;
};

const FormContext = React.createContext<FormContextProps>({
  inputData: InitialState,
  handleInputData: () => {},
  caughgtData: null,
  choosedCard: "",
  setChoosedCard: () => {},
  selectedCard: null,
  setSelectedCard: () => {},
  selectedColor: null,
  setSelectedColor: () => {},
  isFlipped: false,
  setIsFlipped: () => {},
  selectedCardBack: null,
  setSelectedCardBack: () => {},
  isConfirm: true,
  setIsConfirma: () => {},
  showPopUp: false,
  setShopPopUp: () => {},
});

const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inputData, setInputData] = useState<InitialStateProps>(InitialState);
  const [caughtData, setCaughtData] = useState<object | null>(null);
  const [choosedCard, setChoosedCard] = useState<string>("BitCamp");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCardBack, setSelectedCardBack] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsState>({
    cardname: false,
    cardnumber: false,
    mm: false,
    yy: false,
    cvc: false,
  });
  const [isConfirm, setIsConfirm] = useState<boolean>(true);
  const [showPopUp, setShopPopUp] = useState<boolean>(false);

  useEffect(() => {
    const data = getData();
    setCaughtData(data);
  }, []);

  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "cardnumber") {
      const cardNumberDigits = value.replace(/\D/g, "");
      const groups = cardNumberDigits.match(/.{1,4}/g);
      formattedValue = groups ? groups.join(" ") : "";
    }

    if (name === "cardname") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardname: /\d/.test(value),
      }));
    }

    if (name === "mm") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mm: Number(value) > 12 || Number(value) === 0,
      }));
    }

    const isAllFilled =
      inputData.cardname !== "" &&
      inputData.cardnumber !== "" &&
      inputData.mm !== "" &&
      inputData.yy !== "" &&
      inputData.cvc !== "";

    if (!isAllFilled) {
      setIsConfirm(true);
    } else {
      setIsConfirm(false);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInputData((prevData: any) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };
  return (
    <FormContext.Provider
      value={{
        inputData,
        handleInputData,
        caughtData,
        choosedCard,
        setChoosedCard,
        selectedCard,
        setSelectedCard,
        selectedColor,
        setSelectedColor,
        isFlipped,
        setIsFlipped,
        setSelectedCardBack,
        selectedCardBack,
        errors,
        isConfirm,
        setIsConfirm,
        showPopUp,
        setShopPopUp,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
export { FormContext, FormProvider };
