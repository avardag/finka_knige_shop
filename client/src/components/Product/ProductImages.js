import React, { Component } from 'react';
import ImageLightbox from '../utils/ImageLightbox';

class ProductImages extends Component {
  state = {
    lightboxIsOpen: false,
    imageIndex: 0,
    lightboxImages: []
  }
  componentDidMount() {
    //if there are images of a product
    if (this.props.prodDetail.images.length > 0) {
      let lightboxImages = this.props.prodDetail.images
      this.setState({ lightboxImages })
    }
  }
  //gets url of images for div bacckground. Or Not_Found_Pic if no images exist
  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  handleLightboxClick = (imageIndex) => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightboxIsOpen: true,
        imageIndex
      })
    }
  }
  handleLightboxClose = () => {
    this.setState({
      lightboxIsOpen: false
    })
  }

  //renders prod images under main pic, starting from 2nd img(if there are)
  showThumbs = (prodDetail) => (
    this.state.lightboxImages.map((item, i) => (
      i > 0 ?
        <div
          key={i}
          onClick={() => this.handleLightboxClick(i)}
          className="thumb"
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
        : null
    ))
  )

  //RENDER
  render() {
    const { prodDetail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{ background: `url(${this.renderCardImage(prodDetail.images)}) no-repeat` }}
            onClick={() => this.handleLightboxClick(0)}
          >
          </div>
          <div className="main_thumbs">
            {this.showThumbs(prodDetail)}
          </div>
        </div>
        {
          this.state.lightboxIsOpen &&
          <ImageLightbox
            id={prodDetail._id}
            images={this.state.lightboxImages}
            open={this.state.lightboxIsOpen}
            imageIndex={this.state.imageIndex}
            onClose={() => this.handleLightboxClose()}
          />
        }
      </div>
    );
  }
}

export default ProductImages;