import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMusicHistory} from './musicHistorySlice';

export const MusicHistory = () => {
  const dispatch = useDispatch();

  const {meta, tracks, loading, error} = useSelector(
    state => state.musicHistory
  );

  useEffect(() => {
    dispatch(getMusicHistory());
  }, []);

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error}</div>
      </div>
    );
  }

  console.log(tracks);
  console.log(meta);

  const track_limit = 5;
  // [0,1,2,3] => [sm,md,lg,xl]
  const track_image_size = 2;

  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && (
        <div>
          done loading
          <ul>
            {tracks.slice(0, track_limit).map((it, i) => (
              <li key={i}>
                {/* TODO add blur-in effect to this */}
                <img
                  key={i}
                  src={it.image[track_image_size]['#text']}
                  alt={it.name}
                />
                <div>{it.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
