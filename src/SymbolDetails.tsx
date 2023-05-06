import { Space, Text } from "@mantine/core";
import { Symbol, SymbolTable } from "./SymbolTable";

export interface SymbolListItemParams {
  symbol: Symbol;
  symbolTable: SymbolTable;
}

interface InstanceParams {
  instance: any
  symbolTable: SymbolTable;
}

const InstanceComp = (props: InstanceParams) => {
  const { instance: { scope, type_id, used, sem, description }, symbolTable } = props;
  const type_symbol = symbolTable.symbols[type_id];
  const enveloping_scope = symbolTable.scopes.find(
    (scope) => scope.my_id === type_symbol.name_id[0]
  )!;
  const type_name = enveloping_scope.names[type_symbol.name_id[1]] || "<Unnamed>";


  return (
    <>
      <Text>Instance: {description}</Text>
      <Text>Semantic: {sem}</Text>
      <Text>Type: ID {type_id} ({type_name})</Text>
      <Text>Scope: {scope}</Text>
      <Text>Used: {used ? "true" : "false"}</Text>
    </>
  );
}

const SymbolDetails = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbolTable } = props;
    const enveloping_scope = symbolTable.scopes.find(
      (scope) => scope.my_id === symbol.name_id[0]
    )!;
    const name = enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
    let type_or_instance = <Text>Type</Text>;
    if ("Instance" in symbol.kind) {
      console.log(symbol.kind);
      const { Instance } = symbol.kind;
      type_or_instance = <InstanceComp instance={Instance} symbolTable={symbolTable} />;
     }

    return (
      <div className="details">
        <Text fw={700} td='underline'>Symbol Details</Text>
        <Space h='md'/>
        <Text>{symbol.my_id} {name}</Text>
        <Text>{type_or_instance}</Text>
      </div>
    );
  }
  return null;
};

export default SymbolDetails;
