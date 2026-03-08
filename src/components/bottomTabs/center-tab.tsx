import { TouchableOpacity, View, Text } from 'react-native';
import { TabConfig } from '../../types/tabConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CenterTabProps {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
  tabWidth: number;
}

export default function CenterTab({
  tab,
  isFocused,
  onPress,
  tabWidth,
}: CenterTabProps) {
  return (
    <View>
      <TouchableOpacity>
        <Ionicons name={isFocused ? tab.icon : tab.iconOff} size={22} />
        <Text>{tab.label}</Text>
      </TouchableOpacity>
    </View>
  );
}
