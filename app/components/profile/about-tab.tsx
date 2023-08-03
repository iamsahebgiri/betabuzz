import React from "react";
import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import { UserProfile } from "@/types";

interface AboutTabProps {
  user: UserProfile;
}

export default function AboutTab({ user }: AboutTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold leading-none tracking-tight text-muted-foreground">
          Bio
        </h2>
        <p className="font-medium text-secondary-foreground">
          {user?.bio ?? "Unknown"}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold leading-none tracking-tight text-muted-foreground">
          Interests
        </h2>
        {user.interests && user.interests.length > 0 ? (
          <div className="space-x-2">
            {user.interests.map((interest: string, index: number) => (
              <Pill title={interest} key={index} />
            ))}
          </div>
        ) : (
          <p className="font-medium text-secondary-foreground">Unknown</p>
        )}
      </div>
      <div>
        <h2 className="font-bold leading-none tracking-tight text-muted-foreground">
          Gender
        </h2>
        <p className="font-medium capitalize text-secondary-foreground">
          {user.gender ?? "Unknown"}
        </p>
      </div>
      <div>
        <h2 className="font-bold leading-none tracking-tight text-muted-foreground">
          Language
        </h2>
        <p className="font-medium capitalize text-secondary-foreground">
          {user.language ?? "Unknown"}
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="font-bold leading-none tracking-tight text-muted-foreground">
          Socials
        </h2>
        {user.socials && user.socials.length > 0 ? (
          <ul className="space-y-2">
            {user.socials.map(
              (social: { platform: string; href: string }, index: number) => (
                <li className="flex items-center gap-2" key={index}>
                  <Image
                    height={20}
                    width={20}
                    alt={social.platform}
                    src={`https://icons.bitwarden.net/${social.platform}/icon.png`}
                    className="h-5 w-5 rounded-md"
                  />
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium"
                  >
                    {social.href}
                  </a>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="font-medium text-secondary-foreground">
            No socials yet
          </p>
        )}
      </div>
    </div>
  );
}
