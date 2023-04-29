// import logo from './logo.svg';
import { Button, FileButton, Text, Tabs } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { RadiobuttonIcon, ValueIcon } from "@modulz/radix-icons";
import React, { useState, createContext } from "react";

import { invoke } from "@tauri-apps/api";

import Symbols from "./Symbols";
import Scopes from "./Scopes";
import Details from "./Details";

import "./App.css";
import { EmptySymbolTable, Scope, Symbol, SymbolTable } from "./SymbolTable";
import SymbolDetails from "./SymbolDetails";
import ScopeDetails from "./ScopeDetails";

function App() {
  const colorScheme = "dark";

  // -------------------------------------------
  // State Symbol Table Data
  // -------------------------------------------

  const [symbol_table, setSymbolTable] =
    useState<SymbolTable>(EmptySymbolTable);

  // -------------------------------------------
  // State Grammar File
  // -------------------------------------------

  const [file, setFile] = useState<File | null>(null);

  const handleNewFile = (file: File) => {
    console.log(`File: ${file.name}`);
    file.text().then((content) => {
      console.log(`Content: ${content}`);
      setFile(file);
      invoke<string>("process_grammar", { file: file.name, content: content })
        .then((result) => {
          const data = JSON.parse(result);
          setSymbolTable(data);
          console.log(`Result is ${result}`);
        })
        .catch((e) => console.error(e));
    });
  };

  // -------------------------------------------
  // Context Active Element
  // -------------------------------------------
  const [active_element, setActiveElement] = useState<
    typeof SymbolDetails | typeof ScopeDetails | null
  >(null);
  const ActiveElementContext = createContext<
    typeof SymbolDetails | typeof ScopeDetails | null
  >(active_element);

  const views = [
    {
      path: "/",
      name: "Symbols",
      exact: true,
      component: <Symbols symbol_table={symbol_table} />,
      icon: <RadiobuttonIcon />,
    },
    {
      path: "/scopes",
      name: "Scopes",
      exact: false,
      component: <Scopes symbol_table={symbol_table} />,
      icon: <ValueIcon />,
    },
  ];

  const TabPanels = () => {
    return (
      <>
        {views.map((view) => (
          <Tabs.Panel key={view.name} value={view.name}>
            {view.component}
          </Tabs.Panel>
        ))}
      </>
    );
  };

  const TabSelectors = () => {
    return (
      <Tabs.List position="left">
        {views.map((view, index) => (
          <Tabs.Tab key={view.name} value={view.name} icon={view.icon}>
            {view.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    );
  };

  const TabArea = () => {
    return (
      <Tabs defaultValue={views[0].name}>
        <TabSelectors />
        <TabPanels />
      </Tabs>
    );
  };

  const HeaderContent = () => {
    return (
      <>
        <div className="file_button">
          <FileButton onChange={handleNewFile} accept=".par">
            {(props) => <Button {...props}>Choose grammar</Button>}
          </FileButton>
        </div>
        <div id="title">
          <Text>Parol Symbols Viewer</Text>
        </div>
        {file && (
          <div id="chosen_file">
            <Text>{file.name}</Text>
          </div>
        )}
      </>
    );
  };

  return (
    <ActiveElementContext.Provider value={null}>
      <div id="wrapper">
        <MantineProvider
          theme={{ colorScheme, fontFamily: "Arial" }}
          withGlobalStyles
        >
          <div id="header" className="boxed">
            <HeaderContent />
          </div>
          <div id="tabs" className="boxed">
            <TabArea />
          </div>
          <main className="boxed">
            <Details element={active_element}/>
          </main>
          <footer className="boxed">(c) 2023 - Jörg Singer</footer>
        </MantineProvider>
      </div>
    </ActiveElementContext.Provider>
  );
}

export default App;
