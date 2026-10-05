"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Keeps a single word from ending up alone on the last line of any text block, on every page and at every width.
// CSS `text-wrap: pretty` (globals.css) handles most paragraphs, but Chrome treats it as a hint and still leaves
// widows in short blocks, and other browsers ignore it. So after the page renders, the space before the last word of
// each text block becomes a non-breaking space, which keeps the last two words together. It only joins words that
// fit on one line (under 92% of the block's width), so nothing can overflow. Runs again whenever the
// page's text changes (route changes, filters, carousels).

const BLOCKS = "p, li, h1, h2, h3, h4, h5, h6, blockquote, figcaption, dt, dd, td, th, label, span, a, button";
const NBSP = "\u00A0";
const NBHY = "\u2011";

function lastTextNodes(el: Element) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (/\S/.test(n.nodeValue ?? "")) nodes.push(n as Text);
  return nodes;
}

function width(node: Text, start: number, end: number) {
  const r = document.createRange();
  r.setStart(node, start);
  r.setEnd(node, end);
  // Sum the pieces: a word split across two lines has one rect per line.
  return [...r.getClientRects()].reduce((w, rect) => w + rect.width, 0);
}

function fix(el: Element) {
  const nodes = lastTextNodes(el);
  if (!nodes.length) return;
  // Last word: the trailing run of non-space characters in the last non-empty text node.
  const last = nodes[nodes.length - 1];
  const text = last.nodeValue ?? "";
  const end = text.trimEnd().length;
  const lastStart = text.slice(0, end).search(/\S+$/);
  if (lastStart < 0) return;
  // The space before it is either in the same node, or at the end of the previous one (e.g. "the <em>word</em>").
  let host: Text | null = null;
  let spaceAt = -1;
  if (lastStart > 0) {
    if (text[lastStart - 1] === NBSP) return;
    if (text[lastStart - 1] === " ") {
      host = last;
      spaceAt = lastStart - 1;
    }
  } else if (nodes.length > 1) {
    const prev = nodes[nodes.length - 2];
    const pv = prev.nodeValue ?? "";
    if (pv.endsWith(NBSP)) return;
    if (pv.endsWith(" ")) {
      host = prev;
      spaceAt = pv.length - 1;
    }
  }
  if (!host || spaceAt < 0) return;
  // Only join when the two words fit easily on one line.
  const hv = host.nodeValue ?? "";
  const prevStart = hv.slice(0, spaceAt).search(/\S+$/);
  const blockWidth = el.getBoundingClientRect().width;
  if (prevStart < 0 || blockWidth === 0) return;
  const pair = width(host, prevStart, spaceAt + 1) + (host === last ? width(last, lastStart, end) : width(last, 0, end));
  if (pair > blockWidth * 0.92) return;
  host.nodeValue = hv.slice(0, spaceAt) + NBSP + hv.slice(spaceAt + 1);
  // A hyphenated last word ("destination-driven.") can still break at its hyphen and leave half a word behind,
  // so its hyphens become non-breaking hyphens.
  const lv = last.nodeValue ?? "";
  const ls = lv.slice(0, lv.trimEnd().length).search(/\S+$/);
  if (ls >= 0 && lv.slice(ls).includes("-")) last.nodeValue = lv.slice(0, ls) + lv.slice(ls).replace(/-/g, NBHY);
}

function run(root: ParentNode = document.body) {
  for (const el of root.querySelectorAll(BLOCKS)) {
    // Innermost text blocks only; a parent block's last word is handled by its last child block.
    if (el.querySelector("p, li, h1, h2, h3, h4, h5, h6, blockquote, div, ul, ol")) continue;
    if (el.closest("script, style, svg, [contenteditable]")) continue;
    fix(el);
  }
}

export function NoWidows() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => run());
    };
    // After fonts load (widths change) and on any later text change.
    schedule();
    document.fonts?.ready.then(schedule);
    const mo = new MutationObserver((records) => {
      // Ignore our own edits (they only swap one character).
      if (records.every((r) => r.type === "characterData" && /[\u00A0\u2011]/.test(r.target.nodeValue ?? ""))) return;
      schedule();
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
