"use client"; 

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPage from "@/components/BlogPage";

export default function BlogPageWrapper() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage />
    </QueryClientProvider>
  );
}