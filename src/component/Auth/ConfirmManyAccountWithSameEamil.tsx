import { Button } from "antd";
import { FC } from "react";

interface ConfirmationNotificationProps {
  onYes: () => void;
  onNo: () => void;
  api: any;
}

const ConfirmManyAccountWithSameEamil: FC<ConfirmationNotificationProps> = ({
  onYes,
  onNo,
  api,
}) => {
  const handleYes = () => {
    onYes();

  };

  const handleNo = () => {
    onNo();
  };

  return api.open({
    message: "Notification Title",
    description:
      "An account with this email exists. Do you want to create another without deleting the existing one?",
    duration: 0,
    btn: (
      <div>
        <Button type="primary" onClick={handleYes}>
          Yes
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={handleNo}>
          No
        </Button>
      </div>
    ),
  });
};

export default ConfirmManyAccountWithSameEamil;
