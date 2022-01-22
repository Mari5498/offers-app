import React from 'react';
import { Redirect } from 'react-router-dom';

const styles = {
    div: {
        textAlign: 'center'
    }
}

export class Success extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/" />
            : <div style={styles.div}>
                <h1>Success!!</h1>
                <h2>Redirecting now!</h2>
            </div >

    }
}

export default Success;