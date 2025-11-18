"use client"

import * as React from "react"
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden"

/**
 * VisuallyHidden component
 * Hides content visually while keeping it accessible to screen readers
 * 
 * @example
 * ```tsx
 * <VisuallyHidden>
 *   <DialogTitle>Hidden Title</DialogTitle>
 * </VisuallyHidden>
 * ```
 */
const VisuallyHidden = VisuallyHiddenPrimitive.Root

export { VisuallyHidden }

