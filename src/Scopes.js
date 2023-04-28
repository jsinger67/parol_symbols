import { Text } from "@mantine/core";
import ScopeListItem from "./ScopeListItem";

export default function Scopes(props) {
    const { data } = props;
    if (data && data.scopes) {
        return (<>
            {
                data.scopes.map((scope) =>
                    <ScopeListItem scope={scope}/>
                )
            }
            </>);
        
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