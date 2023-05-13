import Link from "next/link"

import { Icons } from "@/components/icons"

const Item = () => (
  <div className="flex justify-between">
    <div className="mr-2 flex flex-1 items-start gap-3">
      <img
        src="https://ph-files.imgix.net/5f79504d-e241-4218-9249-1d7f8c084a6a.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=80&h=80&fit=crop&bg=0fff&dpr=1"
        alt=""
        className="h-12 w-12 rounded-lg"
      />
      <div>
        <Link href="/" className="text-base font-bold">
          Video Depth Effect prototype in SwiftUI{" "}
          <span className="font-medium">(twitter.com)</span>
        </Link>
        <div className="text-muted-foreground font-medium">
          2 points by raul_dronca · 25d ago · 0 comments
        </div>
      </div>
    </div>
    <button className="border-border flex h-12 w-12 flex-col items-center justify-center rounded-lg border">
      <Icons.arrowUp className="text-primary h-6 w-6" />
      <span className="-mt-1 text-sm font-bold">
        {Math.floor(Math.random() * 100)}
      </span>
    </button>
  </div>
)

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto w-full max-w-2xl space-y-8 lg:space-y-10">
        {new Array(10).fill(0).map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </section>
  )
}
