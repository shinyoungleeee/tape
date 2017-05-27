import AlbumTile from 'components/AlbumTile'

describe('AlbumTile', () => {
  let key, id, name, art, year, kind, artists, links, likeButton, likeCount, clickLikeHandler, wrapper;

  beforeEach(() => {
    clickLikeHandler = jasmine.createSpy('clickLikeHandler spy')
    wrapper = mount(
      <AlbumTile
        key={1}
        id={1}
        name={'Album'}
        art={'#'}
        year={2017}
        kind={'album'}
        artists={[{
          id: 1,
          name: "Artist"
        }]}
        links={[{
          id: 1,
          service: 'Spotify',
          url: 'https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ'
        }]}
        likeButton={"liked"}
        likeCount={1}
        clickLikeHandler={clickLikeHandler}
      />
    )
  })

  it('should render a series of divs', () => {
    expect(wrapper.find('div.column.column-block')).toBePresent();
    expect(wrapper.find('div.album-container')).toBePresent();
    expect(wrapper.find('div.album-overlay')).toBePresent();
    expect(wrapper.find('div.album-text.flex-container.align-center.align-middle')).toBePresent();
  });

  it('should invoke the clickLikeHandler function from props when clicked', () => {
    wrapper.find('img.like-button').simulate('click');
    expect(clickLikeHandler).toHaveBeenCalled();
  })
});
