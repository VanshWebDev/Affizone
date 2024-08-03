import React, { useEffect } from "react";
import { Button, Flex } from "antd";
import { PlusCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import styles from "../../../styles/portal/Math.module.css";

interface SubjectCategoryProps {
  category: string;
  subjects: string[];
  icon: string;
  reset: number; // Prop to trigger reset
  selectedSubjects: string[]; // Selected subjects from parent component
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>; // Function to update selected subjects in parent
}

const SubjectCategory: React.FC<SubjectCategoryProps> = ({
  category,
  subjects,
  icon,
  reset,
  selectedSubjects,
  setSelectedSubjects,
}) => {
  useEffect(() => {
    setSelectedSubjects([]);
  }, [reset]);

  const toggleSubject = (name: string) => {
    name = name.toLowerCase();
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((subject) => subject !== name);
      } else {
        return [...prevSelected, name];
      }
    });
  };

  const isSubjectSelected = (name: string) =>
    selectedSubjects.includes(name.toLowerCase());

  const getButtonStyle = (subject: string) => {
    if (isSubjectSelected(subject)) {
      return {
        background: `linear-gradient(135deg, #6253E1, #04BEFE)`,
        color: "#ffffff",
      };
    } else {
      return {};
    }
  };

  const getIconColor = (subject: string) => {
    return isSubjectSelected(subject) ? "#92fc81" : "#40afe4";
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <h2 className={styles.subMathHeading}>
          {category} <i className={icon}></i>
        </h2>
      </div>
      <div className={styles.mathbtn}>
        <Flex gap="small" wrap>
          {subjects.map((subject) => (
            <Button
              key={subject}
              style={getButtonStyle(subject)}
              onClick={() => toggleSubject(subject)}
            >
              {isSubjectSelected(subject) ? (
                <CheckCircleTwoTone twoToneColor={getIconColor(subject)} />
              ) : (
                <PlusCircleTwoTone twoToneColor={getIconColor(subject)} />
              )}
              {subject}
            </Button>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default SubjectCategory;
