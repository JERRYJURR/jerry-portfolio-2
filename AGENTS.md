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

- Use `next/image` with the `fill` prop + `object-cover object-top` so the inner div's height is the authoritative size. **Do not use `w-full h-auto`** — that lets the image's intrinsic height expand the container and silently kills bleed.
- The inner div's height is expressed as `aspect-ratio` so it scales responsively while still satisfying the formula above. **Do not use `display: flex`** on a parent that relies on `aspect-ratio` for height — flex containers can override aspect-ratio with their children's intrinsic size.
- Outer padding is set via inline style for desktop and overridden on mobile via `!`-prefixed `max-md:` Tailwind classes (`max-md:!p-4` etc.) so they beat the inline declaration.
- Outer container uses `overflow: clip` for rounded-corner clipping; it does not need to clip the image when `fill + object-cover` is used because the image is already constrained to the inner div.

**If you find yourself rewriting bleed math or restructuring CaseImage, re-read this file first.**
