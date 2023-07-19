import React from 'react';
import './landing.css';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const Landing = () => {

    return (
        <div className='landing-container'>
            <Layout className="layout">
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 style={{ color: 'white' }}>Dataflow</h1>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content" style={{ margin: '16px' }}>
                        Welcome to Dataflow, an exploratory data analysis issue tracker. Rethink the way you perform EDA. Streamline the tedious data processing steps and get to your modeling quicker.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Created by Ryan Hung
                </Footer>
            </Layout>
        </div>
    );
};

export default Landing;
