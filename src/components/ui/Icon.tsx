import {
  Building2,
  Home,
  Hammer,
  Paintbrush,
  Warehouse,
  UtensilsCrossed,
  Waves,
  TreePine,
  Armchair,
  Award,
  Shield,
  Users,
  Eye,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Home,
  Hammer,
  Paintbrush,
  Warehouse,
  UtensilsCrossed,
  Waves,
  TreePine,
  Armchair,
  Award,
  Shield,
  Users,
  Eye,
  Lightbulb,
};

interface IconProps {
  name?: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Lucide = (name && iconMap[name]) || Building2;
  return <Lucide className={className} strokeWidth={strokeWidth} />;
}

export const iconNames = Object.keys(iconMap);