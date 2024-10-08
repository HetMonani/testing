import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./avatar";
  
  export function ProfilePicture() {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  