import { Button } from "@mantine/core";
import { SymbolTable } from "./bindings/SymbolTable";
import { Scope } from "./bindings/Scope"
import ScopeDetails from "./ScopeDetails";
import { useRef } from "react";

export interface ScopeListItemParams {
    activeElement: number,
    scope: Scope
    symbolTable: SymbolTable;
    setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
    // assert: React.Dispatch<React.SetStateAction<[boolean, string]>>
}

const ScopeListItem = (props: ScopeListItemParams) => {
    const { activeElement, scope, symbolTable, setActiveElement } = props;

    const myRef = useRef<HTMLButtonElement>(null);
    // const [myRef, setRef] = useState<any | null>(null);
    // useEffect(() => {
    //     myRef.current?.focus();
    //     // const myTimeOut = setTimeout(() => {
    //     //     myRef.current?.focus()
    //     //     clearTimeout(myTimeOut);
    //     // }, 500);
    // }, [])

    // const executeScroll = () => {
    //         const myTimeOut = setTimeout(() => {
    //             if (myRef.current) {
    //                 myRef.current.scrollIntoView();
    //             }
    //             clearTimeout(myTimeOut);
    //         }, 2000);
    // }

    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "<No parent>";
    }
    return <div>
        <Button
            ref={myRef}
            className={activeElement===scope.my_id ? 'active_list_item' : 'list_item'}
            onClick={(event) => {
                myRef.current?.focus();
                setActiveElement(
                  <ScopeDetails scope={scope} symbolTable={symbolTable}/>);
                event.preventDefault();
                // executeScroll();
              }}
          >{scope.my_id} parent: {parent}</Button>
    </div>;
}

export default ScopeListItem;