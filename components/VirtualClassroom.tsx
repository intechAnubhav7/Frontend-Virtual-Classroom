import React, { useState } from "react";
import { api } from "@/lib/api";
// ...other imports

export default function VirtualClassroom(props) {
  // ...other state
  const [classInfo, setClassInfo] = useState<{ id: string; code: string; title: string } | null>(null);

  // ...other logic

  const handleJoinClass = async () => {
    const code = (document.getElementById("class-code") as HTMLInputElement)?.value?.trim().toUpperCase();
    if (!code) return;
    try {
      const cls = await api.classes.byCode(code);
      setClassInfo({ id: cls.id, code: cls.code, title: cls.title });
    } catch {}
  };

  // ...other logic

  return (
    <div>
      {/* ...other JSX */}
      <button onClick={handleJoinClass}>Join Class</button>

      {(activeTab === "questions" || showQuestions) && (
        <QuestionAnswerInterface
          classId={classInfo?.id}
          onBack={() => {
            setShowQuestions(false);
            setActiveTab("classroom");
          }}
        />
      )}
      {/* ...other JSX */}
    </div>
  );
}