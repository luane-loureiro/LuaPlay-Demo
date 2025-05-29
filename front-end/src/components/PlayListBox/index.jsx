import React from 'react';
import PlayList from '../PlayList';

const PlayListBox = ({ playlists, mediaByPlaylist }) => {
  return (
    <div>
      {playlists.map(playlist => (
        <PlayList
          key={playlist.id}
          playlist={playlist}
          mediaItems={mediaByPlaylist[playlist.id] || []}
        />
      ))}
    </div>
  );
};

export default PlayListBox;
