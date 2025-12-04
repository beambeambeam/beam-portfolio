"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import {
  type ComponentProps,
  type ElementType,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { pluralize } from "@/lib/formatter";
import { cn } from "@/lib/utils";

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const isInFuture = diff < 0;
  const absDiff = Math.abs(diff);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 5) {
    return "just now";
  }

  if (isInFuture) {
    if (seconds < 60) {
      return `in ${pluralize(seconds, "second")}`;
    }
    if (minutes < 60) {
      return `in ${pluralize(minutes, "minute")}`;
    }
    if (hours < 24) {
      return `in ${pluralize(hours, "hour")}`;
    }
    if (days < 7) {
      return `in ${pluralize(days, "day")}`;
    }
    return date.toLocaleDateString();
  }

  if (seconds < 60) {
    return `${pluralize(seconds, "second")} ago`;
  }
  if (minutes < 60) {
    return `${pluralize(minutes, "minute")} ${pluralize(seconds % 60, "second")} ago`;
  }
  if (hours < 24) {
    return `${pluralize(hours, "hour")} ago`;
  }
  if (days < 7) {
    return `${pluralize(days, "day")} ago`;
  }
  return date.toLocaleDateString();
}

interface TimezoneCardProps extends ComponentProps<"div"> {
  date: Date;
  timezone?: string;
}

function TimezoneCard(props: TimezoneCardProps) {
  const { date, timezone, ...cardProps } = props;

  const locale = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().locale,
    []
  );

  const timezoneName = useMemo(
    () =>
      timezone ??
      new Intl.DateTimeFormat(locale, { timeZoneName: "shortOffset" })
        .formatToParts(date)
        .find((part) => part.type === "timeZoneName")?.value,
    [date, timezone, locale]
  );

  const { formattedDate, formattedTime } = useMemo(
    () => ({
      formattedDate: new Intl.DateTimeFormat(locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: timezone,
      }).format(date),
      formattedTime: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: timezone,
      }).format(date),
    }),
    [date, timezone, locale]
  );

  return (
    <section
      aria-label={`Time in ${timezoneName}: ${formattedDate} ${formattedTime}`}
      {...cardProps}
      className="flex items-center justify-between gap-2 text-muted-foreground text-sm"
    >
      <span className="w-fit rounded bg-accent px-1 font-medium text-xs">
        {timezoneName}
      </span>
      <div className="flex items-center gap-2">
        <time dateTime={date.toISOString()}>{formattedDate}</time>
        <time className="tabular-nums" dateTime={date.toISOString()}>
          {formattedTime}
        </time>
      </div>
    </section>
  );
}

const triggerVariants = cva(
  "inline-flex w-fit items-center justify-center text-foreground/70 text-sm transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        muted: "text-foreground/50 hover:text-foreground/70",
        ghost: "hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface RelativeTimeCardProps
  extends ComponentProps<"button">,
    ComponentProps<typeof HoverCard>,
    Pick<
      ComponentProps<typeof HoverCardContent>,
      | "align"
      | "side"
      | "alignOffset"
      | "sideOffset"
      | "avoidCollisions"
      | "collisionBoundary"
      | "collisionPadding"
      | "asChild"
    >,
    VariantProps<typeof triggerVariants> {
  date: Date | string | number;
  timezones?: string[];
  updateInterval?: number;
}

function RelativeTimeCard(props: RelativeTimeCardProps) {
  const {
    date: dateProp,
    variant,
    timezones = ["UTC"],
    open,
    defaultOpen,
    onOpenChange,
    openDelay = 500,
    closeDelay = 300,
    align,
    side,
    alignOffset,
    sideOffset,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    updateInterval = 1000,
    asChild,
    children,
    className,
    ...triggerProps
  } = props;

  const date = useMemo(
    () => (dateProp instanceof Date ? dateProp : new Date(dateProp)),
    [dateProp]
  );

  const locale = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().locale,
    []
  );

  const [formattedTime, setFormattedTime] = useState<string>(() =>
    date.toLocaleDateString()
  );

  useEffect(() => {
    setFormattedTime(formatRelativeTime(date));
    const timer = setInterval(() => {
      setFormattedTime(formatRelativeTime(date));
    }, updateInterval);

    return () => clearInterval(timer);
  }, [date, updateInterval]);

  const TriggerPrimitive: ElementType = asChild ? Slot.Slot : "button";

  return (
    <HoverCard
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      openDelay={openDelay}
    >
      <HoverCardTrigger asChild>
        <TriggerPrimitive
          {...triggerProps}
          className={cn(triggerVariants({ variant, className }))}
        >
          {children ?? (
            <time dateTime={date.toISOString()} suppressHydrationWarning>
              {new Intl.DateTimeFormat(locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(date)}
            </time>
          )}
        </TriggerPrimitive>
      </HoverCardTrigger>
      <HoverCardContent
        align={align}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        className="flex w-full max-w-[420px] flex-col gap-2 p-3"
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
      >
        <time
          className="text-muted-foreground text-sm"
          dateTime={date.toISOString()}
        >
          {formattedTime}
        </time>
        <ul className="flex flex-col gap-1">
          {timezones.map((timezone) => (
            <li key={timezone}>
              <TimezoneCard date={date} timezone={timezone} />
            </li>
          ))}
          <li>
            <TimezoneCard date={date} />
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}

export { RelativeTimeCard };
