import React from 'react';
import { Link } from 'react-router';
import GroupsIndexContainer from './GroupsIndexContainer';

class UserGroupsFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }

    this.getGroupData = this.getGroupData.bind(this)
    this.joinGroup = this.joinGroup.bind(this)
  }

  getGroupData() {
    fetch(`/api/v1/users/${this.props.params.id}/groups.json`, { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ groups: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  joinGroup(groupId) {
    fetch(`/api/v1/groups/${groupId}/join.json`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => {
        this.getGroupData()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getGroupData()
  }

  render() {
    let userHandle;
    if (this.state.groups.length > 0) {
      let user = this.state.groups[0].users.find((user) => {
        return user.id == this.props.params.id
      })
      userHandle = `${user.handle}'s`
    }
    return(
      <GroupsIndexContainer
        groups={this.state.groups}
        user={userHandle}
        joinGroup={this.joinGroup}
      />
    )
  }
}

export default UserGroupsFetch;
