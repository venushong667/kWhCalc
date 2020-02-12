import React from "react";
import SubmitForm from "./submitform";
import { DATAAPIV1 } from "../api/dataapi";

const DataForm = () => {
  const [state, setState] = React.useState({ energy: "" });

  const { energy } = state;

  const submitCalcKWH = (values, { setsubmitting }) => {
    const dataapiV1 = DATAAPIV1();
    dataapiV1
      .CalcKWH(values)
      .then(async response => {
        const energy = await response.data;
        setState({ ...state, energy: energy });
        return response;
      })
      .catch(err => console.log(err));
  };

  return <SubmitForm onSubmit={submitCalcKWH} energy={energy} />;
};

export default DataForm;
