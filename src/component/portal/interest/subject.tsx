import React, { useState } from "react";
import SubjectCategory from "./SubjectCategory";
import { Button } from "antd";
import { RedoOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Subjects: React.FC = () => {
  const [resetCount, setResetCount] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleResetAll = () => {
    setResetCount((prevCount) => prevCount + 1);
    setSelectedSubjects([]);
  };

  const handleSendToBackend = () => {
    console.log(selectedSubjects);
  };

  return (
    <>
      <SubjectCategory
        key={`Math-${resetCount}`}
        category="Math"
        icon="fa-solid fa-calculator"
        subjects={["Algebra", "Geometry", "Trigonometry"]}
        reset={resetCount}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
      <SubjectCategory
        key={`Science-${resetCount}`}
        category="Science"
        icon="fa-solid fa-microscope"
        subjects={["Physics", "Chemistry", "Biology", "Psychology"]}
        reset={resetCount}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
      <SubjectCategory
        key={`Coding-${resetCount}`}
        category="Coding & Programming"
        icon="fa-solid fa-code"
        subjects={[
          "JavaScript",
          "Java",
          "HTML",
          "CSS",
          "Python",
          "C",
          "C++",
          "Go",
          "DSA",
          "Mongo",
          "SQL",
        ]}
        reset={resetCount}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
      <SubjectCategory
        key={`Language-${resetCount}`}
        category="Language"
        icon="fa-solid fa-language"
        subjects={["English", "Hindi"]}
        reset={resetCount}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
      <Button
        onClick={handleResetAll}
        danger
        type="dashed"
        icon={<RedoOutlined />}
        shape="round"
      >
        Reset
      </Button>
      <Button
        onClick={handleSendToBackend}
        shape="round"
        type="dashed"
        icon={<ArrowRightOutlined />}
        style={{ marginLeft: "10px", width: '150px' }}
      >
        Next
      </Button>
    </>
  );
};

export default Subjects;
