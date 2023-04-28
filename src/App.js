// import logo from './logo.svg';
import { Button, FileButton, Text, Tabs, Group, Flex } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { SunIcon, MoonIcon, RadiobuttonIcon, ValueIcon } from '@modulz/radix-icons';
import { useState } from 'react';
import { createStyles, useMantineTheme } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

// import { invoke } from '@tauri-apps/api';

import Symbols from './Symbols';
import Scopes from './Scopes';
import Details from './Home';

import './App.css';

function App() {
  const views = [{
    path: '/',
    name: 'Symbols',
    exact: true,
    component: <Symbols />,
    icon: <RadiobuttonIcon size={30} />
  }, {
    path: '/scopes',
    name: 'Scopes',
    exact: false,
    component: <Scopes />,
    icon: <ValueIcon size={30} />
  }];

  // const [opened, setOpened] = useState(false);

  // -------------------------------------------
  // State Color Scheme
  // -------------------------------------------

  const defaultColorScheme = 'dark';
  const [colorScheme, setColoScheme] = useState(defaultColorScheme);

  const toggleColorScheme = value => {
    const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColoScheme(newValue);
  }

  // -------------------------------------------
  // State Grammar File
  // -------------------------------------------

  const [file, setFile] = useState(null);

  const TabPanels = () => {
    return views.map((view) =>
      <Tabs.Panel value={view.name}>{view.component}</Tabs.Panel>)
  };

  const TabSelectors = () => {
    return (
      <Tabs.List position='right'>
        {
          views.map((view, index) =>
            <Tabs.Tab value={view.name} icon={view.icon}>{view.name}</Tabs.Tab>)
        }
      </Tabs.List>
    );
  };

  const TabArea = () => {
    return (<Tabs defaultValue={views[0].name} inverted>
      <TabPanels />
      <TabSelectors />
    </Tabs>);
  };

  const useStyles = createStyles((theme) => ({
    navLink: {
      display: 'flex',
      with: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.md,
      color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      textDecoration: 'none',

      ':hover': {
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      }
    },
    navLinkActive: {
      backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
    headerRightItems: {
      marginLeft: 'auto',
    },
    mediaQuery: {
      display: 'none'
    },
  }));

  const { classes } = useStyles();

  return (
    // <MantineProvider theme={{ colorScheme, fontFamily: 'Arial' }} withGlobalStyles>
    //   <MemoryRouter>
    //     <AppShell padding="md" navbarOffsetBreakpoint="sm"
    //       navbar={
    //         <Navbar width={{ sm: 200 }} padding="xs" hidden={!opened} hiddenBreakpoint="sm">
    //           <TabArea />
    //         </Navbar>
    //       }
    //       header={
    //         <Header data-tauri-drag-region height={70} p='md' className={`${classes.header} `} display='flex'>
    //           <Group styles={{ display: 'block' }}>
    //             <Burger opened={opened} onClick={() => setOpened(o => !o)}
    //               size='sm' mr='xl' color={useMantineTheme().colors.gray[6]} />
    //           </Group>
    //           <Text>Parol Symbols Viewer</Text>
    //           <Group className={classes.headerRightItems}>
    //             <ActionIcon id='toggle-theme' variant='default' onClick={() => toggleColorScheme()} size={30}>
    //               {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    //             </ActionIcon>
    //           </Group>
    //         </Header>
    //       }
    //       styles={(theme) => ({
    //         main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    //       })}
    //     >
    //       <Details />
    //     </AppShell>
    //   </MemoryRouter>
    // </MantineProvider>
    <div id='wrapper'>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Arial' }} withGlobalStyles>
          <div id='header' className='boxed'>
            <div className='file_button'>
              <FileButton onChange={setFile} accept=".par">
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
          </div>
          <div id='tabs' className='boxed'>
              <TabArea />
          </div>
          <main className='boxed'>
              <p>Main</p>
              <p>Deserunt excepteur est voluptate magna id ut do aliquip eu. Nisi ex quis duis labore enim esse. Deserunt eiusmod nulla non esse labore aute eu. Irure velit non occaecat ut nisi magna minim cupidatat cupidatat. Laboris ullamco dolore veniam aute.</p>
          </main>
          <footer className='boxed'>(c) 2023 - Jörg Singer</footer>
       </MantineProvider>
    </div>
  );
}

export default App;
