// import logo from './logo.svg';
import { Button, FileButton, Text, Tabs, TabsValue } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { RadiobuttonIcon, ValueIcon } from "@modulz/radix-icons";
import React, { useState } from "react";

import { invoke } from "@tauri-apps/api";

import Symbols from "./Symbols";
import Scopes from "./Scopes";
import Details from "./Details";

import "./App.css";
import { EmptySymbolTable, SymbolTable } from "./SymbolTable";
import { Assert } from "./Assert";

function App() {
  const colorScheme = "dark";

  // -------------------------------------------
  // State Alert
  // -------------------------------------------

  const [[cond, msg], assert] = useState<[boolean, string]>([true, ""]);

  // -------------------------------------------
  // State Symbol Table Data
  // -------------------------------------------

  const [symbolTable, setSymbolTable] = useState<SymbolTable>(EmptySymbolTable);

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
  const [active_element, setActiveElement] = useState<JSX.Element>(
    <Text>
      <p>Nothing selected</p>
    </Text>
  );

  // -------------------------------------------
  // Context Active List Element
  // -------------------------------------------
  const [activeListElement, setActiveListElement] = useState<number>(-1);


  const views = [
    {
      path: "/",
      name: "Symbols",
      exact: true,
      component: (
        <Symbols
          symbolTable={symbolTable}
          setActiveElement={setActiveElement}
          setActiveListElement={setActiveListElement}
          activeListElement={activeListElement}
          assert={assert}
        />
      ),
      icon: <RadiobuttonIcon />,
    },
    {
      path: "/scopes",
      name: "Scopes",
      exact: false,
      component: (
        <Scopes
          symbolTable={symbolTable}
          setActiveElement={setActiveElement}
          setActiveListElement={setActiveListElement}
          activeListElement={activeListElement}
          assert={assert}
        />
      ),
      icon: <ValueIcon />,
    },
  ];

  // -------------------------------------------
  // State Selected TabPanel
  // -------------------------------------------

  const [active_panel, setActivePanel] = useState<TabsValue>(views[0].name);

  const TabPanels = () => {
    return (
      <div id="panels">
        {views.map((view) => (
            <Tabs.Panel
              key={view.name}
              value={view.name}
              sx={{ overflow_y: "scroll" }}
            >
              {view.component}
            </Tabs.Panel>
        ))}
      </div>
    );
  };

  const TabSelectors = () => {
    return (
      <Tabs.List position="left">
        {
          views.map((view, index) => 
            <Tabs.Tab
              key={view.name}
              value={view.name}
              icon={view.icon}
              onClick={() => setActiveListElement(-1)}
            >
              {view.name}
            </Tabs.Tab>)
        }
      </Tabs.List>
    );
  };

  const TabArea = () => {
    return (
      <Tabs value={active_panel} onTabChange={setActivePanel}>
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
    <div id="wrapper">
      <MantineProvider
        theme={{ colorScheme, fontFamily: "Arial" }}
        withGlobalStyles
      >
        <div id="alert">
          <Assert cond={cond} msg={msg} assert={assert} />
        </div>
        <div id="header" className="boxed">
          <HeaderContent />
        </div>
        <div id="tabs" className="boxed">
          <TabArea />
        </div>
        <main className="boxed">
          <Details element={active_element} />
        </main>
        <footer className="boxed">(c) 2023 - Jörg Singer</footer>
      </MantineProvider>
    </div>
  );
}

export default App;
function max(num1: number, num2: number): number {
  return num1 > num2 ? num1 : num2;
}

