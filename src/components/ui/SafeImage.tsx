import { ImgHTMLAttributes, ReactNode, useEffect, useState } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  onImageError?: () => void;
}

/**
 * Renders an image and hides/replaces it if loading fails (e.g. Supabase 404).
 * Prevents broken-image icons from showing in the UI and allows parent to react.
 */
export function SafeImage({
  fallback = null,
  onImageError,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // reset error state when the source changes
  useEffect(() => {
    setHasError(false);
  }, [props.src]);

  if (!props.src || hasError) {
    return <>{fallback}</>;
  }

  return (
    <img
      {...props}
      loading="lazy"
      onError={(e) => {
        setHasError(true);
        onImageError?.();
        // Preserve any caller-provided onError handler
        props.onError?.(e);
      }}
    />
  );
}
