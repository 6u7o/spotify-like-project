import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      musicName,
      preview,
      songId,
      checkFunc,
      isChecked,
    } = this.props;
    return (
      <div>
        <p>
          {musicName}
        </p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ songId }>
          Favorita
          <input
            type="checkbox"
            checked={ isChecked }
            name={ musicName }
            id={ songId }
            data-testid={ `checkbox-music-${songId}` }
            onChange={ checkFunc }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  songId: PropTypes.number.isRequired,
  checkFunc: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
