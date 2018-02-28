import * as firebase from 'firebase';
import React ,{ Component } from 'react'
import { MenuItem, DropDownMenu, 
        Table, TableBody, TableHeader, TableHeaderColumn,
         TableRow, TableRowColumn,RaisedButton} from 'material-ui';
  
export default class ListOfStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOfStudents: [],
            KeyOfStudents:[],
            open: false
        }
    }
    componentWillMount() {
        firebase.database().ref(`/Student`).on('value', (snap) => {
            let students = snap.val(), studentList = [],studentKeyList=[];
            for (let key in students) {
                console.log(students[key]);
                studentList.push(students[key]);
                studentKeyList.push(key);
            }
            this.setState({
                ListOfStudents: studentList,
                KeyOfStudents:studentKeyList
            })
            console.log(studentList);
        })
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
      deleteUser = (userIndex) => {
        let uid = this.state.KeyOfStudents[userIndex];
            console.log(userIndex,uid);
        firebase.database().ref(`/users/${uid}/`).remove();
        firebase.database().ref(`/Student/${uid}/`).remove();
        firebase.database().ref(`/jobs`).on('value', (snap) => {
            let users = snap.val();
            let keyList = [], jobsList = [], cuid = [];
                console.log(users)
            for (let key in users) {
             if (users[key]) {
                 for (let secKey in users[key]) {
                     jobsList.push(users[key][secKey])
                     keyList.push(secKey)
                     cuid.push(key)
                     console.log(users[key][secKey], secKey)}}}
                    cuid.map((company,index)=>{
                      return  firebase.database().ref(`jobs/${company}/${keyList[index]}/Applicants/${uid}`).remove();
                    })
            })
    };
    render() {

        return (<div>  <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow >
                    <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                   
                    {(this.props.category === 'Admin') ? <TableHeaderColumn tooltip="Action">Action</TableHeaderColumn> : <TableHeaderColumn tooltip="Qualification">Qualification</TableHeaderColumn>} 
                </TableRow></TableHeader>
            <TableBody stripedRows={true} displayRowCheckbox={false}
            >   {this.state.ListOfStudents.length > 0 ?
                this.state.ListOfStudents.map((student, index) => {
                    return (<TableRow key={index}>
                        <TableRowColumn >{index + 1}</TableRowColumn>
                        <TableRowColumn>{student.Name}</TableRowColumn>
                        <TableRowColumn>{student.Email}</TableRowColumn>
                        <TableRowColumn>
                           
                                {(this.props.category === 'Admin')?<RaisedButton label="delete" 
                                onClick={(e)=>{e.preventDefault(); this.deleteUser(index)}}/>:
                               (student.Qualification) ?<DropDownMenu
                                    value={1}
                                    style={{ width: "270px" }}
                                    autoWidth={false}
                                >
                                    <MenuItem value={1} primaryText="See Details" />
                                    <MenuItem value={2} primaryText={`Skill(s) : ${student.Qualification.Skill}`} />
                                    <MenuItem value={3} primaryText={`Education : ${student.Qualification.Education}`} />
                                    <MenuItem value={4} primaryText={`Experience : ${student.Qualification.Experience}`} />
                            </DropDownMenu>:`No Information is Available`}
                        </TableRowColumn>
                    </TableRow>)
                })
                : <TableRow><TableRowColumn style={{textAlign:"center"}}>No Student Information is Available</TableRowColumn></TableRow>
                }


            </TableBody>
        </Table></div>)
    }
}