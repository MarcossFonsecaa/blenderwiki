"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

function Avatar({ username, className, ...props }) {
  // Cria o URL do avatar baseado no username
  const avatarUrl = `https://avatar.iran.liara.run/public/boy?username=${username}`

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className="aspect-square size-full"
        src={avatarUrl}
        alt={username}
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="bg-muted flex size-full items-center justify-center rounded-full"
      >
        {username[0].toUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar }
