import React, { useState } from "react";
import { api } from "@/lib/api";
// ...other imports

export function QuestionBankManager({ teacherClassId }: { teacherClassId?: string }) {
  // ...other state
  const [newBank, setNewBank] = useState<any>({ topic: "", subject: "", questions: [] });
  const [questionBanks, setQuestionBanks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("banks");

  const toBackendDifficulty = (d: "easy"|"medium"|"hard") => d.toUpperCase() as "EASY"|"MEDIUM"|"HARD";
  const toBackendType = (t: "mcq"|"short"|"essay") => (t === "mcq" ? "MCQ" : t === "short" ? "SHORT" : "ESSAY");

  const createQuestionBank = async () => {
    if (!newBank.topic || !newBank.subject || !newBank.questions?.length || !teacherClassId) return;

    await api.banks.create({
      classId: teacherClassId,
      topic: newBank.topic,
      subject: newBank.subject,
      questions: (newBank.questions || []).map((q) => ({
        text: q.text,
        difficulty: toBackendDifficulty(q.difficulty),
        subtopic: q.subtopic,
        type: toBackendType(q.type),
        points: q.points,
        options: q.type === "mcq" ? q.options?.filter(Boolean) : undefined,
        correctAnswer: (q as any).correctAnswer,
      })),
    });

    setQuestionBanks((prev) => prev); // keep local list, or fetch api.banks.byClass if you want live data
    setNewBank({ topic: "", subject: "", questions: [] });
    setActiveTab("banks");
  };

  // ...other logic and JSX
  return (
    <div>
      {/* ...form and other UI */}
    </div>
  );
}