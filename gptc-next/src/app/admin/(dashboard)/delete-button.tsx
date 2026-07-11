"use client";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id, action }: { id: string; action: (id: string) => Promise<void> }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (confirm("Delete this item?")) { await action(id); router.refresh(); }
      }}
      style={{ fontSize: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline", fontFamily: "inherit" }}
    >
      Delete
    </button>
  );
}
