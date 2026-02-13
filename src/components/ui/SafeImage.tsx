import { ImgHTMLAttributes, ReactNode, useState } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}

/**
 * Renders an image and hides/replaces it if loading fails (e.g. Supabase 404).
 * Prevents broken-image icons from showing in the UI.
 */
export function SafeImage({ fallback = null, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!props.src || hasError) {
    return <>{fallback}</>;
  }

  return (
    <img
      {...props}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}
