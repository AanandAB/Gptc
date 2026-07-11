"use client";

import { useState, useCallback, useRef } from "react";
import { reorderSections } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { GripVertical } from "lucide-react";

type SectionItem = {
  id: string;
  slug: string;
  title: string;
  type: string;
  sortOrder: number;
};

export default function SectionReorder({ items }: { items: SectionItem[] }) {
  const router = useRouter();
  const [list, setList] = useState(items);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    dragItem.current = index;
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    dragOverItem.current = index;
  }, []);

  const handleDragEnd = useCallback(async () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const newList = [...list];
    const [moved] = newList.splice(from, 1);
    newList.splice(to, 0, moved);
    setList(newList);

    const fd = new FormData();
    fd.append("order", JSON.stringify(newList.map((i) => i.id)));
    await reorderSections(fd);
    router.refresh();

    dragItem.current = null;
    dragOverItem.current = null;
  }, [list, router]);

  if (list.length === 0) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <h3
        style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}
      >
        Drag to reorder
      </h3>
      <div
        style={{ borderRadius: "12px", border: "1px solid var(--border, #e2e8f0)", overflow: "hidden" }}
      >
        {list.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderBottom: index < list.length - 1 ? "1px solid var(--border, #e2e8f0)" : "none",
              cursor: "grab",
              color: "var(--text-primary)",
              transition: "background-color 0.15s",
            }}
          >
            <GripVertical size={16} style={{ color: "var(--text-secondary)" }} />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.title}</span>
            <span
              style={{ fontSize: "12px", marginLeft: "auto", color: "var(--text-secondary)" }}
            >
              {item.slug}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
