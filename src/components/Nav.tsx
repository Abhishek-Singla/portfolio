import { profile } from "@/data";
import ThemeToggle from "./ThemeToggle";
import ContentsMenu from "./ContentsMenu";
import { SearchButton } from "./CommandPalette";

const links: [string, string][] = [
  ["Impact", "/#impact"],
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["Writing", "/#writing"],
  ["Lab", "/lab"],
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5">
        <a href="/#top" className="serif text-lg font-semibold">{profile.name}</a>
        <nav aria-label="Primary" className="hidden gap-7 text-sm text-[var(--muted)] md:flex">
          {links.map(([l, href]) => (
            <a key={l} href={href} className="hover:text-[var(--ink)]">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SearchButton />
          <ContentsMenu />
          <ThemeToggle />
          <a href="/#contact" className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] hover:opacity-85">Let&apos;s talk</a>
        </div>
      </div>
    </header>
  );
}
