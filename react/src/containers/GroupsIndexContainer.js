import React from 'react';
import { Link } from 'react-router';
import GroupTile from '../components/GroupTile';

class GroupsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    $('#groups').foundation();
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

    let errorMessages = this.props.errors.map(error => {
      if (error === "Successfully added") {
        return(
          <div className="callout success">
            <p>Successfully added.</p>
          </div>
        )
      } else {
        return(
          <div className="callout alert">
            <p>{error}</p>
          </div>
        )
      }
    })

    return(
      <div id="groups">
        <div className="row align-center">
          <h3>{this.props.user} Groups</h3>
        </div>
        <div className="row align-center">
          <h5><a data-open="create-group">Create a new group</a></h5>
        </div>
        <hr width="25%" /><br/>
        <div className="reveal" id="create-group" data-reveal>
          <form onSubmit={this.props.newGroup}>
            <h3>New Group</h3>
            {errorMessages}
            <div className="input-group">
              <span className="input-group-label">Name</span>
              <input name="name" className="input-group-field" type="text" />
            </div>
            <div className="input-group">
              <span className="input-group-label">Description</span>
              <input name="description" className="input-group-field" type="text" placeholder="(Optional)" />
            </div>
            <input type="submit" className="button" value="Submit" />
          </form>
          <button className="close-button" data-close="" aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {groups}
        </div>
      </div>
    )
  }
}

export default GroupsIndexContainer;
