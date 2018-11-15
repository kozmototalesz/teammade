import React, { Component } from 'react';
import {getTeamMates,addMember} from '../../actions/profileActions';
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
            errors:{}
        }
        this.getTeamList=this.getTeamList.bind(this);
        this.addMember=this.addMember.bind(this);
    }

    addMember(){
        const member={
            name: this.state.member.name,
            id: this.state.member.id
        }
        console.log(this.state.member);
        //this.props.addMember()
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

      </div>
    )
  }
}

const mapStateToProps=state=>({
    profile: state.profile,
    errors: state.errors,
    chosen: state.chosen
})

export default connect(mapStateToProps,{getTeamMates,addMember})(ChooseMembers);


