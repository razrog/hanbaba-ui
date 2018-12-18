import React, {Component} from 'react';
import {RootRouter} from './components/app/RootRouter';
import NavBar from "./components/app/NavBar";
import './public/stylesheet/bootstrap/css/bootstrap.css'
import {ToastContainer} from 'react-toastify';
class App extends Component {

    render() {
        return (
            <div className="App">
                <NavBar/>
                <div style={{textAlign: 'center'}}>
                    <RootRouter/>
                    <ToastContainer
                        position="top-center"
                        autoClose={4000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        pauseOnHover
                        draggable={false}
                    />
                </div>
            </div>
        );
    }
}

export default App;
