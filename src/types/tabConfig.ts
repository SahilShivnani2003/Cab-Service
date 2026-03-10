export interface TabConfig {
  name: string;
  label: string;
  icon: string;       // Ionicons name — focused
  iconOff: string;    // Ionicons name — unfocused
  center?: boolean;   // true → renders as elevated center button
}