import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {/*navigate -1 means that you`ll come back to previous page in browserhistory. */}
      &larr; Back
    </Button>
  );
}
export default BackButton;
