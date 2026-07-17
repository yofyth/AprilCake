import {
    CakeSlice, Heart, CupSoda, Gift, MessageCircle, ClipboardList,
    CreditCard, Truck, Leaf, ChefHat, ShieldCheck, Clock, Star,
    Sparkles, PackageCheck,
} from 'lucide-react';

const ICONS = {
    'cake-slice': CakeSlice,
    heart: Heart,
    'cup-soda': CupSoda,
    gift: Gift,
    'message-circle': MessageCircle,
    'clipboard-list': ClipboardList,
    'credit-card': CreditCard,
    truck: Truck,
    leaf: Leaf,
    'chef-hat': ChefHat,
    'shield-check': ShieldCheck,
    clock: Clock,
    star: Star,
    sparkles: Sparkles,
    'package-check': PackageCheck,
};

export const ICON_OPTIONS = Object.keys(ICONS);

export default function DynamicIcon({ name, size = 22, className = '' }) {
    const Icon = ICONS[name] || Sparkles;
    return <Icon size={size} className={className} />;
}
