import React from 'react';
import {
  Activity, AlertCircle, AlertTriangle, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  BarChart, Bell, Book, Bookmark, Box, Briefcase, Building, Calendar,
  Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, Clipboard,
  Clock, Cloud, Code, Cog, Copy, CreditCard, Database, DollarSign,
  Download, Edit, ExternalLink, Eye, File, FileText, Filter, Flag,
  Folder, Globe, Grid3X3 as Grid, Hash, Heart, HelpCircle, Home, Image,
  Inbox, Info, Key, Layers, Layout, Link, List, Lock,
  LogOut, Mail, Map, MapPin, Menu, MessageCircle, Minus, Monitor,
  MoreHorizontal, MoreVertical, Package, Paperclip, Pause, Percent, Phone, PieChart,
  Play, Plus, PlusCircle, Power, Printer, RefreshCw, Save, Search,
  Send, Server, Settings, Share, Shield, ShoppingCart, Slash, Sliders,
  Smartphone, Star, StopCircle, Sun, Tag, Target, Terminal, ThumbsDown,
  ThumbsUp, Trash, TrendingDown, TrendingUp, Truck, Unlock, Upload, User,
  UserPlus, Users, X, XCircle, Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { tokens } from '../tokens';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, number> = {
  sm: tokens.icon.sm,
  md: tokens.icon.md,
  lg: tokens.icon.lg,
  xl: 64,
};

/**
 * Registry mapping IconName values (from @dashboard-bootstrap/schema vocabulary)
 * to Lucide React components.
 */
const iconRegistry: Record<string, LucideIcon> = {
  'activity': Activity,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'archive': Archive,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'bar-chart': BarChart,
  'bell': Bell,
  'book': Book,
  'bookmark': Bookmark,
  'box': Box,
  'briefcase': Briefcase,
  'building': Building,
  'calendar': Calendar,
  'check': Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle': Circle,
  'clipboard': Clipboard,
  'clock': Clock,
  'cloud': Cloud,
  'code': Code,
  'cog': Cog,
  'copy': Copy,
  'credit-card': CreditCard,
  'database': Database,
  'dollar-sign': DollarSign,
  'download': Download,
  'edit': Edit,
  'external-link': ExternalLink,
  'eye': Eye,
  'file': File,
  'file-text': FileText,
  'filter': Filter,
  'flag': Flag,
  'folder': Folder,
  'globe': Globe,
  'grid': Grid,
  'hash': Hash,
  'heart': Heart,
  'help-circle': HelpCircle,
  'home': Home,
  'image': Image,
  'inbox': Inbox,
  'info': Info,
  'key': Key,
  'layers': Layers,
  'layout': Layout,
  'link': Link,
  'list': List,
  'lock': Lock,
  'log-out': LogOut,
  'mail': Mail,
  'map': Map,
  'map-pin': MapPin,
  'menu': Menu,
  'message-circle': MessageCircle,
  'minus': Minus,
  'monitor': Monitor,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  'package': Package,
  'paperclip': Paperclip,
  'pause': Pause,
  'percent': Percent,
  'phone': Phone,
  'pie-chart': PieChart,
  'play': Play,
  'plus': Plus,
  'plus-circle': PlusCircle,
  'power': Power,
  'printer': Printer,
  'refresh-cw': RefreshCw,
  'save': Save,
  'search': Search,
  'send': Send,
  'server': Server,
  'settings': Settings,
  'share': Share,
  'shield': Shield,
  'shopping-cart': ShoppingCart,
  'slash': Slash,
  'sliders': Sliders,
  'smartphone': Smartphone,
  'star': Star,
  'stop-circle': StopCircle,
  'sun': Sun,
  'tag': Tag,
  'target': Target,
  'terminal': Terminal,
  'thumbs-down': ThumbsDown,
  'thumbs-up': ThumbsUp,
  'trash': Trash,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'truck': Truck,
  'unlock': Unlock,
  'upload': Upload,
  'user': User,
  'user-plus': UserPlus,
  'users': Users,
  'x': X,
  'x-circle': XCircle,
  'zap': Zap,
};

export interface IconProps {
  name: string;
  size?: IconSize;
  color?: string;
  className?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export function Icon({ name, size = 'md', color, className, ...ariaProps }: IconProps) {
  const LucideIcon = iconRegistry[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={sizeMap[size]} color={color} className={className} {...ariaProps} />;
}

/** Expose the registry keys for conformance testing. */
export const ICON_REGISTRY_KEYS = Object.keys(iconRegistry);
