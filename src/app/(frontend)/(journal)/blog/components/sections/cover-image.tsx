'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import type { Cover } from '@/components/wg';

type CoverImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  cover: Cover;
  /** The stock illustration shown if the cover fails to load. */
  fallback: Cover;
  /** Override the intrinsic size, e.g. for thumbnails. */
  size?: { width: number; height: number };
};

// CMS images live in an external object store. If it is unreachable, a card
// with a broken picture is worse than a card with the topic's illustration.
export function CoverImage({ cover, fallback, size, ...rest }: CoverImageProps) {
  const [failed, setFailed] = useState(false);
  const shown = failed ? fallback : cover;
  return (
    <Image
      {...rest}
      src={shown.src}
      alt={shown.alt}
      width={size?.width ?? shown.width}
      height={size?.height ?? shown.height}
      onError={() => {
        if (!failed && cover.src !== fallback.src) setFailed(true);
      }}
    />
  );
}
