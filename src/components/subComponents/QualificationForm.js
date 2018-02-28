import React,{Component} from 'react'
import * as firebase from 'firebase';
import {RaisedButton,Paper,MenuItem,DropDownMenu,TextField} from 'material-ui';


 export default class StudentQualificationForm  extends Component{
    constructor(props){
        super(props);
        this.state = {
            menu1:"",
            menu2:"",
            skill:'',
            user:'',
            
           }
    } 
    componentWillMount(){
       let user =  firebase.auth().currentUser.uid;
       this.setState({user:user});
        firebase.database().ref(`/Student/${user}/Qualification`).on('value',(snap)=>{
            let qualification = snap.val();
            console.log(qualification,user)
            if(qualification !== null){
         
            this.setState(
                {skill:qualification['Skill'],
                menu1:qualification['Experience'],
                menu2:qualification['Education'],
                  })
        }})
    }
    handleSkillChange = (val) => this.setState({ skill:val.target.value})
    updateStudentInfo = (e) => {
        e.preventDefault(); 
        let skill = this.state.skill,exp=this.state.menu1,edu = this.state.menu2;
        if (skill !== '' && exp !== '' && edu !== ''){
            firebase.database().ref(`/Student/${this.state.user}/Qualification`).set({
                Skill:skill,
                Experience:exp,
                Education:edu
            }).then(()=>{alert(`info updated successfully`)}).catch((error)=>{alert(error.message)})
        }

        else alert(`fill all the fields !`)}
    handleMenu1Change = (evt, index, val) => this.setState({ menu1: val })
    handleMenu2Change =(evt, index,val) =>this.setState({menu2:val})
    render(){  
    return(<div>
        <Paper zDepth={2} style={{width:"30%" , height:"68vh" ,margin:"2em auto"}}>
        <header className="headStyle">  <h1>Qualifications</h1>  </header>
        <form onSubmit = {this.updateStudentInfo}>

                <TextField floatingLabelText="Skills" style={{ width: 280, margin: "0 4rem" }}
                value={this.state.skill}
                onChange={this.handleSkillChange}/>
            <br /><DropDownMenu
                onChange={this.handleMenu1Change} value={this.state.menu1} autoWidth={false}
                    style={{ width: 280, margin: "0 4rem" }}>
                    
                <MenuItem value="" primaryText="No Experience"  disabled={true}/>
                <MenuItem value="1 - 3 years" primaryText="1 - 3 years" />
                <MenuItem value="3 - 5 years" primaryText="3 - 5 years" />
                <MenuItem value="5 - 7 years" primaryText="5 - 7 years" />
                <MenuItem value="7 - 10 years" primaryText="7 - 10 years" />
            </DropDownMenu><br />  
            <br /><DropDownMenu 
                onChange={this.handleMenu2Change} value={this.state.menu2} autoWidth={false}
                    style={{ width: 280,margin:"0 4rem" }} >

                    <MenuItem value="" primaryText="Education" disabled={true}/>
                <MenuItem value="Matriculation" primaryText="Matriculation" />
                <MenuItem value="Intermediate" primaryText="Intermediate" />
                <MenuItem value="Bachelors" primaryText="Bachelors" />
                <MenuItem value="Masters" primaryText="Masters" />
            </DropDownMenu><br/>
            
            <RaisedButton type="submit" 
            label="Update My Info" 
            labelColor="#fff"  
            backgroundColor="#2e2e2e" 
            style={{width:"65%", margin:"0.5em 4.5rem"}}/>
            </form>
        </Paper>
    </div>)
}}