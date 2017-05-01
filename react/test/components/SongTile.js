import SongTile from 'components/SongTile'

describe('SongTile', () => {
  let key, id, name, album, track, disc, links, wrapper;

  beforeEach(() => {
    wrapper = mount(
      <SongTile
        key={1}
        id={1}
        name={"Song"}
        album={
          {
            id: 1,
            name: "22, A Million",
            image_url: "https://i.scdn.co/image/ddf6cf4e4e4306f371bd24814bb2400e9343851c",
            year: 2017,
            kind: "album",
            created_at: "2017-04-25T13:23:23.299Z",
            updated_at: "2017-04-25T13:23:23.299Z"
          }
        }
        track={1}
        disc={0}
        links={[
          {
            id: 1,
            song_id: 1,
            service: "Spotify",
            url: "https://open.spotify.com/track/5oK98mpTJSU0iqLHN1hZ3y",
            created_at: "2017-04-25T13:23:23.511Z",
            updated_at: "2017-04-25T13:23:23.511Z"
          }
        ]}
      />
    )
  })

  it('should render a div with the rating props value', () => {
    expect(wrapper.find('.small-1.columns.text-center.rating').find('strong').at(0).text()).toBe('10');
    expect(wrapper.find('.small-1.columns.text-center.rating').find('strong').at(1).text()).toBe('RATING');
  });

  it('should render a div with the username and body props value', () => {
    expect(wrapper.find('.small-7.columns').find('p').text()).toBe('user: This is the body.');
  });

  it('should render a h6 tag with the voteCount props value', () => {
    expect(wrapper.find('h6').text()).toBe('2');
  });

  it('should render a button tag with a thumbs up value', () => {
    expect(wrapper.find('button').at(0).text()).toBe('👍');
  });

  it('should render a button tag with a thumbs down value', () => {
    expect(wrapper.find('button').at(1).text()).toBe('👎');
  });

  it('should render a button tag with the value Edit Review if currentUser props is true', () => {
    expect(wrapper.find('a').find('.button').text()).toBe('Edit Review');
  });

  it('should render a button tag with the value Edit Review if admin props is true', () => {
    wrapper = mount(
      <ReviewTile
        key={1}
        id={1}
        rating={10}
        body={'This is the body.'}
        voteCount={2}
        upvoteHandler={upvoteHandler}
        downvoteHandler={downvoteHandler}
        memeId={1}
        deleteHandler={deleteHandler}
        belongsToCurrentUser={false}
        admin={true}
      />
    )
    expect(wrapper.find('a').find('.button').text()).toBe('Edit Review');
  });

  it('should render a button tag with the value Delete Review if currentUser props is true', () => {
    expect(wrapper.find('button').at(2).text()).toBe('Delete Review');
  });

  it('should render a button tag with the value Delete Review if admin props is true', () => {
    wrapper = mount(
      <ReviewTile
        key={1}
        id={1}
        rating={10}
        body={'This is the body.'}
        voteCount={2}
        upvoteHandler={upvoteHandler}
        downvoteHandler={downvoteHandler}
        memeId={1}
        deleteHandler={deleteHandler}
        belongsToCurrentUser={false}
        admin={true}
      />
    )
    expect(wrapper.find('button').at(2).text()).toBe('Delete Review');
  });

  it('should NOT render a button tag with the value Edit Review if currentUser and admin props are false', () => {
    wrapper = mount(
      <ReviewTile
        key={1}
        id={1}
        rating={10}
        body={'This is the body.'}
        voteCount={2}
        upvoteHandler={upvoteHandler}
        downvoteHandler={downvoteHandler}
        memeId={1}
        deleteHandler={deleteHandler}
        belongsToCurrentUser={false}
        admin={false}
      />
    )
    expect(wrapper.text()).not.toContain('Edit Review');
  });

  it('should NOT render a button tag with the value Delete Review if currentUser and admin props are false', () => {
    wrapper = mount(
      <ReviewTile
        key={1}
        id={1}
        rating={10}
        body={'This is the body.'}
        voteCount={2}
        upvoteHandler={upvoteHandler}
        downvoteHandler={downvoteHandler}
        memeId={1}
        deleteHandler={deleteHandler}
        belongsToCurrentUser={false}
        admin={false}
      />
    )
    expect(wrapper.text()).not.toContain('Delete Review');
  });

  it('should invoke the upvoteHandler function from props when clicked', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(upvoteHandler).toHaveBeenCalled();
  })

  it('should invoke the downvoteHandler function from props when clicked', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(downvoteHandler).toHaveBeenCalled();
  })

  it('should invoke the deleteHandler function from props when clicked', () => {
    wrapper.find('button').at(2).simulate('click');
    expect(deleteHandler).toHaveBeenCalled();
  })
});
