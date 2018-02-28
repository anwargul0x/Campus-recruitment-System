import * as firebase from 'firebase';
import React, { Component } from 'react'
import logo from './images/nojobs.png';
import image from './images/nopost.png'
import { RaisedButton, MenuItem,Menu,Divider,Dialog } from 'material-ui';

export default class CompanysOwnJobsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobsListKey: [],
            open: false,
            listOfApplicants: [],
            companyUid:[],companyName:[]
        }
    }
    componentWillMount() {
        console.log(logo)
        let uid = firebase.auth().currentUser.uid;
        console.log(uid, this.props.category)
        if(this.props.category === "Admin"){
            
            firebase.database().ref(`/jobs/`).on('value', (snap) => {
                let jobsList = [], jobsListKey = [], companyUid = [];
                let jobs = snap.val();
                console.log(jobs)
                for(let company in jobs){
                    console.log(company,jobs[company])
                    for(let key in jobs[company]){
                        console.log(key,jobs[company][key]);
                        jobsList.push(jobs[company][key]);
                        jobsListKey.push(key);
                        companyUid.push(company);
                    }
                }
                this.setState({
                    jobs: jobsList, jobsListKey,companyUid
                })
                
                console.log(jobsList, jobsListKey,companyUid)
            })
        
        }

        else {firebase.database().ref(`/jobs/${uid}`).on('value', (snap) => {
            let jobsList = [], jobsListKey = [], companyName = [];
            let jobs = snap.val();
            console.log(jobs)
             for (let key in jobs) {
                console.log(jobs)
                jobsList.push(jobs[key]);
                jobsListKey.push(key);
                companyName.push(jobs[key]['companyName']);
            }
            this.setState({
                jobs: jobsList, jobsListKey
            })
            console.log(jobsList, jobsListKey)
        })}
    }
    deleteJob = (jobIndex,index) => {
        if(this.props.category === "Admin"){
            let companyUid = this.state.companyUid[index];
            console.log(companyUid,jobIndex,index);
            firebase.database().ref(`/jobs/${companyUid}/${jobIndex}`).remove();  
        }
        else {let uid = firebase.auth().currentUser.uid;
        console.log(jobIndex)
        firebase.database().ref(`/jobs/${uid}/${jobIndex}`).remove();
    }
    }

    handleClickAndApplicants = (applicants) => {
        if (applicants) {
            let applicantsList = Object.values(applicants);
            this.setState({ listOfApplicants: applicantsList })
        }
        else this.setState({ listOfApplicants: [] })
    };

      handleClose = () => {
    this.setState({open: false});
  };

    render() {
        console.log(this.state.jobs)
        return (<div>
            {this.state.jobs.length > 0?
                <div style={styles.styleOne}>{this.state.jobs.map((job, index) => 
                    {return <div style={styles.styleTwo} key={index}>
                    {(this.props.category === "Admin") ? <MenuItem>{job.companyName}<Divider /></MenuItem>:undefined}
                    <MenuItem>Title : {job.Title}</MenuItem>
                    <MenuItem>Skills : {job.Skill}</MenuItem>
                    <MenuItem>Experience : {job.Experience}</MenuItem>
                    <MenuItem>Salary : {job.Salary}</MenuItem>
                    <MenuItem>Education : {job.Education}</MenuItem>
                    <MenuItem>Job Type : {job.Type}</MenuItem>
                    <MenuItem>Shift : {job.Shift}</MenuItem>
                     <RaisedButton 
                        fullWidth={true} labelColor='#fff' label="List of Applicants"  
                        backgroundColor="#083d7c" onClick={(e) => {
                            e.preventDefault(); this.setState({open: true});
                            this.handleClickAndApplicants(job.Applicants)}}/>
                    <Dialog  title="Applicants"  modal={false}  open={this.state.open}  autoScrollBodyContent={true}  onRequestClose={this.handleClose}> 
                    <Menu>
                        {this.state.listOfApplicants.length > 0 ?
                            this.state.listOfApplicants.map((applicant) => { 
                                return <MenuItem primaryText={applicant.Name} /> }) :
                        <MenuItem primaryText="No one has applied for this job" />}
                    </Menu>
                    </Dialog>
                    <RaisedButton fullWidth={true} labelColor='#fff' label="Delete" backgroundColor="#2e2e2e" style={{ marginTop: "0.5em" }}
                        onClick={(e) => { e.preventDefault(); this.deleteJob(this.state.jobsListKey[index],index) }} /></div>
                })}</div>:
             <img src={this.props.category ==="Admin"?image:logo} alt="No Job Has been Posted" style={{ margin: "0.7em auto" }} />}
             </div>)
    }
        
    }
 const styles  = {
     styleOne: { width: "80%", margin: "0.81em auto", 
     overflowY: "scroll", maxWidth: "88%", 
     backgroundColor: "#f5f5f5", maxHeight: "77.3vh" },
     
     styleTwo: { width: "25%", margin: "19px 25px",
      display: "inline-block", backgroundColor: "#ffffff",
      padding: "1.2em", maxWidth: "30%", maxHeight: "70vh", 
     fontSize: "12px", boxShadow: " 0px 2px 11px 0px #d8d8d8" },
 };