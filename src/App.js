import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import React, { Component, } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter, Switch, Route, Link, } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import MovieComponent from './MovieComponent';
import SearchComponent from './SearchComponent';

const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="movies"><Link to="/movies">Movies</Link></Menu.Item>
              <Menu.Item key="search"><Link to="/search">Search</Link></Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              padding: '0 50px',
            }}
          >
            <Route exact path="/" component={HomeComponent}></Route>
            <Route exact path="/movies" component={MovieComponent}></Route>
            <Route exact path="/search" component={SearchComponent}></Route>
          </Content>
        </Layout>
      </BrowserRouter>
    </div>


  );
}

export default App;
