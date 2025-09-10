export async function uploadLesson(params: {
  classId: string; title: string; durationSec: number; timestamps: any;
  slidesMeta: Array<{ title: string; order: number }>; audio: File; slides?: File[];
}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const form = new FormData();
  form.set("classId", params.classId);
  form.set("title", params.title);
  form.set("durationSec", String(params.durationSec));
  form.set("timestamps", JSON.stringify(params.timestamps));
  form.set("slidesMeta", JSON.stringify(params.slidesMeta || []));
  form.append("audio", params.audio);
  (params.slides || []).forEach((f) => form.append("slides", f));

  const res = await fetch(`${base}/lessons/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) throw await res.json().catch(() => ({ error: res.statusText }));
  return res.json();
}