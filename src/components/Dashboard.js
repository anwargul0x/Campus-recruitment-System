import React, { Component } from 'react';
import './Dashboard.css'; 
import Admin from './subComponents/Admin.js'
import * as firebase from 'firebase';
import StudentDashboard from './subComponents/studentDashboard'
import CompanyDashboard from './subComponents/companyDashboard'
import { AppBar, FlatButton, Drawer, MenuItem,RefreshIndicator} from 'material-ui';


class DashBoard extends Component{
    constructor(){
        super();
        this.state = {
            tab:1,
            userCategory:'',
            open:false,
            currentUserName:'',
            userId:''

        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            console.log(user)
            let userUID = user.uid;
            let userName = user.displayName;
            firebase.database().ref(`/users/${user.uid}`).on('value', (snap) => {
                let data = snap.val();
                console.log(data,user.uid);
                if(data){
                    this.setState({
                        userId: userUID,
                        currentUserName: userName,
                        userCategory: data.Category
                    })
                }
                else {
                    firebase.auth().currentUser.delete()
                    .then(()=>{this.props.history.push(`/`);alert("Your Account has been terminated By Admin")})
                }
                 
            });
     })
 }

  toggleDrawer = () => this.setState({open:!this.state.open})
    
  handleClose = () => this.setState({open: false});
   
  logout = () => { firebase.auth().signOut().then(()=>{this.props.history.push('/')});}
    render() {
        return (<div>
            <AppBar className="title" style={{ backgroundColor: '#2e2e2e' }}
                title="Campus Recruitement System" titleStyle={{ textAlign: 'center', fontWeight: '700' }}
                zDepth={2} showMenuIconButton={true} onLeftIconButtonClick={this.toggleDrawer } iconElementRight={<FlatButton label="LOG OUT" onClick={this.logout}/>}/>  
            <Drawer open={this.state.open} 
            docked={false}
             onRequestChange={(open) => this.setState({open})}
            width={250}
            >
            <MenuItem 
            style={{padding:"1.2vh 4.5vh",backgroundColor: '#2e2e2e',color:"#fff",verticalAlign:"center"}}
            onClick={this.handleClose}>Category : {this.state.userCategory}</MenuItem>
            <MenuItem 
            style={{backgroundColor:"#00bcd4",color:"#fff"}}
            onClick={this.handleClose}>Username : {this.state.currentUserName}</MenuItem>
               
       </Drawer>
        {(this.state.userCategory !== '')?
                ((this.state.userCategory === 'Student') ? 
                    (<StudentDashboard />) : ((this.state.userCategory === 'Company')?
                        <CompanyDashboard /> :
                        (this.state.userCategory === "Admin") ? <Admin /> : undefined))  :  <RefreshIndicator
                size={150}
                left={600}
                top={170}
                loadingColor="#FF9800"
                status="loading"
                    style={{
                        display: 'inline-block',
                        position: 'relative'}}
            />
      }

        </div>)
    }

}



export default DashBoard;