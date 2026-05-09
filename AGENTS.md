<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CaseImage spec — DO NOT DEVIATE

The two image surfaces (case study body images, next-case card thumbnails) follow the structure below. Implementation lives in `components/ui/case-image.tsx`. Consumed by `components/blocks/case-study-layout.tsx` and `components/blocks/next-case-card.tsx`.

## Case study images (`<CaseImage>` with `bleed`/`bleedFactor`)

```
<div = 64px padding desktop | 16px padding mobile, round corners, hidden overflow>
  <mesh-gradient />
  <div =
    flex y, flex x,
    overflow visible,
    height =
      ( ( IMAGE_HEIGHT - 2 * padding ) * bleedFactor )   if bleed === true
      IMAGE_HEIGHT                                        if bleed === false
  >
    <img = object-cover>
  </div>
</div>
```

Where `IMAGE_HEIGHT` is the image's *natural rendered* height at the inner content width (`inner_width * src.height / src.width`).

`heroBleed` / `heroBleedFactor` (set per case study in `lib/case-studies.ts`) feed straight into `bleed`/`bleedFactor` on the hero. Per-block `bleed`/`bleedFactor` flow through the BlockRenderer the same way.

## Next case card (`<CaseImage>` inside `NextCaseCard`)

```
<div = 32px padding desktop | 16px padding mobile, round corners, hidden overflow>
  <mesh-gradient />
  <div =
    flex y, flex x,
    overflow visible,
    height = THUMB_HEIGHT_DESKTOP  |  THUMB_HEIGHT_MOBILE
  >
    <img = object-cover>
  </div>
</div>
```

`THUMB_HEIGHT_DESKTOP` / `THUMB_HEIGHT_MOBILE` are constants at the top of `components/blocks/next-case-card.tsx` and feed the CaseImage via the `bleedHeight` prop.

## Implementation notes

- Image is `next/image` with **`w-full h-auto`** (plus `align-top` to kill inline-baseline gap). No `block`, no `fill`, no `object-cover`. The image renders at its natural aspect, fills the inner div's width 100%, and lets its height grow naturally. **Side cropping is structurally impossible** because the image is always exactly the inner div's width. Vertical clipping happens when the natural rendered height exceeds the inner div's height; the outer container's `overflow: clip` does the actual visual clipping.
- The inner div's height is set as `aspect-ratio` (for body images, computed from the formula) or fixed `height` (for next-case-card via `bleedHeight`). **When using `aspect-ratio`, you MUST also set `min-height: 0`** — the default `min-height: auto` lets the image's intrinsic height push the box larger than the aspect-ratio's computed height, which kills the bleed (container just hugs the image bottom). This has caused regressions; do not omit it.
- **Do not use `display: flex` on the inner div** — flex containers can override `aspect-ratio` with their children's intrinsic size, killing the bleed.
- Outer padding is set via inline style for desktop and overridden on mobile via `!`-prefixed `max-md:` Tailwind classes (`max-md:!p-4` etc.) so they beat the inline declaration. In bleed mode, `padding-bottom` is 0 so the image's overflow gets clipped exactly at the visible image boundary instead of disappearing into a padding strip.
- Outer container uses `overflow: clip` to actually clip the image's overflow at the rounded edge.

**If you find yourself rewriting bleed math or restructuring CaseImage, re-read this file first. In particular:**
- **NEVER switch the image to `fill + object-cover`** — that ALWAYS crops sideways when the inner div's aspect doesn't match the image's natural aspect.
- **NEVER omit `min-height: 0`** when using aspect-ratio on the inner div — bleed will silently break.
