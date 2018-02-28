import * as firebase from 'firebase';
import React, { Component } from 'react'
import logo from './images/nopost.png';
import { RaisedButton,MenuItem,Divider } from 'material-ui';

export default class StudentJobsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfJobs: [],
            keyOfJobs: [], companyUid: [],qualification:{},
            userId:'',
            open:false
        }
    }
    componentWillMount() {
        console.log('something')
        this.setState({userId:firebase.auth().currentUser.uid})
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`/Student/${uid}/Qualification`).on('value',snap=>{
            let qualification = snap.val();
            if(qualification!==undefined){this.setState({qualification})}
            console.log(qualification)
            
        })
       
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
                        console.log(users[key][secKey], secKey)
                    }
                }
            }
            console.log(keyList.map((keys) => keys))
            this.setState({ listOfJobs: jobsList, keyOfJobs: keyList, companyUid: cuid })
        })
    }
    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    applyForJob = (index) => {
        let cuid = this.state.companyUid[index];
        let keyOfJob = this.state.keyOfJobs[index]; 
        let jobList = this.state.listOfJobs;
        let uid = firebase.auth().currentUser.uid;
        let Name = firebase.auth().currentUser.displayName;
        let Email = firebase.auth().currentUser.email;
        let Qualification = this.state.qualification;    
        let flag =false;
    if(Qualification){
        if(jobList[index]['Applicants']){
            console.log('index is ' + index + " keyofjob " + keyOfJob+" job "+Object.keys(jobList[index].Applicants));
            let obj = Object.keys(jobList[index].Applicants);
            for (let i in obj){ 
                if (uid === obj[i]){
            flag=true;
            }  
         }
        }
            if (flag) {
                let Qualification1 = jobList[index]['Applicants'][uid]['Qualification'];
                let val1 = Object.values(Qualification1).join("");
                let val = Object.values(Qualification).join("");
                if (val.toString() === val1.toString()) {
                    alert(`Already Applied`);}
                else {
                    firebase.database().ref(`/jobs/${cuid}/${keyOfJob}/Applicants/${uid}/`)
                    .update({ Name: Name, Email: Email, Qualification: Qualification }); alert('Changes applied')}
            }
            else { firebase.database().ref(`/jobs/${cuid}/${keyOfJob}/Applicants/${uid}/`)
            .update({ Name: Name, Email: Email, Qualification: Qualification}); alert('applied')}
    }
    else alert(`Plaease First Fill Qualification Form Before Aplying`)
}
    render() {
        return (<div >
            {this.state.listOfJobs.length > 0 ?
            <div style={{ width: "80%", margin: "1em auto", overflowY: "scroll", maxWidth: "88%", backgroundColor: "#f5f5f5", maxHeight: "74vh" }}>
                {this.state.listOfJobs.map((job, index) => {
                    return <div style={{
                        width: "25%", margin: "19px 25px", display: "inline-block", backgroundColor: "#ffffff", padding: "1.2em",
                        maxWidth: "30%", maxHeight: "65vh", fontSize: "12px", boxShadow: " 0px 2px 11px 0px #d8d8d8"
                    }} key={index}>{job.companyName}<Divider />
                        <MenuItem>Title : {job.Title}</MenuItem>
                        <MenuItem>Skills : {job.Skill}</MenuItem>
                        <MenuItem>Experience : {job.Experience}</MenuItem>
                        <MenuItem>Salary : {job.Salary}</MenuItem>
                        <MenuItem>Eduaction : {job.Education}</MenuItem>
                        <MenuItem>Job Type : {job.Type}</MenuItem>
                        <MenuItem>Shift : {job.Shift}</MenuItem>
                        <RaisedButton fullWidth={true} labelColor='#fff' label="Apply" backgroundColor="#083d7c" onClick={(e) => { e.preventDefault(); this.applyForJob(index);this.handleClick() }}></RaisedButton></div>
                })}</div> : <img src={logo} alt="No Job Has been Posted" style={{margin:"0.7em auto"}}/>}
        </div>)
    }
}