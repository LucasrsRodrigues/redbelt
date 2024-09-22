import defaultStyle from '@global/styles/default.styles';
import 'styled-components/native';


declare module 'styled-components/native' {
  type ThemeType = typeof defaultStyle;

  export interface DefaultTheme extends ThemeType { }
}