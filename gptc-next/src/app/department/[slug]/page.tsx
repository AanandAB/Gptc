"use client";
import { useParams } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import DepartmentPage from "@/components/DepartmentPage";

export default function Page() {
  const params = useParams();
  return <PublicLayout><DepartmentPage slug={params.slug as string} /></PublicLayout>;
}
