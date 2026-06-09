import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function getPages(cur: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (cur >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", cur - 1, cur, cur + 1, "…", total];
}

interface PaginatorProps {
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export function Paginator({ totalPages = 8, initialPage = 1, onPageChange }: PaginatorProps) {
  const [current, setCurrent] = useState(initialPage);

  const goTo = (page: number) => {
    setCurrent(page);
    onPageChange?.(page);
  };

  const move = (dir: number) => {
    const next = Math.max(1, Math.min(totalPages, current + dir));
    goTo(next);
  };

  return (
    <Pagination>
      <PaginationContent>

        {/* Flecha izquierda */}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => move(-1)}
            disabled={current === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {/* Línea izquierda */}
        <div className="w-8 h-px bg-border" />

        {/* Números */}
        {getPages(current, totalPages).map((page, i) =>
          page === "…" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === current}
                onClick={() => goTo(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Línea derecha */}
        <div className="w-8 h-px bg-border" />

        {/* Flecha derecha */}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => move(1)}
            disabled={current === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}