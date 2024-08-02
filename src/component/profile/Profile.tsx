import { useState } from "react";

function Profile() {
  const [num, setNum] = useState(0);
  const change = () => {
    setNum((preval) => preval + 1);
  };
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={change}>{num}</button>
    </div>
  );
}

export default Profile;