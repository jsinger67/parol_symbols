// import logo from './logo.svg';
import { Button, FileButton, Text, Tabs } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { RadiobuttonIcon, ValueIcon } from '@modulz/radix-icons';
import { useState } from 'react';

import { invoke } from '@tauri-apps/api';

import Symbols from './Symbols';
import Scopes from './Scopes';
import Details from './Details';

import './App.css';

function App() {
  const colorScheme = 'dark';

  // -------------------------------------------
  // State Symbol Table Data
  // -------------------------------------------

  const [data, setData] = useState(null);

  // -------------------------------------------
  // State Grammar File
  // -------------------------------------------

  const [file, setFile] = useState(null);

  const handleNewFile = (file) => {
    console.log(`File: ${file.name}`);
    file.text().then((content) => {
      console.log(`Content: ${content}`);
      setFile(file);
      invoke('process_grammar', { file: file.name, content: content })
        .then((result) => {
          const data = JSON.parse(result);
          setData(data);
          console.log(`Result is ${result}`)
        }
        )
        .catch((e) => console.error(e))
    });
  }

  const views = [{
    path: '/',
    name: 'Symbols',
    exact: true,
    component: <Symbols data={data} />,
    icon: <RadiobuttonIcon size={30} />
  }, {
    path: '/scopes',
    name: 'Scopes',
    exact: false,
    component: <Scopes data={data} />,
    icon: <ValueIcon size={30} />
  }];

  const TabPanels = () => {
    return views.map((view) =>
      <Tabs.Panel value={view.name}>{view.component}</Tabs.Panel>)
  };

  const TabSelectors = () => {
    return (
      <Tabs.List position='left'>
        {
          views.map((view, index) =>
            <Tabs.Tab value={view.name} icon={view.icon}>{view.name}</Tabs.Tab>)
        }
      </Tabs.List>
    );
  };

  const TabArea = () => {
    return (<Tabs defaultValue={views[0].name}>
      <TabSelectors />
      <TabPanels />
    </Tabs>);
  };

  const HeaderContent = () => {
    return (
      <>
        <div className='file_button'>
          <FileButton onChange={handleNewFile} accept=".par">
            {(props) => <Button {...props}>Choose grammar</Button>}
          </FileButton>
        </div>
        <div id='title'>
          <Text>Parol Symbols Viewer</Text>
        </div>
        {file && (
          <div id='chosen_file'>
            <Text>{file.name}</Text>
          </div>
        )}
      </>
    );
  }

  return (
    <div id='wrapper'>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Arial' }} withGlobalStyles>
        <div id='header' className='boxed'>
          <HeaderContent />
        </div>
        <div id='tabs' className='boxed'>
          <TabArea />
        </div>
        <main className='boxed'>
          <Details />
        </main>
        <footer className='boxed'>(c) 2023 - Jörg Singer</footer>
      </MantineProvider>
    </div>
  );
}

export default App;
