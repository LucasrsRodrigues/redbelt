import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 375; // Largura base (iPhone 6/7/8)
const baseHeight = 667; // Altura base (iPhone 6/7/8)

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

const responsiveFontSize = (size: number) => size * scale;

export default responsiveFontSize;