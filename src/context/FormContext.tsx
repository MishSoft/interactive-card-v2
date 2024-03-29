import React, { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import CardData from "../Data/CardData.json";
import { saveAs } from "file-saver";
import { toBlob } from "html-to-image";
import JSZip from "jszip";

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
  handleDownload: MouseEventHandler<HTMLButtonElement>;
  cardRef: React.RefObject<HTMLDivElement> | null;
  backRef: React.RefObject<HTMLDivElement> | null;
  frontRef: React.RefObject<HTMLDivElement> | null;
  readyForDownload: boolean | null;
  setReadyForDownload: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleDownload: () => {},
  cardRef: null,
  backRef: null,
  frontRef: null,
  readyForDownload: false,
  setReadyForDownload: () => {},
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
  const [readyForDownload, setReadyForDownload] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    console.log(cardRef);
    if (!cardRef.current) {
      console.error("cardRef.current is null.");
      return;
    }
    setReadyForDownload(true);
    const zip = new JSZip();
    const frontImageName = "front.png";
    const backImageName = "back.png";

    const frontElement = cardRef.current.querySelector(
      ".front"
    ) as HTMLElement | null;
    const backElement = cardRef.current.querySelector(
      ".back"
    ) as HTMLElement | null;

    if (!frontElement || !backElement) {
      console.error("Front or back element not found.");
      return;
    }

    const [frontBlob, backBlob] = await Promise.all([
      toBlob(frontElement),
      toBlob(backElement),
    ]);

    if (!frontBlob || !backBlob) {
      console.error("Failed to generate image blobs.");
      return;
    }

    zip.file(frontImageName, frontBlob);
    zip.file(backImageName, backBlob);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "card_images.rar");
  };

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === "",
    }));

    setInputData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  useEffect(() => {
    setIsConfirm(
      !Object.values(errors).some((error) => error) &&
        Object.values(inputData).every((value) => value !== "")
    );
  }, [errors, inputData]);

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
        handleDownload,
        cardRef,
        frontRef,
        backRef,
        readyForDownload,
        setReadyForDownload,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
