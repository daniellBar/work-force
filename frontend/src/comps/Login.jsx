import React from 'react';
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { login, loadUser } from '../store/action/userActions.js'

export class _Login extends React.Component {
    state = {
        password: '',
        showPassword: false,
        userName: ''
    }

    handleChange = (prop) => (event) => {
        this.setState({ [prop]: event.target.value })
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    handleSubmit = async () => {
        const { password, userName } = this.state
        if (password != '' && userName != '') {
            const userCreds = {
                password: password,
                userName: userName
            }
            this.props.login(userCreds)
        }
    }

    render() {
        return (
            <section className="login-container flex column align-center">
                <h2 className="login-title">Login</h2>
                <h4 className="login-description">Enter your details to continue as admin</h4>
                <form className="login-form" onKeyDown={e => (e.key === 'Enter') && this.handleSubmit()}>
                    <FormControl className="login-form-user" fullWidth variant="outlined">
                        <InputLabel>username</InputLabel>
                        <OutlinedInput
                            type='text'
                            value={this.state.userName}
                            onChange={this.handleChange('userName')}
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl className="login-form-pass" fullWidth variant="outlined">
                        <InputLabel>password</InputLabel>
                        <OutlinedInput
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <div className="btn login-btn" onClick={this.handleSubmit}>Login</div>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    login,
    loadUser
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
