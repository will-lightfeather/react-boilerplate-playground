import { Header, HeaderContextProvider } from '@team-lightfeather/ui-react-assets';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <HeaderContextProvider>
      <Header title='LightFeather'>
        {/* TODO: expose render prop for Header Link component to allow using react-router-dom Link component  */}
        <Header.Link href='/' text='Home' />

        <Header.Link href='/users' text='Users' />

        <Header.SubMenu title='Sample' id='sample-nav' ariaControls='sample-nav'>
          <Header.SubMenuItem>
            <Link to='/sample'>Sample</Link>
          </Header.SubMenuItem>
        </Header.SubMenu>
      </Header>
    </HeaderContextProvider>
  );
};

type LayoutProps = {
  classNames?: string;
  children: React.ReactNode;
};

export const Layout = ({ children, classNames }: LayoutProps): React.ReactElement => {
  return (
    <div>
      <Nav />
      <main className={classnames('grid-container', classNames)}>
        <div className='margin-top-4'>{children}</div>
      </main>
    </div>
  );
};
