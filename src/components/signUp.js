import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { Paper, AppBar , RaisedButton, TextField , LinearProgress } from 'material-ui';


export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            tab: 0,
            studentName: '',
            studentEmail: '',
            studentPassword: '',
            companyName: '',
            companEmail: '',
            companyPassword: '',
            progress:false,
            warning:false,
            warningText:''
        };
    }
    handleTabChange = (values) => {
        this.setState({
            tab: values,
            studentName:'',
            studentEmail: '', 
            studentPassword:'',
            companyName:'',
            companEmail:'',
            companyPassword:'',
        })
    }
    handleStudentEmailChange = (values) => {
        this.setState({
            studentEmail: values.target.value
        })
        console.log(values.target.value);
    }
    handleStudentPasswordChange = (values) => {
        this.setState({
            studentPassword: values.target.value
        })
        console.log(values.target.value);        
    }
    handleStudentNameChange = (values) => {
        this.setState({
            studentName: values.target.value
        })
        console.log(values.target.value);
    }
     handleCompanyEmailChange = (values) => {
        this.setState({
            companyEmail: values.target.value
        })
    }
    handleCompanyPasswordChange = (values) => {
        this.setState({
            companyPassword: values.target.value
        })
    }
    handleCompanyNameChange = (values) => {
        this.setState({
            companyName: values.target.value
        })
        console.log(this.state.companyName,values.target.value)
    }
    signUpForm = (email,password,userName) => {
        let accountType = this.state.tab ?"Company":"Student";
        console.log(accountType);
        this.setState({ progress: true, warning: false });
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user)=>{
            firebase.auth().currentUser.updateProfile({displayName:userName});
            firebase.database().ref(`/users/${user.uid}/`).set({Email:email,Name:userName,Category:accountType})
            .then(()=>{
                firebase.database().ref(`/${accountType}/${user.uid}/`).set({ Email: email, Name: userName })
            });
            this.setState({
                studentName: '',
                studentEmail: '',
                studentPassword: '',
                companyName: '',
                companEmail: '',
                companyPassword: '',
                progress:false
            })
            this.props.history.push('/dashboard');
        }).catch((error)=>{this.setState({warningText:error.message,warning:true,progress:false})});
    }
    render() {
        return (
            <div style={{ backgroundColor: "#e6eaea", paddingBottom: "2.5%" }}>
                <AppBar
                    style={{ backgroundColor: '#2e2e2e' }}
                    title="Campus Recruitement System"
                    titleStyle={{ textAlign: 'center', fontWeight: '700' }}
                    zDepth={2} showMenuIconButton={false} />
                <AppBar
                    style={{ backgroundColor: '#435f7a', width: '36%', margin: '0px auto', marginTop: '20px' }}
                    title="Account Sign Up"
                    titleStyle={{ textAlign: 'center' }}
                    zDepth={1} showMenuIconButton={false} />
                <Tabs
                
                    style={{ width: '36%', margin: '0px auto' }}
                    onChange={this.handleTabChange}
                    value={this.state.tab}>
                    <Tab label='Student' value={0} />
                    <Tab label='Company' value={1} />
                </Tabs>
                <SwipeableViews
                index={this.state.tab}
                onChangeIndex={this.handleTabChange}>
                
                    <StudentForm 
                        signUpBtn = {this.signUpForm}
                        named = {this.state.studentName}
                        email = {this.state.studentEmail}
                        password = {this.state.studentPassword}
                        changeName =  {this.handleStudentNameChange}
                        changeEmail = {this.handleStudentEmailChange}
                        changePassword = {this.handleStudentPasswordChange} 
                        progress={this.state.progress}
                        warning={this.state.warning}
                        warningtxt={this.state.warningText}
                    />
                    
                    <CompanyForm
                        signUpBtn={this.signUpForm}
                        Cname={this.state.companyName}
                        email={this.state.companyEmail}
                        password={this.state.companyPassword}
                        changeName={this.handleCompanyNameChange}
                        changeEmail={this.handleCompanyEmailChange}
                        changePassword={this.handleCompanyPasswordChange} 
                        progress={this.state.progress}
                        warning={this.state.warning}
                        warningtxt={this.state.warningText}
                    />

                </SwipeableViews>
            </div>
        )
    }
}

const StudentForm = (props) => {
    return (
        <div>
            <Paper zDepth={2} style={PaperStyle.paper}>

                <form onSubmit = {(e)=>{e.preventDefault(); props.signUpBtn(props.email,props.password,props.named)}}>
                <TextField  floatingLabelText="Student Name"  
                    onChange={props.changeName}   
                    value  = {props.named}             
                    style={widthAndMargin}
                    required = 'required'  />
                    
                <TextField floatingLabelText="Student Email" 
                    type="email"
                    required='required'
                    value={props.email}     
                    style={widthAndMargin} 
                    onChange={props.changeEmail}
                    />
                    
                <TextField floatingLabelText="Password"
                    minLength={6}
                    type="password"    
                    required='required'
                    style={widthAndMargin} 
                    value={props.password}  
                    onChange={props.changePassword}
                    />    <br />
                    <div style={PaperStyle.anchor}>
                    <Link to="/"
                     style={PaperStyle.linkDecor} >Already Have An Account</Link></div>
                
                 <RaisedButton type="submit"  label="Sign Up" primary={true} style={PaperStyle.btn} />
                </form>
                {props.progress ? <p><LinearProgress mode="indeterminate" style={{ width: "70%", margin: "0 auto" }} /></p> : (props.warning ? <p style={{ padding: '2px' }}>{props.warningtxt}</p> : undefined)} 

            </Paper>
        </div>)
}

const CompanyForm = (props) => {
    return (
        <div>
            <Paper zDepth={2} style={PaperStyle.paper}>
                <form onSubmit={(e) => { e.preventDefault(); props.signUpBtn(props.email, props.password, props.Cname) }}>
                <TextField floatingLabelText="Company Name" 
                    required='required' 
                    onChange={props.changeName}
                    value={props.Cname}
                    style={widthAndMargin}
                />
                
                <TextField floatingLabelText="Company Email" 
                    type="email"
                    required='required'
                    value={props.email}
                    style={widthAndMargin} 
                    onChange={props.changeEmail}
                />
                
                <TextField floatingLabelText="Password" 
                    minLength={6}
                    type="password"
                    required='required'
                    style={widthAndMargin}
                    value={props.password}
                    onChange={props.changePassword}
                /><br />
                
                <div style={PaperStyle.anchor}><Link to="/"
                 style={PaperStyle.linkDecor}>Already Have An Account</Link></div>
                
                <RaisedButton label="Sign In" type="submit" primary={true} style={PaperStyle.btn} />
                </form>
                {props.progress ? <div><LinearProgress mode="indeterminate" style={{ width: "70%", margin: "0 auto" }} /></div> : (props.warning ? <div style={{ width: "100%", margin: "0 1em",textAlign:"center"  }}>{props.warningtxt}</div> : undefined)} 
            </Paper>
        </div>)
}

const widthAndMargin = { width: '70%', margin: "1.5% 15%" }
const PaperStyle = {
    paper: { backgroundColor: "#fff", width: "36%", height: "65vh", margin: "0 auto", },
    anchor: { margin: "3% 15% " },
    linkDecor: { textDecoration: 'none', width: '70%', fontSize: "18px", color: "#435f7a" },
    btn: { color: "white", width: '70.5%', margin: "2% 15% 2% 15%" }
};