"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PORTRAIT_DEFAULT_POSITION,
  resolveFounderPhotoPosition,
} from "@/lib/founder-photos";

type Props = {
  src: string;
  alt: string;
  /** Optional DB/admin override, e.g. "50% 20%" */
  photoPosition?: string | null;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function FounderPhoto({
  src,
  alt,
  photoPosition,
  className = "object-cover",
  fill = true,
  sizes,
  priority,
}: Props) {
  const [position, setPosition] = useState(
    photoPosition?.trim() || PORTRAIT_DEFAULT_POSITION
  );

  useEffect(() => {
    if (photoPosition?.trim()) {
      setPosition(photoPosition.trim());
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      setPosition(
        resolveFounderPhotoPosition(img.naturalWidth, img.naturalHeight, null)
      );
    };
    img.src = src;
  }, [src, photoPosition]);

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectPosition: position }}
    />
  );
}
