"use client";

import { useRouter } from "next/navigation";

export default function DeleteBtn({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<void>;
}) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (confirm("Delete this item?")) {
          await action(id);
          router.refresh();
        }
      }}
      className="text-red-500 text-sm hover:underline"
    >
      Delete
    </button>
  );
}
