import React, { Component } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home"
// import Home ={this.state.language} from "./Home language={this.state.language}";

export default class App extends Component {

    constructor(){
        super()
        this.state={
            language:"hi",
            search:""
        }
        this.changeLanguage= this.changeLanguage.bind(this)
        this.changeSearch= this.changeSearch.bind(this)

    }
    changeLanguage(input){
        this.setState({language:input})
    }
    changeSearch(input){
        this.setState({search:input})

    }
    render() {
        return (
            <BrowserRouter>
                <Navbar changeLanguage={this.changeLanguage} changeSearch={this.changeSearch} />
                
                <Routes>
                    <Route path="/" element={<Home search={this.state.search} language={this.state.language} q ="All"/>} />
                    <Route path="/All" element={<Home search={this.state.search} language={this.state.language} q ="All"/>} />
                    <Route path="/Politics" element={<Home search={this.state.search} language={this.state.language} q ="Politics"/>} />
                    <Route path="/Science" element={<Home search={this.state.search} language={this.state.language} q ="Science"/>} />
                    <Route path="/Technology" element={<Home search={this.state.search} language={this.state.language} q ="Technology"/>} />
                    <Route path="/Sports" element={<Home search={this.state.search} language={this.state.language} q ="Sports"/>} />
                    <Route path="/Cricket" element={<Home search={this.state.search} language={this.state.language} q ="Cricket"/>} />
                    <Route path="/Football" element={<Home search={this.state.search} language={this.state.language} q ="Football"/>} />
                    <Route path="/Economics" element={<Home search={this.state.search} language={this.state.language} q ="Economics"/>} />
                    <Route path="/IPL" element={<Home search={this.state.search} language={this.state.language} q ="IPL"/>} />
                    <Route path="/sports" element={<Home search={this.state.search} language={this.state.language} q ="sports"/>} />
                    <Route path="/*" element={<Home search={this.state.search} language={this.state.language} q ="All"/>} />
                </Routes>

                <Footer />
            </BrowserRouter>
        );
    }
}
