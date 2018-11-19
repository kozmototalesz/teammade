import React, { Component } from 'react';
import {getTeamMates} from '../../actions/profileActions';
import {addMember,removeMember} from '../../actions/projectActions';
import {connect} from 'react-redux';

class ChooseMembers extends Component {
    constructor(props){
        super(props)
        this.state={
            member:{
                name:'',
                id:''
            },
            selectedMates:'',
            errors:{},
            addedMates:''
        }
        this.getTeamList=this.getTeamList.bind(this);
        this.addMember=this.addMember.bind(this);
    }

    addMember(){
        let member={
            name: this.state.member.name,
            id: this.state.member.id
        }

        this.props.addMember(this.state.member);
        

        member={
            name: '',
            id: ''
        }

        this.setState({member:member});
    }

    removeMember(id){
        this.props.removeMember(id);
        this.setState({});
   
    }

    getTeamList(e){
        const filterData={
            name: e.target.value
        }

        this.props.getTeamMates(filterData);

        let found;
        if(this.state.selectedMates){
            found = this.state.selectedMates.find(function(element) {
                return element.key===e.target.value;
        });

        if(found){

            const chosen={
                id:e.target.value,
                name:found.props.children
            }
    
            this.setState({member:chosen});
            } else {
                const chosen={
                    name:e.target.value,
                }
                this.setState({member:chosen});
            }
        } else {
            const chosen={
                name:e.target.value,
            }
    
            this.setState({member:chosen});
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }



        if(nextProps.projects.temporaryMembers.length>0){
            const addedMates=nextProps.projects.temporaryMembers.map(mate=>{
                return(
                <li className="list-group-item" onClick={this.removeMember.bind(this,mate.id)} key={mate.id} >{mate.name}
                    <big> -</big>
                </li>
            )});
            this.setState({addedMates:addedMates});
        } else {
            this.setState({addedMates:[]});


        }

        if(nextProps.profile.profiles){
            const selectMates=nextProps.profile.profiles.map(mate=>(
                <option key={mate._id} value={mate._id}>
                    {mate.name}
                </option>
            ));
            this.setState({selectedMates:selectMates});
        }
    }

  render() {
    const selectedMates=this.state.selectedMates;
    return (
      <div>
       
       <div className="form-group col-lg-12">
                    {(<p><small className="from-text text-muted">Choose your teammates</small></p>)}
            <div className="row">
            <input list="teammates"
                className="col-lg-6 custom-select custom-select-sm"
                onChange={this.getTeamList}
                value={this.state.member.name}
                placeholder="John Doe"
            >
            </input>
            <datalist id="teammates">
                {selectedMates}
            </datalist>
            
            <div onClick={this.addMember} className="col-lg-6">
                <big>+</big>
            </div>
        </div>
        </div>

            <ul className="list-group list-group-flush">
                {this.state.addedMates}
            </ul>
      </div>
    )
  }
}

const mapStateToProps=state=>({
    profile: state.profile,
    errors: state.errors,
    projects: state.projects
})

export default connect(mapStateToProps,{getTeamMates,addMember,removeMember})(ChooseMembers);


