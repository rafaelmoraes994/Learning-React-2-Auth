import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './component/common';
import LoginForm from './component/LoginForm';


class App extends Component {
    state = { loggedIn: null }

    componentWillMount = () => {
        firebase.initializeApp({
            apiKey: 'AIzaSyDkFB8WuJfWi9f--HiRBD9Xzqqe2wpOah8',
            authDomain: 'authentication-7ee87.firebaseapp.com',
            databaseURL: 'https://authentication-7ee87.firebaseio.com',
            projectId: 'authentication-7ee87',
            storageBucket: 'authentication-7ee87.appspot.com',
            messagingSenderId: '367489279794'
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent = () => {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Spinner size='large' />
                    </View>
                );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
