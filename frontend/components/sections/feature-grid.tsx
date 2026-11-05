import type { ReactNode } from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Feature = { title: string; body: ReactNode; icon?: ReactNode };

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((item) => (
        <li key={item.title}>
          <Card className="h-full">
            {item.icon ? (
              <div aria-hidden="true" className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                {item.icon}
              </div>
            ) : null}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription className="mt-2">{item.body}</CardDescription>
          </Card>
        </li>
      ))}
    </ul>
  );
}
