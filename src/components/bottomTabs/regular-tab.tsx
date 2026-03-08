import { TouchableOpacity, View, Text } from 'react-native';
import { TabConfig } from '../../types/tabConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface RegularTabProps {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
  tabWidth: number;
}

export default function RegularTab({
  tab,
  isFocused,
  onPress,
  tabWidth,
}: RegularTabProps) {
  return (
    <View style={{ width: tabWidth }}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={isFocused ? tab.icon : tab.iconOff} size={22} />
        <Text>{tab.label}</Text>
      </TouchableOpacity>
    </View>
  );
}
