// components/common/Icon.tsx - 아이콘 래퍼 컴포넌트

import React, { FC } from "react";
import { LucideProps } from "lucide-react";
import {
  Mail,
  User,
  Settings,
  Home,
  Search,
  Star,
  Heart,
  Circle,
  Download,
  Share,
  Edit,
  MoreHorizontal,
  AlertTriangle,
  HelpCircle,
  CheckCircle,
  XCircle,
  Info,
  Menu,
  X,
  Sun,
  Moon,
  CodeXml,
  Github,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  Image,
  ChevronDown,
  Filter,
  SortAsc,
  SortDesc,
  RotateCcw,
  ExternalLink
} from "lucide-react";

type IconName = 
  | "Mail"
  | "User"
  | "Settings"
  | "Home"
  | "Search"
  | "Star"
  | "Heart"
  | "Circle"
  | "Download"
  | "Share"
  | "Edit"
  | "MoreHorizontal"
  | "AlertTriangle"
  | "HelpCircle"
  | "CheckCircle"
  | "XCircle"
  | "Info"
  | "Menu"
  | "X"
  | "Sun"
  | "Moon"
  | "CodeXml"
  | "Github"
  | "Linkedin"
  | "ArrowRight"
  | "ArrowLeft"
  | "Image"
  | "ChevronDown"
  | "Filter"
  | "SortAsc"
  | "SortDesc"
  | "RotateCcw"
  | "ExternalLink";

interface IconProps extends Omit<LucideProps, "name"> {
  name: IconName;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

const Icon: FC<IconProps> = ({
  name,
  size = "1em",
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...rest
}) => {
  // 아이콘 이름에 따라 해당 컴포넌트를 반환
  const getIconComponent = () => {
    switch (name) {
      case "Mail":
        return Mail;
      case "User":
        return User;
      case "Settings":
        return Settings;
      case "Home":
        return Home;
      case "Search":
        return Search;
      case "Star":
        return Star;
      case "Heart":
        return Heart;
      case "Circle":
        return Circle;
      case "Download":
        return Download;
      case "Share":
        return Share;
      case "Edit":
        return Edit;
      case "MoreHorizontal":
        return MoreHorizontal;
      case "AlertTriangle":
        return AlertTriangle;
      case "CheckCircle":
        return CheckCircle;
      case "XCircle":
        return XCircle;
      case "Info":
        return Info;
      case "Menu":
        return Menu;
      case "X":
        return X;
      case "Sun":
        return Sun;
      case "Moon":
        return Moon;
      case "CodeXml":
        return CodeXml;
      case "Github":
        return Github;
      case "Linkedin":
        return Linkedin;
      case "ArrowRight":
        return ArrowRight;
      case "ArrowLeft":
        return ArrowLeft;
      case "Image":
        return Image;
      case "ChevronDown":
        return ChevronDown;
      case "Filter":
        return Filter;
      case "SortAsc":
        return SortAsc;
      case "SortDesc":
        return SortDesc;
      case "RotateCcw":
        return RotateCcw;
      case "ExternalLink":
        return ExternalLink;
      case "HelpCircle":
      default:
        console.warn(`Icon not found: ${String(name)}. Rendering default HelpCircle icon.`);
        return HelpCircle;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Icon; 