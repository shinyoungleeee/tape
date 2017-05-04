import AlbumTile from 'components/AlbumTile'

describe('AlbumTile', () => {
  let key, id, name, art, year, kind, links, wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AlbumTile
        key={1}
        id={1}
        name={'Album'}
        art={'#'}
        year={2017}
        kind={'album'}
        links={[{
          id: 1,
          service: 'Spotify',
          url: 'https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ'
        }]}
      />
    )
  })

  it('should render a series of divs', () => {
    expect(wrapper.find('div.column.column-block')).toBePresent();
    expect(wrapper.find('div.album-container')).toBePresent();
  });
});
