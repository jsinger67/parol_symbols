import { Text } from "@mantine/core";
import ScopeDetails from "./ScopeDetails";
import SymbolDetails from "./SymbolDetails";

export interface DetailsParams {
  element: typeof SymbolDetails | typeof ScopeDetails | null;
}

export default function Details(props: DetailsParams) {
  const { element } = props;
  if (!element) {
    return (
      <Text>
        <p>Nothing selected</p>
      </Text>
    );
  }
  return (<>{element}</>);
}