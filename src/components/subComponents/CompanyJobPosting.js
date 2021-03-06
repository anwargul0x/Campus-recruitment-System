import * as firebase from 'firebase';
import React ,{ Component } from 'react'
import { RaisedButton, TextField, Paper, MenuItem, DropDownMenu, 
        Table, TableBody, TableHeader, TableHeaderColumn,
         TableRow, TableRowColumn,Dialog ,Divider} from 'material-ui';

class CompanysJobPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu1: "",
            menu2: "",
            menu3: "",
            menu4: "",
            jobTitle: '',
            skill: '',
            salary: 2000
        }
    }
    companyPostJobs = (e) => {
        e.preventDefault();
        let uid = firebase.auth().currentUser.uid;
        let displayName = firebase.auth().currentUser.displayName;
        let title = this.state.jobTitle, skill = this.state.skill, salary = this.state.salary;
        let edu = this.state.menu2, exp = this.state.menu1, jobType = this.state.menu3, shift = this.state.menu4;
        if (title !== '' && skill !== '' && salary !== '' && edu !== '' && exp !== '' && jobType !== '' && shift !== '') {
            firebase.database().ref(`/jobs/${uid}`).push({
                companyName: displayName,
                Title: title,
                Skill: skill,
                Salary: salary,
                Experience: exp,
                Education: edu,
                Type: jobType,
                Shift: shift
            }).then(() => {
                alert(`Job has been posted`);
                this.setState({
                    menu1: '',
                    menu2: '',
                    menu3: '',
                    menu4: '',
                    skill: '',
                    jobTitle: '',
                    salary: 0
                })

            }).catch((err) => alert(err.message));
        }
        else alert(`Please fill all fields`);
    }
    handleMenu1Change = (evt, index, val) => this.setState({ menu1: val })
    handleMenu2Change = (evt, index, val) => this.setState({ menu2: val })
    handleMenu3Change = (evt, index, val) => this.setState({ menu3: val })
    handleMenu4Change = (evt, index, val) => this.setState({ menu4: val })
    handleTitleChange = (evt) => this.setState({ jobTitle: evt.target.value })
    handleSkillChange = (evt) => this.setState({ skill: evt.target.value })
    handleSalaryChange = (evt) => {
        // let salary = evt.target.value;
        // let regex = /[a-zA-Z]/;
        // console.log(regex.test(salary),salary);
        // if(/[a-zA-Z]/.test(evt.target.value)){
        //     this.setState({ salary: '' })
        //     alert("Only Numbers are allowed in Salary Field")
        // }
        // else
         this.setState({ salary: evt.target.value })}
    render() {
        return (<div>
            <Paper zDepth={2} style={{ width: "30%", height: "90vh", margin: "1em auto" }}>
                <header className="headStyle">  <h3>Job Posting Form</h3>  </header>
                <form onSubmit={this.companyPostJobs}>

                    <TextField floatingLabelText="Job Title"
                        onChange={this.handleTitleChange} value={this.state.jobTitle}
                        style={{ width: 280, margin: "-0.45em 4rem" }} />
                    <TextField floatingLabelText="Skills"
                        onChange={this.handleSkillChange} value={this.state.skill}
                        style={{ width: 280, margin: "-0.45em 4rem" }} /><br/>
                    <TextField defaultValue={this.state.salary} type='number'
                     onChange={(e) => this.setState({ salary: e.target.value })}
                      floatingLabelText="Salary" />
                    <br />
                    <TextField defaultValue={this.state.salary} type='number' floatingLabelText="Salary"
                        onChange={this.handleSalaryChange} value={this.state.salary}
                        style={{ width: 280, margin: "-0.45em 4rem" }} />
                    <br /><DropDownMenu
                        onChange={this.handleMenu1Change} value={this.state.menu1} autoWidth={false}
                        style={{ width: 280, margin: "0 4rem" }}>

                        <MenuItem value="" primaryText="No Experience" disabled={true} />
                        <MenuItem value="1 - 3 years" primaryText="1 - 3 years" />
                        <MenuItem value="3 - 5 years" primaryText="3 - 5 years" />
                        <MenuItem value="5 - 7 years" primaryText="5 - 7 years" />
                        <MenuItem value="7 - 10 years" primaryText="7 - 10 years" />
                    </DropDownMenu><br />
                    <DropDownMenu
                        onChange={this.handleMenu2Change} value={this.state.menu2} autoWidth={false}
                        style={{ width: 280, margin: "0 4rem" }}>

                        <MenuItem value="" primaryText="Education" disabled={true} />
                        <MenuItem value="Matric" primaryText="Matriculation" />
                        <MenuItem value="Intermediate" primaryText="Intermediate" />
                        <MenuItem value="Bachelors" primaryText="Bachelors" />
                        <MenuItem value="Masters" primaryText="Masters" />
                    </DropDownMenu><br />
                    <DropDownMenu
                        onChange={this.handleMenu3Change} value={this.state.menu3} autoWidth={false}
                        style={{ width: 280, margin: "0 4rem" }}>
                        <MenuItem value="" primaryText="Job Type" disabled={true} />
                        <MenuItem value="Part-Time" primaryText="Part-Time" />
                        <MenuItem value="Full-Time" primaryText="Full-Time" />
                        <MenuItem value="Internee" primaryText="Internee" />
                    </DropDownMenu><br />
                    <DropDownMenu
                        onChange={this.handleMenu4Change} value={this.state.menu4} autoWidth={false}
                        style={{ width: 280, margin: "0 4rem" }}>

                        <MenuItem value="" primaryText="Shift" disabled={true} />
                        <MenuItem value="Morning" primaryText="Morning" />
                        <MenuItem value="Evening" primaryText="Evening" />
                        <MenuItem value="Night" primaryText="Night" />

                    </DropDownMenu><br /><br />

                    <RaisedButton type="submit"
                        label="Post Job"
                        labelColor="#fff"
                        backgroundColor="#2e2e2e"
                        style={{ width: "65%", margin: "0.1em 4.5rem" }} />
                </form>
            </Paper>
        </div>)
    }
}
