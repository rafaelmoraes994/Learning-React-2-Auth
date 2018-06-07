import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress = async() => {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
            } catch (er) {
                this.setState({ error: 'Authentication Failed' });
            }
        }
    }

    renderButton = () => {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }

        return (
            <Button onPress={this.onButtonPress}>
                Log in
            </Button>
        );
    }   

    render() {
        return (
            <Card>
                <CardSection> 
                    <Input
                        label='Email:'
                        placeholder='user@gmail.com'
                        secureTextEntry={false}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} 
                    />
                </CardSection>
                    
                <CardSection> 
                    <Input
                        label='Password:'
                        placeholder='password'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginForm;

