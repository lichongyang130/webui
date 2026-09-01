import { notFound } from "next/navigation";
import ItemEditor from "../ItemEditor";
import { getItemById } from "@/lib/db";

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();
  return <ItemEditor existing={item} />;
}
