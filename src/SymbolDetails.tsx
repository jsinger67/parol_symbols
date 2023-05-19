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

const getSymbolName = (symbol: Symbol, symbolTable: SymbolTable) : string => {
  const enveloping_scope = symbolTable.scopes.find(
    (scope) => scope.my_id === symbol.name_id[0]
  )!;
  return enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
}

const getSymbolNameById = (symbol_id: number, symbolTable: SymbolTable) : string => {
  const symbol = symbolTable.symbols[symbol_id];
  const enveloping_scope = symbolTable.scopes.find(
    (scope) => scope.my_id === symbol.name_id[0]
  )!;
  return enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
}


const InstanceComp = (props: InstanceParams) => {
  const { instance: { scope, type_id, used, sem, description }, symbolTable } = props;
  const type_name = getSymbolNameById(type_id, symbolTable);


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

interface TypeParams {
  type_symbol: any
  symbolTable: SymbolTable;
}

interface FunctionSymbol {
  alts: number,
  non_terminal: string,
  prod_num: number,
  prod_string: string,
  rel_idx: number,
  sem: "None" | "CollectionStart" | "AddToCollection" | "OptionalSome" | "OptionalNone",
}

const TypeComp = (props: TypeParams) => {
  const { type_symbol: { entrails, member_scope }, symbolTable } = props;

  const type_member_scope = symbolTable.scopes.find(
    (scope) => scope.my_id === member_scope
  )!;

  let entrails_specificity = <Text>Unspecified</Text>;
  if (typeof entrails === 'object') {
    if ("Function" in entrails) {
      const function_symbol: FunctionSymbol = entrails.Function;
      entrails_specificity = (
        <>
          <Text fw={600} fs='italic'>Function</Text>
          <Space h='sm'></Space>
          <Text>Alternations: {function_symbol.alts}</Text>
          <Text>Non-Terminal: "{function_symbol.non_terminal}"</Text>
          <Text>Production: #{function_symbol.prod_num} "{function_symbol.prod_string}"</Text>
          <Text>Relative production index: {function_symbol.rel_idx}</Text>
          <Text>Semantics: {function_symbol.sem}</Text>
        </>
      );
    } else if ("Box" in entrails) {
      const symbol_id = entrails.Box;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs='italic'>Box</Text>
          <Space h='sm'></Space>
          <Text>Boxed symbol: #{symbol_id} "{name}"</Text>
        </>
      );
    } else if ("EnumVariant" in entrails) {
      const symbol_id = entrails.EnumVariant;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs='italic'>EnumVariant</Text>
          <Space h='sm'></Space>
          <Text>Variant symbol: #{symbol_id} "{name}"</Text>
        </>
      );
    } else if ("Option" in entrails) {
      const symbol_id = entrails.Option;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs='italic'>Option</Text>
          <Space h='sm'></Space>
          <Text>Variant symbol: #{symbol_id} "{name}"</Text>
        </>
      );
    } else if ("Clipped" in entrails) {
      const symbol_id = entrails.Option;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs='italic'>Option</Text>
          <Space h='sm'></Space>
          <Text>Variant symbol: #{symbol_id} "{name}"</Text>
        </>
      );
    }
  } else if (typeof entrails === 'string') {
    entrails_specificity = (
      <>
        <Text fw={600} fs='italic'>{entrails}</Text>
        <Space h='sm'></Space>
      </>
    );
  }

  return (
    <>
      <Space h='md'></Space>
      <Text fw={700} td='underline'>Type entrails</Text>
      <Space h='md'></Space>
      {entrails_specificity}
      <Text>Member Scope: {type_member_scope.my_id}</Text>
    </>
  );
}

const SymbolDetails = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbolTable } = props;
    const name = getSymbolName(symbol, symbolTable);
    let type_or_instance = <Text>Type</Text>;
    if ("Instance" in symbol.kind) {
      console.log(symbol.kind);
      const { Instance } = symbol.kind;
      type_or_instance = <InstanceComp instance={Instance} symbolTable={symbolTable} />;
     } else if ("Type" in symbol.kind) {
      console.log(symbol.kind);
      const { Type } = symbol.kind;
      type_or_instance = <TypeComp type_symbol={Type} symbolTable={symbolTable} />;
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
