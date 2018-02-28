import React,{Component} from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import { RaisedButton, TextField, AppBar,Paper,LinearProgress} from 'material-ui'
export default class Login extends Component{
    constructor(){
        super();
        this.state = {
        email:'',
        password:'',
        progress:false,
        warning:false,
        warningText:''            
        };
    }

    handlePasswordChange = (newVal) => {
       
        this.setState({
            password: newVal.target.value,
            warning:false
        })
    }
    handleEmailChange = (newVal) => {
        this.setState({
            email: newVal.target.value,
            warning:false
        })
    }
    signInForm=(email,password)=>{
        if(email !==""&&password !==""){
            this.setState({progress:true,warning:false})
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            this.setState({email:'',password:'',progress:false});
            this.props.history.push('/dashboard');
         } )
        .catch((error)=>{this.setState({warningText:error.message,warning:true,progress:false})})
            }
        else alert('Please fill in the form first to proceed');    }
    
render(){
return(
    <div style={{backgroundColor:"#e6eaea" ,paddingBottom:"5.9%"}}>
        <AppBar 
        style={{backgroundColor:'#2e2e2e'}}
        title="Campus Recruitement System" 
        titleStyle={{ textAlign: 'center', fontWeight: '700' }}
        zDepth={2} showMenuIconButton={false}/>
        <AppBar
            style={{ backgroundColor: '#435f7a', width: '32%', margin: '0px auto',marginTop:'20px' }}
            title="Account Login"
            titleStyle={{ textAlign: 'center'}}
            zDepth={1} showMenuIconButton={false} />
     
            <Form 
                email={this.state.email}
                password={this.state.password}
                emailChange = {this.handleEmailChange}
                passwordChange = {this.handlePasswordChange}
                signInForm = {this.signInForm}
                progress={this.state.progress}
                warning={this.state.warning}
                warningtxt = {this.state.warningText}
                />
         
            </div>
)
    }
}
 const Form = (props) => {
     return(
     <div>
             <Paper zDepth={2} style={{ backgroundColor: "#fff", width: "32%", height: "65vh", margin: "0 auto", }}>
                <form onSubmit={(e)=>{e.preventDefault(); props.signInForm(props.email,props.password)}}>
                 <TextField 
                 floatingLabelText="Email"
                 type="email" 
                 onChange={props.emailChange}
                 style={widthAndMargin} />
                 <TextField 
                 floatingLabelText="Password"
                 type="password"
                 onChange={props.passwordChange}
                 style={widthAndMargin} /><br />
                 <div style={{ margin: "5% 15% " }}><Link to="/signUp" style={{ textDecoration: 'none', width: '70%', fontSize: "18px", color: "#325" }}>Create An Account</Link></div>
                 <RaisedButton label="Sign In" type="submit" primary={true} style={{ color: "white", width: '70.5%', margin: "4% 15% 2% 15%" }} />
             </form><br />
                 {props.progress ? <LinearProgress mode="indeterminate" style={{width:"70%",margin:"0 auto"}} />:(props.warning?<p style={{padding:'4px'}}>{props.warningtxt}</p>:undefined)} 
             </Paper>
     </div>)
 }

const widthAndMargin = { width: '70%', margin: "4% 15%" }
