"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Download } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRight, Button } from "@/components/ui/button";
import { LINKS } from "@/lib/links";

type RowBase = { label: string; value: string };
type Row =
  | (RowBase & { kind: "static"; icon: "flag" })
  | (RowBase & { kind: "copy"; copyText: string })
  | (RowBase & { kind: "download"; href: string })
  | (RowBase & { kind: "external"; href: string });

const rows: Row[] = [
  { kind: "static", icon: "flag", label: "Location", value: "Vancouver" },
  {
    kind: "copy",
    label: "Email",
    value: LINKS.email,
    copyText: LINKS.email,
  },
  {
    kind: "copy",
    label: "Phone",
    value: LINKS.phoneDisplay,
    copyText: LINKS.phone,
  },
  {
    kind: "download",
    label: "Resume",
    value: "Download resume",
    href: LINKS.resume,
  },
  {
    kind: "external",
    label: "LinkedIn",
    value: "Jerry Kou",
    href: LINKS.linkedin,
  },
];

function CanadaFlag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
      aria-hidden
      className="shrink-0"
    >
      <path fill="#FFFFFF" d="M8 4H24V28H8z" />
      <path
        d="M5,4h4V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
        fill="#C53A28"
      />
      <path
        d="M27,4h4V28h-4c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
        transform="rotate(180 27 16)"
        fill="#C53A28"
      />
      <path
        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
        opacity=".15"
      />
      <path
        d="M16.275,22.167l-.138-2.641c-.007-.16,.117-.296,.277-.304,.021,0,.042,0,.063,.004l2.629,.462-.355-.979c-.03-.08-.005-.17,.061-.223l2.88-2.332-.649-.303c-.091-.043-.135-.146-.104-.242l.569-1.751-1.659,.352c-.093,.019-.186-.029-.223-.116l-.321-.756-1.295,1.389c-.076,.08-.201,.083-.281,.007-.049-.047-.071-.115-.058-.182l.624-3.22-1.001,.578c-.095,.056-.217,.024-.272-.071-.002-.004-.004-.008-.006-.012l-1.016-1.995-1.016,1.995c-.049,.098-.169,.138-.267,.089-.004-.002-.008-.004-.012-.006l-1.001-.578,.624,3.22c.021,.108-.05,.212-.158,.233-.067,.013-.135-.009-.182-.058l-1.295-1.389-.321,.756c-.037,.087-.131,.136-.223,.116l-1.659-.352,.569,1.751c.031,.095-.013,.199-.104,.242l-.649,.303,2.88,2.332c.066,.054,.091,.144,.061,.223l-.355,.979,2.629-.462c.158-.027,.309,.079,.336,.237,.004,.021,.005,.042,.004,.063l-.138,2.641h.551Z"
        fill="#C53A28"
      />
      <path
        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
        fill="#FFFFFF"
        opacity=".2"
      />
    </svg>
  );
}

const rowBase =
  "group/row flex items-center gap-4 px-4 py-3 text-left " +
  "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-out)] " +
  "hover:bg-hover-bg-soft focus-visible:bg-hover-bg-soft focus-visible:outline-none";

const labelCls =
  "flex-1 font-mono text-[12px] leading-4 tracking-[0.1em] uppercase text-ink-subtle";

const valueCls = "flex items-center gap-2 text-[16px] leading-[1.5]";

const iconBase = "h-4 w-4 shrink-0 will-change-transform";

const textColorTrans =
  "transition-colors duration-[320ms] ease-[var(--ease-in-out)]";

