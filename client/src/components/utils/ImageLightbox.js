import React, { Component } from 'react';
import Lightbox from 'react-images';

/**
 * @props <ImageLightbox
            id={prodDetail._id}
            images={this.state.lightboxImages}
            open={this.state.lightboxIsOpen}
            imageIndex={this.state.imageIndex}
            onClose ={()=>this.handleLightboxClose()}
          />
 */
class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.imageIndex,
    images: [],

  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.images) {
      const imagesArr = [];
      nextProps.images.forEach(element => {
        imagesArr.push({ src: `${element.url}` })
      });
      return state = {
        images: imagesArr
      }
    }
    return false
  }

  gotoPrevious = () => {
    this.setState({ currentImage: this.state.currentImage - 1 })
  }
  gotoNext = () => {
    this.setState({ currentImage: this.state.currentImage + 1 })
  }
  render() {
    return (
      <div>
        <Lightbox
          images={this.state.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.props.onClose}
        />
      </div>
    );
  }
}

export default ImageLightbox;