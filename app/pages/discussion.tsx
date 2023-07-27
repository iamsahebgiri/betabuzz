import MainLayout from "@/layouts/main.layout";
import React from "react";

export default function DiscussionPage() {
  return (
    <MainLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto w-full max-w-3xl space-y-8 lg:space-y-10">
          <div>
            <h2 className="text-2xl font-bold">Discussions</h2>
            <p className="text-base text-muted-foreground font-medium">Ask questions, find support, and connect with the community.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