function ContactRow({
  row,
  isLast,
  copied,
  onCopy,
}: {
  row: Row;
  isLast: boolean;
  copied: string | null;
  onCopy: (label: string, text: string) => void;
}) {
  const border = isLast ? "" : "border-b border-rule";

  if (row.kind === "static") {
    return (
      <div className={`flex items-center gap-4 px-4 py-3 ${border}`}>
        <span className={labelCls}>{row.label}</span>
        <span className={`${valueCls} text-ink`}>
          <CanadaFlag />
          {row.value}
        </span>
      </div>
    );
  }

  if (row.kind === "copy") {
    const isCopied = copied === row.label;
    return (
      <button
        type="button"
        onClick={() => onCopy(row.label, row.copyText)}
        className={`${rowBase} ${border} w-full`}
        aria-label={`Copy ${row.label.toLowerCase()}`}
      >
        <span className={labelCls}>{row.label}</span>
        <span className={valueCls}>
          {/* Active value text — snaps content but transitions color */}
          <span
            className={`${textColorTrans} ${
              isCopied ? "text-success" : "text-ink"
            }`}
          >
            {isCopied ? "Copied" : row.value}
          </span>
          {/* Stacked icons in a fixed 16x16 cell — fade + lift on hover */}
          <span className="relative grid h-4 w-4 shrink-0">
            <Copy
              className={`col-start-1 row-start-1 ${iconBase} text-ink-faint transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/row:-translate-y-0.5 group-hover/row:text-ink ${
                isCopied ? "opacity-0" : "opacity-100"
              }`}
              strokeWidth={2}
            />
            <Check
              className={`col-start-1 row-start-1 ${iconBase} text-success transition-opacity duration-[var(--duration-base)] ease-[var(--ease-out)] ${
                isCopied ? "opacity-100" : "opacity-0"
              }`}
              strokeWidth={2.5}
            />
          </span>
        </span>
      </button>
    );
  }

  if (row.kind === "download") {
    return (
      <a
        href={row.href}
        target="_blank"
        rel="noopener"
        className={`${rowBase} ${border}`}
      >
        <span className={labelCls}>{row.label}</span>
        <span className={`${valueCls} text-ink`}>
          {row.value}
          <Download
            className={`${iconBase} text-ink-faint transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/row:translate-y-0.5 group-hover/row:text-ink`}
            strokeWidth={2}
          />
        </span>
      </a>
    );
  }

  // external
  return (
    <Link
      href={row.href}
      target="_blank"
      rel="noopener"
      className={`${rowBase} ${border}`}
    >
      <span className={labelCls}>{row.label}</span>
      <span className={`${valueCls} text-ink`}>
        {row.value}
        <ArrowRight
          className={`${iconBase} text-ink-faint transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/row:translate-x-1 group-hover/row:text-ink`}
        />
      </span>
    </Link>
  );
}

export function ProfileCard() {
  const [copied, setCopied] = useState<string | null>(null);

  const onCopy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(
        () => setCopied((c) => (c === label ? null : c)),
        1600,
      );
    } catch {
      // Best-effort. Some browsers block clipboard outside secure contexts.
    }
  };

  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-16">
      <div className="flex flex-1 flex-col gap-6">
        <Avatar size="md" src="/jerry.webp" alt="Jerry Kou" />
        <div className="flex flex-col gap-2">
          <div className="font-display text-[20px] font-medium leading-none text-ink">
            Jerry Kou
          </div>
          <div className="font-mono text-[12px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
            Senior Product Designer
          </div>
        </div>
        <div className="flex flex-col gap-4 text-[16px] leading-[1.5] text-ink-muted max-w-[40ch]">
          <p>
            I&rsquo;m currently figuring out how to make designing with prompts
            as easy and smooth as designing with a pencil or mouse.
          </p>
          <p>Want to collaborate? Let&rsquo;s connect.</p>
        </div>
        <Button
          variant="filled"
          size="md"
          href={LINKS.calendar}
          target="_blank"
          rel="noopener"
          className="self-start"
        >
          Book a call
          <ArrowRight motion="btn-x" />
        </Button>
      </div>

      <div className="flex flex-1 justify-end">
        <div className="flex h-fit w-full flex-col self-start overflow-clip rounded-2xl bg-bg shadow-[var(--shadow-bar)] outline outline-1 outline-[#09090B06] md:w-[80%]">
          {rows.map((row, i) => (
            <ContactRow
              key={row.label}
              row={row}
              isLast={i === rows.length - 1}
              copied={copied}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
