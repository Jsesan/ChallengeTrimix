import { INPUT_ERROR_MSG, INPUT_LABELS } from "@/constants";

export type ErrorInputProps = {
  label: string;
};
const ErrorInput: React.FC<ErrorInputProps> = (props) => {
  const { label } = props;
  const getErrorMsg = () => {
    switch (label) {
      case INPUT_LABELS.NAME:
        return INPUT_ERROR_MSG.NAME;
      case INPUT_LABELS.SURNAME:
        return INPUT_ERROR_MSG.SURNAME;
      case INPUT_LABELS.DOCTYPE:
        return INPUT_ERROR_MSG.DOCTYPE;
      case INPUT_LABELS.DOCNUMBER:
        return INPUT_ERROR_MSG.DOCNUMBER;
      case INPUT_LABELS.BIRTHDATE:
        return INPUT_ERROR_MSG.BIRTHDATE;
      default:
        return "Error";
    }
  };
  return <div className="text-xl text-red-600">{getErrorMsg()}</div>;
};

export default ErrorInput;
