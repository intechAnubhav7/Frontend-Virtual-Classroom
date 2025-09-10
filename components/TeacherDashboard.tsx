import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
// ...other imports

export default function TeacherDashboard(props) {
  // ...other state
  const [teacherClass, setTeacherClass] = useState<any>(null);

  // ...other logic

  const ensureClass = async () => {
    if (!teacherClass && classTitle) {
      const cls = await api.classes.create({ title: classTitle });
      setTeacherClass(cls);
    }
  };

  useEffect(() => { ensureClass().catch(() => {}); }, [classTitle]);

  const classCode = teacherClass?.code || "------";

  return (
    <div>
      {/* ...other JSX */}
      {activeTab === "questions" && <QuestionBankManager teacherClassId={teacherClass?.id} />}
    </div>
  );
}