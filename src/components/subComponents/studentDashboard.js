import React,{Component} from 'react'
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import StudentJobsPanel from './StudentJobsPanel'
import StudentQualificationForm  from './QualificationForm'
import ListOfCompanies  from './ListOfCompanies'
        class StudentDashboard extends Component{
 constructor(props){
     super(props);
     this.state = {
         tab:1,   
     }
 }
 handleTabChange =(values)=>{
     this.setState({tab:values})
 }

    render(){
    return(<div>
        <Tabs
            onChange={this.handleTabChange}
            value={this.state.tab}
        >
            <Tab label="Qualification Form" value={0} />
            <Tab label="Jobs Panel" value={1} />
            <Tab label="Companies" value={2} />
        </Tabs>
        <SwipeableViews index={this.state.tab} onChangeIndex={this.handleTabChange}>
            <StudentQualificationForm />
            <StudentJobsPanel />
            <ListOfCompanies/>
        </SwipeableViews>
    </div>)
} }

export default StudentDashboard;
