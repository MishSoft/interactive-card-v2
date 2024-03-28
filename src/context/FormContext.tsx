import React, { ChangeEvent, useEffect, useState } from "react";
import CardData from "../Data/CardData.json";

interface FormContextProps {
  inputData: InitialStateProps;
  handleInputData: (e: ChangeEvent<HTMLInputElement>) => void;
  caughtData: CardDataItem[] | null;
  choosedCard: string;
  setChoosedCard: React.Dispatch<React.SetStateAction<string>>;
  selectedCard: CardDataItem | string | null;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<CardDataItem | string | null>
  >;
  selectedColor: string | null;
  setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCardBack: string | null;
  setSelectedCardBack: React.Dispatch<React.SetStateAction<string>>;
  isConfirm: boolean;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  showPopUp: boolean;
  setShopPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsState>>;
  errors: ErrorsState;
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

interface CardDataItem {
  name: string;
  frontImage: string;
  backImage: string;
}

const getData = () => {
  return CardData;
};

const FormContext = React.createContext<FormContextProps>({
  inputData: InitialState,
  handleInputData: () => {},
  caughtData: null,
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
  setIsConfirm: () => {},
  showPopUp: false,
  setShopPopUp: () => {},
  setErrors: () => {},
  errors: {
    cardname: false,
    cardnumber: false,
    mm: false,
    yy: false,
    cvc: false,
  },
});

const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inputData, setInputData] = useState<InitialStateProps>(InitialState);
  const [caughtData, setCaughtData] = useState<CardDataItem[] | null>(null);
  const [choosedCard, setChoosedCard] = useState<string>("BitCamp");
  const [selectedCard, setSelectedCard] = useState<
    CardDataItem | string | null
  >(null);
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
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
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

    if (name === "cardname" && value == "") {
      setErrors((prevError) => ({
        ...prevError,
        cardname: true,
      }));
    } else if (name === "cardname" && value !== "") {
      setErrors((prevError) => ({
        ...prevError,
        cardname: false,
      }));
    }

    if (name === "cardnumber" && value == "") {
      setErrors((prevError) => ({
        ...prevError,
        cardnumber: true,
      }));
    } else if (name === "cardnumber" && value !== "") {
      setErrors((prevError) => ({
        ...prevError,
        cardnumber: false,
      }));
    }

    if (name === "mm" && value == "") {
      setErrors((prevError) => ({
        ...prevError,
        mm: true,
      }));
    } else if (name === "mm" && value !== "") {
      setErrors((prevError) => ({
        ...prevError,
        mm: false,
      }));
    }

    if (name === "yy" && value == "") {
      setErrors((prevError) => ({
        ...prevError,
        yy: true,
      }));
    } else if (name === "yy" && value !== "") {
      setErrors((prevError) => ({
        ...prevError,
        yy: false,
      }));
    }

    if (name === "cvc" && value == "") {
      setErrors((prevError) => ({
        ...prevError,
        cvc: true,
      }));
    } else if (name === "cvc" && value !== "") {
      setErrors((prevError) => ({
        ...prevError,
        cvc: false,
      }));
    }

    if (
      Object.values(errors).includes(true) ||
      Object.values(inputData).every((value) => value !== "")
    ) {
      setIsConfirm(true);
      console.log(isConfirm);
    }

    setInputData((prevData) => ({
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
        selectedCardBack,
        setSelectedCardBack,
        errors,
        setErrors,
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
