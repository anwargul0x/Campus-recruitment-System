import React,{Component} from 'react'
import * as firebase from 'firebase';
import {  Table,TableBody,TableHeader,
            TableHeaderColumn,TableRow, TableRowColumn,RaisedButton} from 'material-ui';

 export default class ListOfCompanies extends Component {
    constructor(props){
        super(props);
        this.state = {
        companyNames:[],
        companyEmails:[],
        companyList:[],
        companyInAdmin:[]

        }
    }
    componentWillMount(){
        let list=[];
        firebase.database().ref(`/Company`).on('value',(snap)=>{
        let users = snap.val();
        if(this.props.category==="Admin"){
            if(users){
                let companyInAdmin = Object.values(users);
                let companyKey = Object.keys(users);
                this.setState({ companyInAdmin,companyKey })
                console.log(users,Object.values(users)); 
            }
            else {this.setState({ companyInAdmin: []})}
        }
        else if(users){for (let key in users){
                if(users[key]){ list.push(users[key]); } }console.log(list)
                this.setState({companyList:list})}
       
        })
    }
     deleteUser = (userIndex) => {
         let uid = this.state.companyKey[userIndex];
         console.log(userIndex, uid);
         firebase.database().ref(`/users/${uid}/`).remove();
         firebase.database().ref(`/Company/${uid}/`).remove();
         firebase.database().ref(`/jobs/${uid}/`).remove();
    
     };
    render(){
    return (<div>
        <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow >
                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
               {(this.props.category === 'Admin') ? <TableHeaderColumn tooltip="Action">Action</TableHeaderColumn>:undefined}
            </TableRow></TableHeader>
            <TableBody stripedRows={true} displayRowCheckbox={false}
                >
                {/* { this.state.companyInAdmin.length > 0 ?
                    this.state.companyInAdmin.map((company, index) => {
                    return (<TableRow key={index}>
                            <TableRowColumn >{index + 1}</TableRowColumn>
                            <TableRowColumn>{company.Name}</TableRowColumn>
                            <TableRowColumn>{company.Email}</TableRowColumn>
                            {(this.props.category === 'Admin') ? <TableRowColumn>
                            <RaisedButton label="delete" onClick={(e)=>{e.preventDefault();this.deleteUser(index)}} /></TableRowColumn> : undefined}
                        </TableRow>)
                    }) : {(this.state.companyList.length > 0) ? 
                            this.state.companyList.map((company,index)=>{
                            return (<TableRow key={index}>
                            <TableRowColumn >{index+1}</TableRowColumn>
                            <TableRowColumn>{company.Name}</TableRowColumn>
                            <TableRowColumn>{company.Email}</TableRowColumn></TableRow>)}) : 
                            <TableRow ><TableHeaderColumn style={{ textAlign: 'center' }} colSpan="3">No Company to display</TableHeaderColumn>
                            </TableRow> }} */}
                {(this.props.category === "Admin") ? (this.state.companyInAdmin.length > 0 ?
                    this.state.companyInAdmin.map((company, index) => {
                        return (<TableRow key={index}>
                            <TableRowColumn >{index + 1}</TableRowColumn>
                            <TableRowColumn>{company.Name}</TableRowColumn>
                            <TableRowColumn>{company.Email}</TableRowColumn>
                            <TableRowColumn><RaisedButton 
                                label="delete" 
                                onClick={(e) => { e.preventDefault(); this.deleteUser(index) }} />
                                </TableRowColumn> </TableRow>)
                    }) : <TableRow ><TableHeaderColumn style={{ textAlign: 'center' }} colSpan="3">No Company to display</TableHeaderColumn>
                    </TableRow>):((this.state.companyList.length > 0) ?
                        this.state.companyList.map((company, index) => {
                            return (<TableRow key={index}>
                                <TableRowColumn >{index + 1}</TableRowColumn>
                                <TableRowColumn>{company.Name}</TableRowColumn>
                                <TableRowColumn>{company.Email}</TableRowColumn></TableRow>)
                        }) :
                        <TableRow ><TableHeaderColumn style={{ textAlign: 'center' }} colSpan="3">No Company to display</TableHeaderColumn>
                        </TableRow>)}
                
    
            </TableBody>
        </Table>
    </div>)
 }
}