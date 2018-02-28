import React,{Component} from 'react'
import ListOfCompanies from "./ListOfCompanies"
import ListOfStudents from './ListOfStudents'
import SwipeableViews from 'react-swipeable-views';
import CompanysOwnJobsPanel from './CompanysOwnJobsPanel'
import {Tabs,Tab,} from 'material-ui'

export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            tab:1,
            category : "Admin"
        }
    }
    handleTabChange = (values) => {
        this.setState({ tab: values })
    }
render(){
    return(

        <div>
            <Tabs
                onChange={this.handleTabChange}
                value={this.state.tab}
            >
                <Tab label="Companies"  value={0} />
                <Tab label="Jobs Panel" value={1} />
                <Tab label="Students"   value={2} />
            </Tabs>
            <SwipeableViews index={this.state.tab} onChangeIndex={this.handleTabChange}>
            <ListOfCompanies category={this.state.category}/>
            <CompanysOwnJobsPanel category={this.state.category}/>
            <ListOfStudents category = {this.state.category}/>
            </SwipeableViews>
        </div>
)
}
} 