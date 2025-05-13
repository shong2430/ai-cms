import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminPageClient from "./AdminPageClient";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const author = session.user?.name ?? "unknown";
  return <AdminPageClient author={author} />;
}
