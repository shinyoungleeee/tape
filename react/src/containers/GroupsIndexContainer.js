import React from 'react';
import { Link } from 'react-router';
import GroupTile from '../components/GroupTile';

class GroupsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let groups = this.props.groups.map(group => {
      let clickJoinHandler = () => {
        this.props.joinGroup(group.id)
      }
      return(
        <GroupTile
          key={group.id}
          id={group.id}
          name={group.name}
          description={group.description}
          private={group.private}
          creator={group.creator.handle}
          users={group.users}
          albums={group.albums}
          userJoined={group.user_joined}
          clickJoinHandler={clickJoinHandler}
        />
      )
    })
    return(
      <div id="groups">
        <div className="row align-center">
          <h3>{this.props.user} Groups</h3>
        </div>
        <hr width="25%" /><br/>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {groups}
        </div>
      </div>
    )
  }
}

export default GroupsIndexContainer;
