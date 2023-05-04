import { Text } from "@mantine/core";
import ScopeListItem from "./ScopeListItem";
import { SymbolTableParams } from "./SymbolTable";

export default function Scopes(props: SymbolTableParams) {
  if (props.symbolTable.symbols.length > 0) {
    const {
      symbolTable,
      setActiveElement,
      setActiveListElement,
      activeListElement,
      assert,
    } = props;
    console.log(`Scopes: active element is ${activeListElement}`);
    return (
      <>
        {symbolTable.scopes.map((scope) => {
          const setThisElementActive = (element: any) => {
            const {
              props: {
                scope: { my_id },
              },
            } = element;
            // Set state in this component
            console.log(`setActiveListElement ${my_id}`);
            setActiveListElement(my_id);
            // Set state in outer component
            console.log(`setActiveElement ${element}`);
            setActiveElement(element);
          };
          return (
            <ScopeListItem
              key={scope.my_id}
              scope={scope}
              symbolTable={symbolTable}
              setActiveElement={setThisElementActive}
              assert={assert}
              activeElement={activeListElement}
            />
          );
        })}
      </>
    );
  }
  return (
    <Text>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Text>
  );
}
